class LocalSavePurchases {
  constructor(private readonly cacheStore: ChacheStore) { }

  async save(): Promise<void> {
    this.cacheStore.delete();
  }
}

interface ChacheStore {
  delete(): void;
}

class ChacheStoreSpy implements ChacheStore {
  deleteCallsCount = 0;
  delete(): void {
    this.deleteCallsCount++;
  }
}

describe("LocalSavePurchases", () => {
  test("Should not delete cache on sut.init", () => {
    const cacheStore = new ChacheStoreSpy();
    new LocalSavePurchases(cacheStore);
    expect(cacheStore.deleteCallsCount).toBe(0);
  });

  test("Should not delete cache on sut.save", async () => {
    const cacheStore = new ChacheStoreSpy();
    const sut = new LocalSavePurchases(cacheStore);
    await sut.save();
    expect(cacheStore.deleteCallsCount).toBe(1);
  });
});