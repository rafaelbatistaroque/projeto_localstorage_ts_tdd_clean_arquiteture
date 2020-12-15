import { ChacheStore } from "@/data/protocols/cache";
import { SavePurchases } from "@/domain";

export class LocalSavePurchases implements SavePurchases {
  constructor(private readonly cacheStore: ChacheStore) { }

  async save(purchases: Array<SavePurchases.Params>): Promise<void> {
    this.cacheStore.delete("purchases");
    this.cacheStore.insert("purchases", purchases);
  }
}