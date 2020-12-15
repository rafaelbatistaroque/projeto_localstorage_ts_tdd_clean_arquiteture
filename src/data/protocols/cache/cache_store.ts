export interface ChacheStore {
  delete(key: string): void;
  insert(key: string): void;
}