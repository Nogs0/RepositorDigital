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
    <v-col v-for="produto in produtoWebSocketStore.produtos" :key="produto.produto" cols="12" sm="12" md="3" lg="3">
      <CardProduto :produto="produto" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useProdutosWebSocketStore } from '@/stores/produtosWebSocket';
import type { StatusStock } from '@/types/produto';

const produtoWebSocketStore = useProdutosWebSocketStore();
onMounted(() => {
  if (!produtoWebSocketStore.isConnected)
    produtoWebSocketStore.connect()
})

function applyFilter(...status: StatusStock[]) {
  
}


</script>
