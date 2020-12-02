class LocalSavePurchases {
  constructor(private readonly cacheStore: ChacheStore) { }
}

interface ChacheStore {

}

class ChacheStoreSpy implements ChacheStore {
  deleteCallsCount = 0;
}

describe("LocalSavePurchases", () => {
  test("Should not delete cache on sut.init", () => {
    const cacheStore = new ChacheStoreSpy();
    const sut = new LocalSavePurchases(cacheStore);
    expect(cacheStore.deleteCallsCount).toBe(0);
  });
});