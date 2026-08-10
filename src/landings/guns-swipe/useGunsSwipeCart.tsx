"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  GunsSwipeColorId,
  GunsSwipePackId,
  GunsSwipeSizeId,
} from "./gunsSwipeCdn";

export type GunsSwipeCartItem = {
  id: string;
  title: string;
  color: GunsSwipeColorId;
  size: GunsSwipeSizeId;
  pack: GunsSwipePackId;
  price: number;
  qty: number;
  img: string;
  isGift?: boolean;
};

type CartContextValue = {
  open: boolean;
  items: GunsSwipeCartItem[];
  openCart: () => void;
  closeCart: () => void;
  addProduct: (input: {
    title: string;
    color: GunsSwipeColorId;
    size: GunsSwipeSizeId;
    pack: GunsSwipePackId;
    unitPrice: number;
    qty: number;
    img: string;
    giftTitle: string;
  }) => void;
  setQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  productCount: number;
  subtotal: number;
  hasGwp: boolean;
};

const GunsSwipeCartContext = createContext<CartContextValue | null>(null);

function lineKey(color: GunsSwipeColorId, size: GunsSwipeSizeId, pack: GunsSwipePackId) {
  return `bra-${color}-${size}-${pack}`;
}

export function GunsSwipeCartProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<GunsSwipeCartItem[]>([]);

  const openCart = useCallback(() => setOpen(true), []);
  const closeCart = useCallback(() => setOpen(false), []);

  const addProduct = useCallback(
    (input: {
      title: string;
      color: GunsSwipeColorId;
      size: GunsSwipeSizeId;
      pack: GunsSwipePackId;
      unitPrice: number;
      qty: number;
      img: string;
      giftTitle: string;
    }) => {
      const id = lineKey(input.color, input.size, input.pack);
      setItems((prev) => {
        const withoutGift = prev.filter((i) => !i.isGift);
        const existing = withoutGift.find((i) => i.id === id);
        const nextProducts = existing
          ? withoutGift.map((i) =>
              i.id === id ? { ...i, qty: i.qty + input.qty } : i,
            )
          : [
              ...withoutGift,
              {
                id,
                title: input.title,
                color: input.color,
                size: input.size,
                pack: input.pack,
                price: input.unitPrice,
                qty: input.qty,
                img: input.img,
              },
            ];
        const gift: GunsSwipeCartItem = {
          id: "gwp-free-gift",
          title: input.giftTitle,
          color: input.color,
          size: input.size,
          pack: input.pack,
          price: 0,
          qty: 1,
          img: input.img,
          isGift: true,
        };
        return [...nextProducts, gift];
      });
      setOpen(true);
    },
    [],
  );

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) => {
      if (qty < 1) return prev.filter((i) => i.id !== id && !i.isGift);
      const next = prev.map((i) => (i.id === id && !i.isGift ? { ...i, qty } : i));
      const hasProduct = next.some((i) => !i.isGift);
      return hasProduct ? next : [];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      const hasProduct = next.some((i) => !i.isGift);
      return hasProduct ? next : [];
    });
  }, []);

  const productCount = useMemo(
    () => items.filter((i) => !i.isGift).reduce((a, b) => a + b.qty, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((a, b) => a + b.price * b.qty, 0),
    [items],
  );

  const hasGwp = useMemo(() => items.some((i) => i.isGift), [items]);

  const value = useMemo(
    () => ({
      open,
      items,
      openCart,
      closeCart,
      addProduct,
      setQty,
      removeItem,
      productCount,
      subtotal,
      hasGwp,
    }),
    [
      open,
      items,
      openCart,
      closeCart,
      addProduct,
      setQty,
      removeItem,
      productCount,
      subtotal,
      hasGwp,
    ],
  );

  return (
    <GunsSwipeCartContext.Provider value={value}>
      {children}
    </GunsSwipeCartContext.Provider>
  );
}

export function useGunsSwipeCart() {
  const ctx = useContext(GunsSwipeCartContext);
  if (!ctx) {
    throw new Error("useGunsSwipeCart must be used within GunsSwipeCartProvider");
  }
  return ctx;
}
