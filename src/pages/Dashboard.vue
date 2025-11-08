<template>
  <v-row>
    <v-col cols="12" sm="12" md="3" lg="3">
      <CountCard name="Total de Produtos" icon="mdi-store" :count="10" icon-color="primary" />
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
      <v-btn block class="font-weight-bold" @click="applyFilter()">
        Todas
      </v-btn>
    </v-col>
    <v-col cols="12" sm="12" md="3" lg="3">
      <v-btn block class="font-weight-bold" @click="applyFilter('critico')" color="red">
        Críticas
      </v-btn>
    </v-col>
    <v-col cols="12" sm="12" md="3" lg="3">
      <v-btn block class="font-weight-bold" @click="applyFilter('baixo')" color="orange">
        Baixas
      </v-btn>
    </v-col>
    <v-col cols="12" sm="12" md="3" lg="3">
      <v-btn block class="font-weight-bold" @click="applyFilter('bom', 'otimo')" color="green">
        Saudáveis
      </v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col v-for="produto in filteredItems" :key="produto.id" cols="12" sm="12" md="3" lg="3">
      <v-skeleton-loader v-if="isLoadingProdutos" type="card"></v-skeleton-loader>
      <CardProduto v-else :key="produto.id" :produto="produto" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useProdutoStore } from '@/stores/produtos';
import type { ProdutoDto, StatusStock } from '@/types/produto';
const produtoStore = useProdutoStore();
const isLoadingProdutos = ref<boolean>(false);
const produtos = ref<ProdutoDto[]>(
  [
    {
      id: 1,
      name: "Laticínios",
      minWeight: 100,
      idealWeight: 500,
      maxWeight: 1000,
      weight: 600,
      topic: "laticinio",
      status: "bom"
    },
    {
      id: 2,
      name: "Massas",
      minWeight: 100,
      idealWeight: 500,
      maxWeight: 1000,
      weight: 300,
      topic: "laticinio",
      status: "baixo"
    },
    {
      id: 3,
      name: "Refrigerantes",
      minWeight: 100,
      idealWeight: 500,
      maxWeight: 1000,
      weight: 50,
      topic: "laticinio",
      status: "critico"
    },
    {
      id: 4,
      name: "Temperos",
      minWeight: 100,
      idealWeight: 500,
      maxWeight: 1000,
      weight: 50,
      topic: "laticinio",
      status: "critico"
    },
    {
      id: 5,
      name: "Farináceos",
      minWeight: 100,
      idealWeight: 500,
      maxWeight: 1000,
      weight: 1000,
      topic: "laticinio",
      status: "otimo"
    },
    {
      id: 6,
      name: "Alcoólicos",
      minWeight: 100,
      idealWeight: 500,
      maxWeight: 1000,
      weight: 200,
      topic: "laticinio",
      status: "baixo"
    },
    {
      id: 7,
      name: "Farináceos",
      minWeight: 100,
      idealWeight: 500,
      maxWeight: 1000,
      weight: 1000,
      topic: "laticinio",
      status: "otimo"
    },
    {
      id: 8,
      name: "Alcoólicos",
      minWeight: 100,
      idealWeight: 500,
      maxWeight: 1000,
      weight: 200,
      topic: "laticinio",
      status: "baixo"
    }
  ]);
const filteredItems = ref<ProdutoDto[]>(produtos.value);

function applyFilter(...status: StatusStock[]) {
  isLoadingProdutos.value = true;
  if (status.length > 0)
    filteredItems.value = produtos.value.filter(p => status.includes(p.status));
  else
    filteredItems.value = produtos.value;
  setTimeout(() => isLoadingProdutos.value = false, 300);
}
</script>
