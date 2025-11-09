<template>
    <v-card :class="cardClass">
        <v-card-title>
            <v-row>
                <v-col cols="12" sm="12" md="8" lg="8">
                    <h1 class="text-h5">{{ produto.produto }}</h1>
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4">
                    <div class="badge-status" :class="badgeClass">
                        {{ badgeText }}
                    </div>
                </v-col>
            </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-row>
                <v-col cols="4">
                    <span class="text-h6">
                        Estoque
                    </span>
                </v-col>
                <v-col cols="8" class="text-end">
                    <span class="text-h6">
                        {{ produto.peso_atual }}/{{ produto.peso_maximo }}Kg
                    </span>
                </v-col>
            </v-row>
            <v-progress-linear class="my-2" :model-value="(produto.peso_atual * 100) / produto.peso_maximo" :height="15"
                rounded :color="stockColor"></v-progress-linear>
            <div class="mt-2">Mín: {{ produto.peso_minimo }}Kg | Máx: {{ produto.peso_maximo }}Kg </div>
            <div class="d-flex mt-2">
                <span>Última atualização:</span>
                <v-spacer></v-spacer>
                <span>2 min atrás</span>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import type { ProdutoDtoWebSocket } from '@/types/produtoWebSocket';

interface CardProdutoProps {
    produto: ProdutoDtoWebSocket
}
const props = defineProps<CardProdutoProps>();

const cardClass = computed(() => {
    const g = props.produto;

    if (g.peso_atual < g.peso_minimo) return 'produto-critical';
    if (g.peso_atual < g.peso_ideal) return 'produto-low';
    if (g.peso_atual < g.peso_maximo) return 'produto-healthy';

    return 'white';
});

const badgeClass = computed(() => {
    const g = props.produto;

    if (g.peso_atual < g.peso_minimo) return 'badge-produto-critical';
    if (g.peso_atual < g.peso_ideal) return 'badge-produto-low';
    if (g.peso_atual < g.peso_maximo) return 'badge-produto-healthy';

    return 'badge-produto-healthy';
});

const badgeText = computed(() => {
    const g = props.produto;

    if (g.peso_atual < g.peso_minimo) return 'Crítico';
    if (g.peso_atual < g.peso_ideal) return 'Baixo';
    if (g.peso_atual < g.peso_maximo) return 'Bom';

    return 'Ótimo';
});

const stockColor = computed(() => {
    const g = props.produto;

    if (g.peso_atual < g.peso_minimo) return '#ff0000';
    if (g.peso_atual < g.peso_ideal) return '#ffa500';
    if (g.peso_atual < g.peso_maximo) return '#008000';

    return '#008000'
});

</script>

<style>
.badge-status {
    width: 100%;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    font-size: 18px;
    display: flex;
    justify-content: space-evenly;
}

.produto-healthy {
    background-color: rgb(196, 255, 196)
}

.produto-low {
    background-color: rgb(255, 232, 189)
}

.produto-critical {
    background-color: rgb(255, 212, 212)
}

.badge-produto-healthy {
    background-color: #415c41
}

.badge-produto-low {
    background-color: #ffa500
}

.badge-produto-critical {
    background-color: #ff0000
}
</style>