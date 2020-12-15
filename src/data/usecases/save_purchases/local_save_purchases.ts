import { ChacheStore } from "@/data/protocols/cache";

export class LocalSavePurchases {
  constructor(private readonly cacheStore: ChacheStore) { }

  async save(): Promise<void> {
    this.cacheStore.delete("purchases");
    this.cacheStore.insert("purchases");
  }
}