<template>
  <v-row>
    <v-col cols="12" sm="12" md="3" lg="3">
      <CountCard name="Total de Produtos" icon="mdi-store" :count="produtoWebSocketStore.produtos.length" icon-color="primary" />
    </v-col>
    <v-col cols="12" sm="12" md="3" lg="3">
      <CountCard name="Estoque Crítico" icon="mdi-store-remove" :count="produtoWebSocketStore.produtos.filter(p => p.peso_atual < p.peso_minimo).length" icon-color="red" />
    </v-col>
    <v-col cols="12" sm="12" md="3" lg="3">
      <CountCard name="Estoque Baixo" icon="mdi-store-alert" :count="produtoWebSocketStore.produtos.filter(p => p.peso_atual < p.peso_ideal && p.peso_atual > p.peso_minimo).length" icon-color="orange" />
    </v-col>
    <v-col cols="12" sm="12" md="3" lg="3">
      <CountCard name="Estoque Ideal" icon="mdi-store-check" :count="produtoWebSocketStore.produtos.filter(p => p.peso_atual > p.peso_ideal).length" icon-color="green" />
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

const produtoWebSocketStore = useProdutosWebSocketStore();


onMounted(() => {
  if (!produtoWebSocketStore.isConnected)
    produtoWebSocketStore.connect()
})

</script>
