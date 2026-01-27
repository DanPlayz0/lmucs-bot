type DeepReadonly<T> = T extends (...args: any[]) => any ? T : T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> } : T;

export default function deepFreeze<T extends object>(obj: T): DeepReadonly<T> {
  for (const key of Object.getOwnPropertyNames(obj) as (keyof T)[]) {
    const value = obj[key];

    if (value !== null && (typeof value === "object" || typeof value === "function") && !Object.isFrozen(value)) {
      deepFreeze(value as object);
    }
  }

  return Object.freeze(obj) as DeepReadonly<T>;
}
