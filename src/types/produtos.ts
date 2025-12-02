import type { PagedInputDto } from "./shared"

export interface ProdutoState {
    isLoadingList: boolean,
    items: ProdutoDto[],
    totalCount: number,
    error: string | null,
    isLoadingItem: boolean,
    produto: ProdutoDto | null,
    pagedInput: PagedInputDto | null
}

export interface ProdutoDto {
    // produto_id: number,
    nome: string,
    pesoMinimo: number,
    pesoIdeal: number,
    pesoMaximo: number
}

export type StatusStock = "otimo" | "bom" | "baixo" | "critico";

export interface CreateProdutoDto {
    name: string,
    minWeight: number,
    idealWeight: number,
    maxWeight: number
}