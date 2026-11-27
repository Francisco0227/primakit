import { readFileSync } from 'node:fs';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'demo-primakit',
    firestore: { rules: readFileSync('firestore.rules', 'utf8') },
  });
});

beforeEach(async () => {
  await testEnv.clearFirestore();
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), 'kits/B01'), { name: 'Las Planillas' });
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

function asUser(uid: string) {
  return testEnv.authenticatedContext(uid).firestore();
}

function movement(overrides: Record<string, unknown> = {}) {
  return { userId: 'ana', kitId: 'B01', itemName: 'Gasa', type: 'uso', quantity: 2, createdAt: serverTimestamp(), ...overrides };
}

describe('Catalog and kits', () => {
  test('a signed-in user can read a kit', async () => {
    await assertSucceeds(getDoc(doc(asUser('ana'), 'kits/B01')));
  });

  test('a signed-in user cannot change a kit', async () => {
    await assertFails(setDoc(doc(asUser('ana'), 'kits/B01'), { name: 'Hackeado' }));
  });
});

describe('Movements are append-only (R4)', () => {
  test('a user can create a valid movement of their own', async () => {
    await assertSucceeds(setDoc(doc(asUser('ana'), 'movements/m1'), movement()));
  });

  test('a user cannot create a movement in the name of someone else', async () => {
    await assertFails(setDoc(doc(asUser('ana'), 'movements/m1'), movement({ userId: 'luis' })));
  });

  test('a movement cannot be edited, deleted or sent again with the same id', async () => {
    const db = asUser('ana');
    await assertSucceeds(setDoc(doc(db, 'movements/m1'), movement()));
    await assertFails(updateDoc(doc(db, 'movements/m1'), { quantity: 1 }));
    await assertFails(deleteDoc(doc(db, 'movements/m1')));
    await assertFails(setDoc(doc(db, 'movements/m1'), movement()));
  });

  test('a user can read their own movements but not someone else’s', async () => {
    await assertSucceeds(setDoc(doc(asUser('ana'), 'movements/m1'), movement()));
    await assertSucceeds(getDoc(doc(asUser('ana'), 'movements/m1')));
    await assertFails(getDoc(doc(asUser('luis'), 'movements/m1')));
  });

  test.each([
    ['a negative quantity', { quantity: -1 }],
    ['a decimal quantity', { quantity: 2.5 }],
    ['text where a number goes', { quantity: '5' }],
    ['a quantity above the maximum', { quantity: 101 }],
    ['an unknown type', { type: 'borrar' }],
    ['an extra field such as a role', { role: 'administrador' }],
    ['a date chosen by the phone', { createdAt: new Date('2020-01-01') }],
    ['a note that is too long', { note: 'a'.repeat(501) }],
  ])('rejects %s', async (_label, overrides) => {
    await assertFails(setDoc(doc(asUser('ana'), 'movements/m1'), movement(overrides)));
  });

  test('a note with quotes and SQL is stored as plain text', async () => {
    await assertSucceeds(setDoc(doc(asUser('ana'), 'movements/m1'), movement({ note: `'; DROP TABLE kits; --` })));
  });
});

describe('Reports and checks', () => {
  test('a user can create a report but not edit it', async () => {
    const db = asUser('ana');
    const report = { userId: 'ana', kitId: 'B01', type: 'candado', description: 'El candado estaba abierto', createdAt: serverTimestamp() };
    await assertSucceeds(setDoc(doc(db, 'reports/r1'), report));
    await assertFails(updateDoc(doc(db, 'reports/r1'), { description: 'Nada pasó' }));
  });

  test('a user can create an inventory check but not delete it', async () => {
    const db = asUser('ana');
    const check = { userId: 'ana', kitId: 'B01', counts: [{ itemName: 'Gasa', foundQty: 20 }], createdAt: serverTimestamp() };
    await assertSucceeds(setDoc(doc(db, 'inventoryChecks/c1'), check));
    await assertFails(deleteDoc(doc(db, 'inventoryChecks/c1')));
  });
});

describe('Server-only collections', () => {
  test.each(['auditLogs/l1', 'alerts/a1', 'users/ana'])('a client cannot write %s', async (path) => {
    await assertFails(setDoc(doc(asUser('ana'), path), { anything: true }));
  });
});