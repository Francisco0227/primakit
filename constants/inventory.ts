/** A supply that a kit must contain and how many units it should have. */
export interface InventoryItem {
  name: string;
  expectedQty: number;
}

// Official 17-item list. Quantities are PROVISIONAL: only "Gasa: 20" comes from TC-02 (Ken, Stage 3).
// The rest are placeholders until the expected quantity per item is confirmed.
export const PRIMAKIT_INVENTORY: InventoryItem[] = [
  { name: 'Collarín', expectedQty: 1 },
  { name: 'Venda del 5', expectedQty: 1 },
  { name: 'Venda del 10', expectedQty: 4 },
  { name: 'Venda del 15', expectedQty: 1 },
  { name: 'Gasa', expectedQty: 20 },
  { name: 'Toallitas húmedas', expectedQty: 1 },
  { name: 'Pomada para golpes', expectedQty: 1 },
  { name: 'Desinfectante', expectedQty: 1 },
  { name: 'Agua', expectedQty: 2 },
  { name: 'Férula', expectedQty: 1 },
  { name: 'Algodón', expectedQty: 1 },
  { name: 'Cobija térmica', expectedQty: 1 },
  { name: 'Guantes', expectedQty: 10 },
  { name: 'Electrolitos', expectedQty: 1 },
  { name: 'Tela adhesiva', expectedQty: 1 },
  { name: 'Micropore', expectedQty: 1 },
  { name: 'Jabón quirúrgico', expectedQty: 1 },
];