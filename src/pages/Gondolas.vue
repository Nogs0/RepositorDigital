<template>
  <v-sheet border rounded>
    <v-data-table-server :headers="headers" :loading="gondolaStore.isLoadingGondolas" :items="gondolaStore.items"
      :hide-default-footer="gondolaStore.totalCount < 11" :items-length="gondolaStore.totalCount">
      <template v-slot:top>
        <header-table table-name="Suas Gôndolas" icon="mdi-store" @add="openCreateDialog()" search-fields="Nome"
          @search="handleSearch">
        </header-table>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-container>
          <v-icon icon="mdi-pencil" size="small" title="Editar" @click="openEditDialog(item.id)"></v-icon>
          <v-icon icon="mdi-delete" size="small" tkte="Excluir" @click="openDeleteDialog(item.id)"></v-icon>
        </v-container>
      </template>
    </v-data-table-server>
  </v-sheet>

  <v-dialog max-width="500" v-model="createOrEditDialog">
    <v-card :title="`${isEditing ? 'Editando' : 'Criando'} Gôndola`">
      <v-divider></v-divider>
      <v-form @submit.prevent="save" ref="formCreateOrEditGondola" v-model="isFormValid" :loading="loadingItem">
        <v-container>
          <v-text-field v-model="formModel.name" label="Nome *" placeholder="Insira o nome"
            :rules="[rules.required, rules.minLength(1), rules.maxLength(128)]"></v-text-field>
        </v-container>
        <v-container>
          <v-text-field v-model="formModel.minWeight" label="Peso mínimo *" placeholder="Insira o peso mínimo"
            :rules="[rules.required]"></v-text-field>
        </v-container>
        <v-container>
          <v-text-field v-model="formModel.idealWeight" label="Peso ideal *" placeholder="Insira o peso ideal"
            :rules="[rules.required]"></v-text-field>
        </v-container>
        <v-container>
          <v-text-field v-model="formModel.maxWeight" label="Peso máximo *" placeholder="Insira o peso máximo"
            :rules="[rules.required]"></v-text-field>
        </v-container>
        <v-card-actions>
          <v-btn text="Cancelar" @click="createOrEditDialog = !createOrEditDialog"></v-btn>
          <v-spacer></v-spacer>
          <v-btn type="submit" text="Salvar" color="green" :loading="loadingItem"
            :disabled="!isFormValid || loadingItem" variant="flat"></v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>

  <v-dialog max-width="400" v-model="deleteDialog">
    <v-card title="Excluir Gôndola">
      <v-container>
        <p>Deseja realmente excluir essa gôndula?</p>
      </v-container>
      <v-card-actions>
        <v-btn text="Cancelar" @click="deleteDialog = !deleteDialog"></v-btn>
        <v-spacer></v-spacer>
        <v-btn text="Excluir" color="red" :loading="loadingItem" @click="deleteItem()"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useGondolaStore } from "@/stores/gondolas";
import type { GondolaDto } from "@/types/gondola";
import { rules } from "@/utils/rules";
import type { DataTableHeader } from "vuetify";
import { ca } from "vuetify/locale";
const gondolaStore = useGondolaStore();
const isEditing = ref<boolean>(false);

const headers = ref<Readonly<DataTableHeader[]>>([
  { title: "Nome", key: "name", sortable: false },
  { title: "Peso Mínimo", key: "minWeight", sortable: false },
  { title: "Peso Ideal", key: "idealWeight", sortable: false },
  { title: "Peso Máximo", key: "maxWeight", sortable: false },
  { title: "Ações", key: "actions", sortable: false, align: "center", width: "10%" },
]);

const createOrEditDialog = ref<boolean>(false);
const deleteDialog = ref<boolean>(false);
const formModel = ref<GondolaDto>(createNewRecord());
const formCreateOrEditGondola = ref<HTMLFormElement | null>(null);
const isFormValid = ref<boolean>(false);
const loadingItem = ref<boolean>(false);

const idToDelete = ref<number | null>(null);

function createNewRecord(): GondolaDto {
  return {
    id: 0,
    name: "",
    minWeight: 0,
    idealWeight: 0,
    maxWeight: 0,
  };
}

function openCreateDialog() {
  formModel.value = createNewRecord();
  createOrEditDialog.value = true;
}

function openEditDialog(id: number) {
  let index = gondolaStore.items.findIndex(g => g.id == id);
  if (index > -1 && gondolaStore.items[index]) {
    formModel.value = {...gondolaStore.items[index]};
    createOrEditDialog.value = true;
    isEditing.value = true;
  }
  else {
    alert("Item não encontrado.");
    return;
  }
}

function openDeleteDialog(id: number) {
  deleteDialog.value = true;
  idToDelete.value = id;
}

function deleteItem() {
  if (!idToDelete.value) {
    alert("Id para exclusão não definido.");
    return;
  }

  let index = gondolaStore.items.findIndex(g => g.id == idToDelete.value);
  if (index > -1) {
    gondolaStore.items.splice(index, 1);
    deleteDialog.value = false;
  }
  else {
    alert("Item não encontrado.");
    return;
  }
}

async function save() {
  if (loadingItem.value)
    return;

  const { valid } = await formCreateOrEditGondola.value?.validate();
  if (!valid) {
    loadingItem.value = false;
    return;
  }

  if (isEditing.value) {
    try {
      let index = gondolaStore.items.findIndex(g => g.id == formModel.value.id);
      if (index > -1 && gondolaStore.items[index]) {
        gondolaStore.items[index].name = formModel.value.name;
        gondolaStore.items[index].minWeight = formModel.value.minWeight;
        gondolaStore.items[index].idealWeight = formModel.value.idealWeight;
        gondolaStore.items[index].maxWeight = formModel.value.maxWeight;
      }
    }
    catch (error) {
      alert(error);
    }
  }
  else {
    gondolaStore.items.push(formModel.value);
  }

  createOrEditDialog.value = false;
}

function handleSearch() {

}

</script>
