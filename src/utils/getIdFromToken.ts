export default function getIdFromToken(token: string): string {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid token format.");
  const id = Buffer.from(parts[0], "base64").toString("utf-8");
  if (!/^\d+$/.test(id)) throw new Error("Invalid token ID.");
  return id;
}
