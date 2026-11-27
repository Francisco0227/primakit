/** A supply that a kit must contain, how many units it should have and when to raise a low-stock alert. */
export interface InventoryItem {
  name: string;
  expectedQty: number;
  /** Alert threshold: fewer units than this means LOW_STOCK. The admin will edit it per kit. */
  minQty: number;
}

// Official 17-item list. Quantities and thresholds are PROVISIONAL (only "Gasa: 20" comes from TC-02, Ken);
// the admin will edit them per kit once Firestore is connected. Gasa's threshold must stay above 12 for TC-02.
export const PRIMAKIT_INVENTORY: InventoryItem[] = [
  { name: 'Collarín', expectedQty: 1, minQty: 1 },
  { name: 'Venda del 5', expectedQty: 4, minQty: 2 },
  { name: 'Venda del 10', expectedQty: 4, minQty: 2 },
  { name: 'Venda del 15', expectedQty: 2, minQty: 1 },
  { name: 'Gasa', expectedQty: 20, minQty: 15 },
  { name: 'Toallitas húmedas', expectedQty: 2, minQty: 1 },
  { name: 'Pomada para golpes', expectedQty: 1, minQty: 1 },
  { name: 'Desinfectante', expectedQty: 1, minQty: 1 },
  { name: 'Agua', expectedQty: 4, minQty: 2 },
  { name: 'Férula', expectedQty: 2, minQty: 1 },
  { name: 'Algodón', expectedQty: 1, minQty: 1 },
  { name: 'Cobija térmica', expectedQty: 2, minQty: 1 },
  { name: 'Guantes', expectedQty: 10, minQty: 2 },
  { name: 'Electrolitos', expectedQty: 4, minQty: 2 },
  { name: 'Tela adhesiva', expectedQty: 1, minQty: 1 },
  { name: 'Micropore', expectedQty: 1, minQty: 1 },
  { name: 'Jabón quirúrgico', expectedQty: 1, minQty: 1 },
];