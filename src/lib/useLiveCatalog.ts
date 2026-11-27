"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  PRODUCTS,
  REPAIR_SERVICES,
  type ProductItem,
  type RepairService,
} from "@/data/catalog";

export function useLiveRepairServices(): RepairService[] {
  const [overrides, setOverrides] = useState<
    Record<string, Partial<RepairService>>
  >({});

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "repair_services"),
      (snap) => {
        const next: Record<string, Partial<RepairService>> = {};
        snap.docs.forEach((d) => {
          next[d.id] = d.data() as Partial<RepairService>;
        });
        setOverrides(next);
      },
      () => {}
    );
    return () => unsub();
  }, []);

  return REPAIR_SERVICES.map((svc) => ({
    ...svc,
    ...(overrides[svc.id] || {}),
  }));
}

export function useLiveStoreProducts(): {
  customProducts: ProductItem[];
  allProducts: ProductItem[];
} {
  const [customProducts, setCustomProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "store_products"),
      (snap) => {
        setCustomProducts(
          snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<ProductItem, "id">),
          }))
        );
      },
      () => {}
    );
    return () => unsub();
  }, []);

  return {
    customProducts,
    allProducts: [...customProducts, ...PRODUCTS],
  };
}
