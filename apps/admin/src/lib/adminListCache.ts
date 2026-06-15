export type ListMutation<T> =
  | { op: "add"; item: T }
  | { op: "update"; item: T }
  | { op: "remove"; id: string };

function storageKey(key: string) {
  return `admin-list:${key}`;
}

export function stashListMutation<T>(key: string, mutation: ListMutation<T>) {
  if (typeof window === "undefined") return;
  const pending = JSON.parse(
    sessionStorage.getItem(storageKey(key)) || "[]"
  ) as ListMutation<T>[];
  pending.push(mutation);
  sessionStorage.setItem(storageKey(key), JSON.stringify(pending));
}

export function consumeListMutations<T>(key: string): ListMutation<T>[] {
  if (typeof window === "undefined") return [];
  const pending = JSON.parse(
    sessionStorage.getItem(storageKey(key)) || "[]"
  ) as ListMutation<T>[];
  sessionStorage.removeItem(storageKey(key));
  return pending;
}

export function applyListMutations<T extends { id: string }>(
  items: T[],
  mutations: ListMutation<T>[]
): T[] {
  let result = [...items];
  for (const mutation of mutations) {
    if (mutation.op === "add") {
      result = [mutation.item, ...result.filter((i) => i.id !== mutation.item.id)];
    } else if (mutation.op === "update") {
      const exists = result.some((i) => i.id === mutation.item.id);
      result = exists
        ? result.map((i) => (i.id === mutation.item.id ? mutation.item : i))
        : [mutation.item, ...result];
    } else if (mutation.op === "remove") {
      result = result.filter((i) => i.id !== mutation.id);
    }
  }
  return result;
}
