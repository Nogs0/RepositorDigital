<template>
  <v-app>
    <v-navigation-drawer v-model="menuOpen" color="primary">
      <v-list>
        <v-list-item to="/dashboard">Dashboard</v-list-item>
        <v-list-item to="/produtos">Produtos</v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click.stop="menuOpen = !menuOpen"></v-app-bar-nav-icon>
      <v-toolbar-title>Mercadinho do seu Zé</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>

</template>

<script lang="ts" setup>
const menuOpen = ref<boolean>(true);
</script>
