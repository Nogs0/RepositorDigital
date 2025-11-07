<template>
  <v-row>
    <v-col cols="12" sm="12" md="3" lg="3">
      <CountCard name="Total de Gôndolas" icon="mdi-store" :count="10" icon-color="primary" />
    </v-col>
    <v-col cols="12" sm="12" md="3" lg="3">
      <CountCard name="Estoque Crítico" icon="mdi-store-remove" :count="10" icon-color="red" />
    </v-col>
    <v-col cols="12" sm="12" md="3" lg="3">
      <CountCard name="Estoque Baixo" icon="mdi-store-alert" :count="10" icon-color="orange" />
    </v-col>
    <v-col cols="12" sm="12" md="3" lg="3">
      <CountCard name="Estoque Ideal" icon="mdi-store-check" :count="10" icon-color="green" />
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="12" md="3" lg="3">
      <v-btn block>
        Todas
      </v-btn>
    </v-col>
    <v-col cols="12" sm="12" md="3" lg="3">
      <v-btn block>
        Críticas
      </v-btn>
    </v-col>
    <v-col cols="12" sm="12" md="3" lg="3">
      <v-btn block>
        Baixas
      </v-btn>
    </v-col>
    <v-col cols="12" sm="12" md="3" lg="3">
      <v-btn block>
        Saudáveis
      </v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col v-for="gondola in gondolas" :key="gondola.id" cols="12" sm="12" md="3" lg="3">
      <CardGondola :key="gondola.id" :gondola="gondola" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useGondolaStore } from '@/stores/gondolas';
import type { GondolaDto } from '@/types/gondola';

const gondolaStore = useGondolaStore();

const gondolas = ref<GondolaDto[]>(
  [
    {
      id: 1,
      name: "Laticínios",
      minWeight: 100,
      idealWeight: 500,
      maxWeight: 1000,
      weight: 600
    },
    {
      id: 2,
      name: "Massas",
      minWeight: 100,
      idealWeight: 500,
      maxWeight: 1000,
      weight: 300
    },
    {
      id: 3,
      name: "Refrigerantes",
      minWeight: 100,
      idealWeight: 500,
      maxWeight: 1000,
      weight: 50
    },
    {
      id: 4,
      name: "Temperos",
      minWeight: 100,
      idealWeight: 500,
      maxWeight: 1000,
      weight: 50
    },
    {
      id: 5,
      name: "Farináceos",
      minWeight: 100,
      idealWeight: 500,
      maxWeight: 1000,
      weight: 1000
    },
    {
      id: 3,
      name: "Alcoólicos",
      minWeight: 100,
      idealWeight: 500,
      maxWeight: 1000,
      weight: 200
    }
  ]);
</script>
