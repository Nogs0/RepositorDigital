<template>
    <v-card :class="cardClass">
        <v-card-title>
            <v-row>
                <v-col cols="12" sm="12" md="8" lg="8">
                    <h1 class="text-h5">{{ gondola.name }}</h1>
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
                        {{ gondola.weight }}/{{ gondola.maxWeight }}
                    </span>
                </v-col>
            </v-row>
            <v-progress-linear class="my-2" :model-value="(gondola.weight * 100) / gondola.maxWeight" :height="15"
                rounded :color="stockColor"></v-progress-linear>
            <div class="mt-2">Mín: {{ gondola.minWeight }} | Máx: {{ gondola.maxWeight }}</div>
            <div class="d-flex mt-2">
                <span>Última atualização:</span>
                <v-spacer></v-spacer>
                <span>2 min atrás</span>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import type { GondolaDto } from '@/types/gondola';

interface CardGondolaProps {
    gondola: GondolaDto
}
const props = defineProps<CardGondolaProps>();

const cardClass = computed(() => {
    const g = props.gondola;

    if (g.weight < g.minWeight) return 'gondola-critical';
    if (g.weight < g.idealWeight) return 'gondola-low';
    if (g.weight < g.maxWeight) return 'gondola-healthy';

    return 'gondola-healthy';
});

const badgeClass = computed(() => {
    const g = props.gondola;

    if (g.weight < g.minWeight) return 'badge-gondola-critical';
    if (g.weight < g.idealWeight) return 'badge-gondola-low';
    if (g.weight < g.maxWeight) return 'badge-gondola-healthy';

    return 'badge-gondola-healthy';
});

const badgeText = computed(() => {
    const g = props.gondola;

    if (g.weight < g.minWeight) return 'Crítico';
    if (g.weight < g.idealWeight) return 'Baixo';
    if (g.weight < g.maxWeight) return 'Bom';

    return 'Ótimo';
});

const stockColor = computed(() => {
    const g = props.gondola;

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

.gondola-healthy {
    background-color: rgb(196, 255, 196)
}

.gondola-low {
    background-color: rgb(255, 232, 189)
}

.gondola-critical {
    background-color: rgb(255, 212, 212)
}

.badge-gondola-healthy {
    background-color: #415c41
}

.badge-gondola-low {
    background-color: #ffa500
}

.badge-gondola-critical {
    background-color: #ff0000
}
</style>