import type { ProdutoWebSocketState, ProdutoDtoWebSocket } from "@/types/produtoWebSocket";
import { defineStore } from "pinia"
import { io } from 'socket.io-client';

function getInitialState(): ProdutoWebSocketState {
    const socket = null;
    const isConnected = false;
    const error = ``;
    const produtos: ProdutoDtoWebSocket[] = []

    return { socket, error, isConnected, produtos };
}

export const useProdutosWebSocketStore = defineStore("produtosWebSocket", {
    state: (): ProdutoWebSocketState => getInitialState(),
    getters: {

    },
    actions: {
        connect() {
            if (this.socket && this.isConnected) return;

            console.log('Conectando ao Socket.IO...');

            this.socket = io("ws://localhost:5000", {
                transports: ['websocket'], // Força o uso de WebSockets
            });

            this.socket.on('connect', () => {
                this.isConnected = true;
                this.error = '';
            });

            this.socket.on('disconnect', (reason) => {
                this.isConnected = false;
                this.error = reason;
            });

            this.socket.on('connect_error', (err) => {
                this.error = err.message;
            });

            this.socket.on('produtos_iniciais', (data) => {
                this.produtos = data;
            });

            this.socket.on('produto_atualizado', (data) => {
                let index = this.produtos.findIndex(p => p.produto == data.produto);
                if (index > -1 && this.produtos[index])
                    this.produtos[index].peso_atual = data.peso_atual;
                else this.produtos.push(data);
            });
        }
    }
})