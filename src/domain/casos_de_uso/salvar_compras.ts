export interface SalvarCompras {
  salvar: (compras: Array<SalvarCompras.Params>) => Promise<void>;
}

namespace SalvarCompras {
  export type Params = {
    id: string,
    dataCompra: Date,
    valorCompra: Number;
  };
}