"use client";

import { useState, useEffect, useCallback } from "react";
import {
  applyListMutations,
  consumeListMutations,
} from "@/lib/adminListCache";

export function useLocalList<T extends { id: string }>(key: string, initial: T[]) {
  const [items, setItems] = useState<T[]>(initial);

  useEffect(() => {
    const pending = consumeListMutations<T>(key);
    if (pending.length > 0) {
      setItems((current) => applyListMutations(current, pending));
    }
  }, [key]);

  const addItem = useCallback((item: T) => {
    setItems((prev) => [item, ...prev.filter((i) => i.id !== item.id)]);
  }, []);

  const updateItem = useCallback((item: T) => {
    setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return { items, addItem, updateItem, removeItem };
}
