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
                console.log('Socket.IO Conectado! ID:', this.socket?.id);
            });

            this.socket.on('disconnect', (reason) => {
                this.isConnected = false;
                this.error = reason;
                console.log('Socket.IO Desconectado:', reason);
            });

            this.socket.on('connect_error', (err) => {
                console.error('Erro de conexão Socket.IO:', err.message);
                this.error = err.message;
            });

            this.socket.on('produtos_iniciais', (data) => {
                console.log('[Socket.IO] Recebido [produtos_iniciais]:', data);
                this.produtos = data;
            });
        }
    }
})