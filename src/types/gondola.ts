import type { PagedInputDto } from "./shared"

export interface GondolaState {
    isLoadingList: boolean,
    items: GondolaDto[],
    totalCount: number,
    error: string | null,
    isLoadingItem: boolean,
    gondola: GondolaDto | null,
    pagedInput: PagedInputDto | null
}

export interface GondolaDto {
    id: number,
    name: string,
    minWeight: number,
    idealWeight: number,
    maxWeight: number ,
    weight: number
}

export interface CreateGondolaDto {
    name: string,
    minWeight: number,
    idealWeight: number,
    maxWeight: number  
}