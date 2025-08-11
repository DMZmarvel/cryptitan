// lib/peerSamples.ts
export type OfferRow = {
  party: string; // Seller or Buyer
  coin: string;
  price: string; // "$50,000" etc
  limit: string; // "50–1,000"
  payment: string; // "Bank Transfer"
};

export type TradeRow = {
  amount: string;
  coin: string;
  price: string;
  payment: string;
  counterparty: string; // Seller/Buyer
  status: "Active" | "Completed" | "Canceled" | "Disputed";
};

export const sampleBuyOffers: OfferRow[] = [
  {
    party: "Alice Co.",
    coin: "USDT",
    price: "$1.00",
    limit: "50–1,000",
    payment: "Bank Transfer",
  },
  {
    party: "CryptoHub",
    coin: "BTC",
    price: "$64,300",
    limit: "0.001–0.02",
    payment: "Wallet",
  },
];

export const sampleSellOffers: OfferRow[] = [
  {
    party: "NeoPay",
    coin: "ETH",
    price: "$3,250",
    limit: "0.01–1",
    payment: "Card",
  },
];

export const sampleTradesBuySide: TradeRow[] = [
  {
    amount: "$250",
    coin: "USDT",
    price: "$1.00",
    payment: "Bank",
    counterparty: "NeoPay",
    status: "Canceled",
  },
  {
    amount: "0.003 BTC",
    coin: "BTC",
    price: "$64,100",
    payment: "Wallet",
    counterparty: "Alice",
    status: "Completed",
  },
];

export const sampleTradesSellSide: TradeRow[] = [
  {
    amount: "0.5 ETH",
    coin: "ETH",
    price: "$3,200",
    payment: "Card",
    counterparty: "Bob",
    status: "Active",
  },
];

export function saveRows<T>(key: string, rows: T[]) {
  localStorage.setItem(key, JSON.stringify(rows));
}
export function readRows<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}
export function clearRows(key: string) {
  localStorage.removeItem(key);
}
