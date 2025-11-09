import type { ProdutoDto, ProdutoState } from "@/types/produtos";
import axios from "axios";
import { ca } from "vuetify/locale";

function getInitialState(): ProdutoState {
    const items: ProdutoDto[] = [];
    const totalCount = 0;
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
        async create(dto: ProdutoDto) {
            this.isLoadingItem = true;
            try {
                const response = await axios.post<ProdutoDto>("/produtos", dto);
                this.produto = response.data;

                await this.fetch();
            }
            catch (err) { }
            finally {
                this.isLoadingItem = false;
            }
        },
        async update(dto: ProdutoDto) {
            this.isLoadingItem = true;
            try {
                const response = await axios.put<ProdutoDto>("/produtos", dto);
                this.produto = response.data;

                await this.fetch();
            }
            catch (err) { }
            finally {
                this.isLoadingItem = false;
            }
        },
        async fetchById(id: number) {
            this.isLoadingItem = true;
            try {
                const response = await axios.get<ProdutoDto>('/produtos/' + id);
                this.produto = response.data;
            }
            catch (err) { }
            finally {
                this.isLoadingItem = false;
            }
        },
        async fetch() {
            this.isLoadingList = true;
            try {
                const response = await axios.get<ProdutoDto[]>('/produtos');
                this.items = response.data;
            }
            catch (err) { }
            finally {
                this.isLoadingList = false;
            }
        },
        async delete(id: number) {
            this.isLoadingItem = true;
            try {
                await axios.delete<ProdutoDto>('/produtos/' + id);
                await this.fetch();
            }
            catch (err) { }
            finally {
                this.isLoadingItem = false;
            }
        },
    },
});