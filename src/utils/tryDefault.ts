export default function tryDefault<T = any>(env: string, transform?: (value: string) => T, defaultValue?: T): T | undefined {
  const variable = process.env[env] ?? undefined;
  if (variable === undefined) return defaultValue;
  if (transform) {
    try {
      return transform(variable);
    } catch (e) {
      console.error(`Error transforming environment variable ${env}:`, e);
      return defaultValue;
    }
  }
  return variable as unknown as T;
}
