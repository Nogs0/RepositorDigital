<template>
    <v-card :class="cardClass">
        <v-card-title>
            <v-row>
                <v-col cols="12" sm="12" md="8" lg="8">
                    <h1 class="text-h5">{{ produto.name }}</h1>
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
                <v-col cols="8">
                    <span class="text-h6">
                        Nível do estoque
                    </span>
                </v-col>
                <v-col cols="4" class="text-end">
                    <span class="text-h6">
                        {{ produto.weight }}/{{ produto.maxWeight }}
                    </span>
                </v-col>
            </v-row>
            <v-progress-linear class="my-2" :model-value="(produto.weight * 100) / produto.maxWeight" :height="15"
                rounded :color="stockColor"></v-progress-linear>
            <div class="mt-2">Mín: {{ produto.minWeight }} | Máx: {{ produto.maxWeight }}</div>
            <div class="d-flex mt-2">
                <span>Última atualização:</span>
                <v-spacer></v-spacer>
                <span>2 min atrás</span>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import type { ProdutoDto } from '@/types/produto';

interface CardProdutoProps {
    produto: ProdutoDto
}
const props = defineProps<CardProdutoProps>();

const cardClass = computed(() => {
    const g = props.produto;

    if (g.weight < g.minWeight) return 'produto-critical';
    if (g.weight < g.idealWeight) return 'produto-low';
    if (g.weight < g.maxWeight) return 'produto-healthy';

    return 'produto-healthy';
});

const badgeClass = computed(() => {
    const g = props.produto;

    if (g.weight < g.minWeight) return 'badge-produto-critical';
    if (g.weight < g.idealWeight) return 'badge-produto-low';
    if (g.weight < g.maxWeight) return 'badge-produto-healthy';

    return 'badge-produto-healthy';
});

const badgeText = computed(() => {
    const g = props.produto;

    if (g.weight < g.minWeight) return 'Crítico';
    if (g.weight < g.idealWeight) return 'Baixo';
    if (g.weight < g.maxWeight) return 'Bom';

    return 'Ótimo';
});

const stockColor = computed(() => {
    const g = props.produto;

    if (g.weight < g.minWeight) return '#ff0000';
    if (g.weight < g.idealWeight) return '#ffa500';
    if (g.weight < g.maxWeight) return '#008000';

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