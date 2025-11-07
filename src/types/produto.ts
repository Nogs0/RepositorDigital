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
    id: number,
    name: string,
    minWeight: number,
    idealWeight: number,
    maxWeight: number ,
    weight: number
}

export interface CreateProdutoDto {
    name: string,
    minWeight: number,
    idealWeight: number,
    maxWeight: number  
}