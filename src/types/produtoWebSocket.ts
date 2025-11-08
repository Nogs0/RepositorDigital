import type { Socket } from "socket.io-client"

export interface ProdutoWebSocketState {
    error: string,
    socket: Socket | null,
    isConnected: boolean,
    produtos: ProdutoDtoWebSocket[]
}

export interface ProdutoDtoWebSocket {
    produto: string,
    nivel_estoque: number,
    peso_minimo: number,
    peso_maximo: number,
    peso_atual: number,
    peso_ideal: number,
    ultima_atualizacao: string
}