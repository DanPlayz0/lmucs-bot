export default function deepFreeze(obj: any): any {
  // Retrieve property names defined on object
  for (const key of Object.getOwnPropertyNames(obj)) {
    const value = obj[key];

    // Freeze value if it is an object
    if (value !== null && (typeof value === "object" || typeof value === "function") && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  }

  return Object.freeze(obj);
}
