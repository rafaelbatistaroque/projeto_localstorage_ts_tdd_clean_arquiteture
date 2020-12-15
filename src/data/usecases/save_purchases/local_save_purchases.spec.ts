import { ChacheStore } from "@/data/protocols/cache";
import { LocalSavePurchases } from '@/data/usecases/';

class ChacheStoreSpy implements ChacheStore {
  deleteCallsCount = 0;
  key: string;

  delete(key: string): void {
    this.deleteCallsCount++;
    this.key = key;
  }
}

type SutTypes = {
  sut: LocalSavePurchases,
  cacheStore: ChacheStoreSpy;
};

const makeSut = (): SutTypes => {
  const cacheStore = new ChacheStoreSpy();
  const sut = new LocalSavePurchases(cacheStore);
  return {
    cacheStore,
    sut
  };
};

describe("LocalSavePurchases", () => {
  test("Should not delete cache on sut.init", () => {
    const { cacheStore } = makeSut();
    expect(cacheStore.deleteCallsCount).toBe(0);
  });

  test("Should not delete cache on sut.save", async () => {
    const { cacheStore, sut } = makeSut();
    await sut.save();
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.key).toBe("purchases");
  });
});