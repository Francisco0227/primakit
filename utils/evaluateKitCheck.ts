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
/** Count limits that the admin will configure per kit. */
export interface KitCheckOptions {
  maxCount?: number;
}

export const DEFAULT_MAX_COUNT = 100;

export interface KitCheckResult {
  differences: Difference[];
  expiredItems: string[];
  status: KitCheckStatus;
  alertRequired: boolean;
}

/** Pure comparison of a kit's expected contents against what was counted. */
export function evaluateKitCheck(
  expected: InventoryItem[],
  counted: CountedItem[],
  { maxCount = DEFAULT_MAX_COUNT }: KitCheckOptions = {},
): KitCheckResult {
  for (const c of counted) {
    if (c.foundQty < 0) {
      throw new Error(`Count for "${c.name}" cannot be negative: ${c.foundQty}`);
    }
    if (!Number.isInteger(c.foundQty)) {
      throw new Error(`Count for "${c.name}" must be a whole number: ${c.foundQty}`);
    }
    if (c.foundQty > maxCount) {
      throw new Error(`Count for "${c.name}" is too large: ${c.foundQty} (max ${maxCount})`);
    }
  }
  
  const differences: Difference[] = [];
  const expiredItems: string[] = [];
  let lowStock = false;
  for (const item of expected) {
    const entry = counted.find((c) => c.name === item.name);
    const found = entry?.foundQty ?? 0;
    if (found !== item.expectedQty) {
      differences.push({ itemName: item.name, expected: item.expectedQty, found, delta: found - item.expectedQty });
    }
    if (found < item.minQty) {
      lowStock = true;
    }
    if (entry?.expiredOrDamaged) {
      expiredItems.push(item.name);
    }
  }

  let status: KitCheckStatus = 'COMPLETE';
  if (lowStock) {    status = 'LOW_STOCK';
  }
  if (expiredItems.length > 0) {
    status = 'EXPIRED';
  }

  return { differences, expiredItems, status, alertRequired: status !== 'COMPLETE' };
}