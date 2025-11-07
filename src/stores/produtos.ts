import type { ProdutoDto, ProdutoState } from "@/types/produto";

function getInitialState(): ProdutoState {
    const items: ProdutoDto[] = [
        {
            id: 1,
            name: "A",
            minWeight: 100,
            idealWeight: 400,
            maxWeight: 500,
            weight: 200
        },
        {
            id: 2,
            name: "B",
            minWeight: 100,
            idealWeight: 400,
            maxWeight: 500,
            weight: 200
        },
        {
            id: 3,
            name: "C",
            minWeight: 100,
            idealWeight: 400,
            maxWeight: 500,
            weight: 200
        },
        {
            id: 4,
            name: "D",
            minWeight: 100,
            idealWeight: 400,
            maxWeight: 500,
            weight: 200
        }
    ];

    const totalCount: number = 4;
    const produto = null;
    const isLoadingList = false;
    const isLoadingItem = false;
    const error = null;
    const pagedInput = null;

    return { items, totalCount, produto, isLoadingList, isLoadingItem, error, pagedInput };
}

export const useProdutoStore = defineStore("Produtos", {
    state: (): ProdutoState => getInitialState(),
    getters: {
        isLoadingProdutos: (state): boolean => state.isLoadingList,
        isLoadingProduto: (state): boolean => state.isLoadingItem,
        totalCountProdutos: (state): number => state.totalCount
    },
    actions: {
        async fetchProdutoById(id: number) {
            const index = this.items.findIndex(i => i.id == id);
            if (index > -1 && this.items[index])
                this.produto = this.items[index];
            else
                this.error = "Produto não encontrada.";
        }
    },
});