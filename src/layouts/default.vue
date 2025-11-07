<template>
  <v-app>
    <v-navigation-drawer v-model="menuOpen" color="primary">
      <v-list>
        <v-list-item height="56px">Repositor</v-list-item>
        <v-list-item to="/dashboard">Dashboard</v-list-item>
        <v-list-item to="/produtos">Produtos</v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click.stop="menuOpen = !menuOpen"></v-app-bar-nav-icon>
      <v-toolbar-title>Mercadinho do seu Zé</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-logout" @click.stop="logoutDialog = !logoutDialog"></v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>

  <v-dialog v-model="logoutDialog" max-width="400">
    <v-card title="Sair">
      <v-divider></v-divider>
      <v-container>
        <p>Deseja realmente sair?</p>
      </v-container>
      <v-card-actions>
        <v-btn text="Cancelar" @click.stop="logoutDialog = !logoutDialog"></v-btn>
        <v-spacer></v-spacer>
        <v-btn color="red" text="Sair"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script lang="ts" setup>
const menuOpen = ref<boolean>(true);
const logoutDialog = ref<boolean>(false);
</script>
