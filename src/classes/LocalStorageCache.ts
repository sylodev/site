export interface CachedData {
  value: any;
  expiresAt: number | null;
}

export class LocalStorageCache<Type = unknown> {
  private readonly prefix: string;
  constructor(prefix: string) {
    this.prefix = prefix;
  }

  // 21600 = 6h
  set(unprefixedKey: string, data: Type, expiresSeconds: number = 21600) {
    if (typeof localStorage === "undefined") return;
    const key = this.getKey(unprefixedKey);
    const expiresAt = expiresSeconds ? Date.now() + expiresSeconds * 1000 : null;
    const toCache: CachedData = {
      expiresAt: expiresAt,
      value: data,
    };

    localStorage.setItem(key, JSON.stringify(toCache));
  }

  get(unprefixedKey: string): Type | undefined {
    if (typeof localStorage === "undefined") return;
    const key = this.getKey(unprefixedKey);
    const data = localStorage.getItem(key);
    if (data) {
      const parsed: CachedData = JSON.parse(data);
      if (parsed.expiresAt !== null && Date.now() > parsed.expiresAt) return;
      return parsed.value;
    }
  }

  private getKey(unprefixedKey: string) {
    return `cache:${this.prefix}:${unprefixedKey}`;
  }
}
