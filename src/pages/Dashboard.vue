<template>
  <v-row>
    <v-col cols="3">
      <CountCard name="Total de Gôndolas" icon="mdi-store" :count="10" />
    </v-col>
    <v-col cols="3">
      <CountCard name="Estoque Crítico" icon="mdi-store-remove" :count="10" />
    </v-col>
    <v-col cols="3">
      <CountCard name="Estoque Baixo" icon="mdi-store-alert" :count="10" />
    </v-col>
    <v-col cols="3">
      <CountCard name="Estoque Ideal" icon="mdi-store-check" :count="10" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
//
</script>
