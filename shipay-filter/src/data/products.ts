import type { Product } from "../types/product";

export const products: Product[] = [
  { id: 1, name: "Cash In - COB" },
  { id: 2, name: "Cash In - COBV" },
  { id: 3, name: "Cash In - DUEDATE" },
  { id: 4, name: "Cash In - CHARGE" },
  { id: 5, name: "Cash Out - PAYMENT" },

  { id: 6, name: "Cash In - PIX" },
  { id: 7, name: "Cash In - BOLETO" },
  { id: 8, name: "Cash In - CREDIT CARD" },
  { id: 9, name: "Cash In - DEBIT CARD" },

  { id: 10, name: "Cash Out - TRANSFER" },
  { id: 11, name: "Cash Out - BANK SLIP" },
  { id: 12, name: "Cash Out - INSTANT PAYMENT" },

  { id: 13, name: "Cash In - SUBSCRIPTION" },
  { id: 14, name: "Cash In - RECURRING PAYMENT" },
  { id: 15, name: "Cash In - QR CODE PAYMENT" },

  { id: 16, name: "Cash In - SPLIT PAYMENT" },
  { id: 17, name: "Cash In - MARKETPLACE" },

  { id: 18, name: "Cash Out - REFUND" },
  { id: 19, name: "Cash Out - CHARGEBACK" },

  { id: 20, name: "Cash In - ANTICIPATION" },
  { id: 21, name: "Cash In - INSTALLMENT PAYMENT" },

  { id: 22, name: "Cash In - NFC PAYMENT" },
  { id: 23, name: "Cash In - CONTACTLESS" },

  { id: 24, name: "Cash Out - BATCH PAYMENT" },
  { id: 25, name: "Cash Out - SCHEDULED PAYMENT" },
];
