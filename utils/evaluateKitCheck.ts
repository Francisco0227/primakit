import type { InventoryItem } from '@/constants/inventory';

/** What the user found for one supply during a kit check (M4). */
export interface CountedItem {
  name: string;
  foundQty: number;
  expiredOrDamaged: boolean;
}

/** A supply whose found quantity differs from the expected one. A negative delta means missing units. */
export interface Difference {
  itemName: string;
  expected: number;
  found: number;
  delta: number;
}

export type KitCheckStatus = 'COMPLETE' | 'LOW_STOCK' | 'EXPIRED';

export interface KitCheckResult {
  differences: Difference[];
  expiredItems: string[];
  status: KitCheckStatus;
  alertRequired: boolean;
}

/** Pure comparison of a kit's expected contents against what was counted. */
export function evaluateKitCheck(expected: InventoryItem[], counted: CountedItem[]): KitCheckResult {
  for (const c of counted) {
    if (c.foundQty < 0) {
      throw new Error(`Count for "${c.name}" cannot be negative: ${c.foundQty}`);
    }
  }
  
  const differences: Difference[] = [];
  const expiredItems: string[] = [];
  for (const item of expected) {
    const entry = counted.find((c) => c.name === item.name);
    const found = entry?.foundQty ?? 0;
    if (found !== item.expectedQty) {
      differences.push({ itemName: item.name, expected: item.expectedQty, found, delta: found - item.expectedQty });
    }
    if (entry?.expiredOrDamaged) {
      expiredItems.push(item.name);
    }
  }

  let status: KitCheckStatus = 'COMPLETE';
  if (differences.some((d) => d.delta < 0)) {
    status = 'LOW_STOCK';
  }
  if (expiredItems.length > 0) {
    status = 'EXPIRED';
  }

  return { differences, expiredItems, status, alertRequired: status !== 'COMPLETE' };
}