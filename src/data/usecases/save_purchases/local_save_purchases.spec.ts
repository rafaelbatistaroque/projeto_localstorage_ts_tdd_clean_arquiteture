import { ChacheStore } from "@/data/protocols/cache";
import { LocalSavePurchases } from '@/data/usecases/';
import { SavePurchases } from "@/domain";

class ChacheStoreSpy implements ChacheStore {
  deleteCallsCount = 0;
  insertCallsCount = 0;
  deleteKey: string;
  insertKey: string;
  insertValues: Array<SavePurchases.Params> = [];

  delete(key: string): void {
    this.deleteCallsCount++;
    this.deleteKey = key;
  }

  insert(key: string, value: any): void {
    this.insertCallsCount++;
    this.insertKey = key;
    this.insertValues = value;
  }

  simulateDeleteError(): void {
    jest.spyOn(ChacheStoreSpy.prototype, "delete").mockImplementationOnce(() => { throw new Error(); });
  }
}

const mockPurchases = (): Array<SavePurchases.Params> => [{
  id: '1',
  date: new Date(),
  value: 50
},
{
  id: '2',
  date: new Date(),
  value: 70
}];

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
    await sut.save(mockPurchases());
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.deleteKey).toBe("purchases");
  });

  test("Should not insert new cache if delete fails", () => {
    const { cacheStore, sut } = makeSut();
    cacheStore.simulateDeleteError();
    const promise = sut.save(mockPurchases());
    expect(cacheStore.insertCallsCount).toBe(0);
    expect(promise).rejects.toThrow();
  });

  test("Should insert new cache if delete succeeds", async () => {
    const { cacheStore, sut } = makeSut();
    const purchases = mockPurchases();
    await sut.save(purchases);
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.insertCallsCount).toBe(1);
    expect(cacheStore.insertKey).toBe("purchases");
    expect(cacheStore.insertValues).toEqual(purchases);
  });
});