import type { GondolaDto, GondolaState } from "@/types/gondola";

function getInitialState(): GondolaState {
    const items: GondolaDto[] = [
        {
            id: 1,
            name: "A",
            minWeight: 100,
            idealWeight: 400,
            maxWeight: 500
        },
        {
            id: 2,
            name: "B",
            minWeight: 100,
            idealWeight: 400,
            maxWeight: 500
        },
        {
            id: 3,
            name: "C",
            minWeight: 100,
            idealWeight: 400,
            maxWeight: 500
        },
        {
            id: 4,
            name: "D",
            minWeight: 100,
            idealWeight: 400,
            maxWeight: 500
        }
    ];

    const totalCount: number = 4;
    const gondola = null;
    const isLoadingList = false;
    const isLoadingItem = false;
    const error = null;
    const pagedInput = null;

    return { items, totalCount, gondola, isLoadingList, isLoadingItem, error, pagedInput };
}

export const useGondolaStore = defineStore("Gondolas", {
    state: (): GondolaState => getInitialState(),
    getters: {
        isLoadingGondolas: (state): boolean => state.isLoadingList,
        isLoadingGondola: (state): boolean => state.isLoadingItem,
        totalCountGondolas: (state): number => state.totalCount
    },
    actions: {
        async fetchGondolaById(id: number) {
            const index = this.items.findIndex(i => i.id == id);
            if (index > -1 && this.items[index])
                this.gondola = this.items[index];
            else
                this.error = "Gôndola não encontrada.";
        }
    },
});