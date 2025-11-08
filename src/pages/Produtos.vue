<template>
  <v-sheet border rounded>
    <v-data-table-server :headers="headers" :loading="produtoStore.isLoadingProdutos" :items="produtoStore.items"
      :hide-default-footer="produtoStore.totalCount < 11" :items-length="produtoStore.totalCount">
      <template v-slot:top>
        <header-table table-name="Seus Produtos" icon="mdi-store" @add="openCreateDialog()" search-fields="Nome"
          @search="handleSearch">
        </header-table>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-container>
          <v-icon icon="mdi-pencil" size="small" title="Editar" @click="openEditDialog(item.id)"></v-icon>
        </v-container>
      </template>
    </v-data-table-server>
  </v-sheet>

  <v-dialog max-width="500" v-model="createOrEditDialog">
    <v-card :title="`${isEditing ? 'Editando' : 'Criando'} Produto`">
      <v-divider></v-divider>
      <v-form @submit.prevent="save" ref="formCreateOrEditProduto" v-model="isFormValid" :loading="loadingItem">
        <v-container>
          <v-text-field v-model="formModel.name" label="Nome *" placeholder="Insira o nome"
            :rules="[rules.required, rules.minLength(1), rules.maxLength(128)]"></v-text-field>
          <v-text-field v-model="formModel.minWeight" label="Peso mínimo *" placeholder="Insira o peso mínimo"
            :rules="[rules.required]"></v-text-field>
          <v-text-field v-model="formModel.idealWeight" label="Peso ideal *" placeholder="Insira o peso ideal"
            :rules="[rules.required]"></v-text-field>
          <v-text-field v-model="formModel.maxWeight" label="Peso máximo *" placeholder="Insira o peso máximo"
            :rules="[rules.required]"></v-text-field>
          <v-text-field v-model="formModel.topic" label="Tópico *" placeholder="Insira o tópico"
            :rules="[rules.required, rules.minLength(4), rules.maxLength(64)]"></v-text-field>
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
</template>

<script lang="ts" setup>
import { useProdutoStore } from "@/stores/produtos";
import type { ProdutoDto } from "@/types/produto";
import { rules } from "@/utils/rules";
import type { DataTableHeader } from "vuetify";
const produtoStore = useProdutoStore();
const isEditing = ref<boolean>(false);

const headers = ref<Readonly<DataTableHeader[]>>([
  { title: "Nome", key: "name", sortable: false },
  { title: "Peso Mínimo", key: "minWeight", sortable: false },
  { title: "Peso Ideal", key: "idealWeight", sortable: false },
  { title: "Peso Máximo", key: "maxWeight", sortable: false },
  { title: "Ações", key: "actions", sortable: false, align: "center", width: "10%" },
]);

const createOrEditDialog = ref<boolean>(false);
const formModel = ref<ProdutoDto>(createNewRecord());
const formCreateOrEditProduto = ref<HTMLFormElement | null>(null);
const isFormValid = ref<boolean>(false);
const loadingItem = ref<boolean>(false);

function createNewRecord(): ProdutoDto {
  return {
    id: 0,
    name: "",
    minWeight: 0,
    idealWeight: 0,
    maxWeight: 0,
    weight: 0,
    topic: "",
    status: "critico"
  };
}

function openCreateDialog() {
  formModel.value = createNewRecord();
  createOrEditDialog.value = true;
}

function openEditDialog(id: number) {
  let index = produtoStore.items.findIndex((g) => g.id == id);
  if (index > -1 && produtoStore.items[index]) {
    formModel.value = { ...produtoStore.items[index] };
    createOrEditDialog.value = true;
    isEditing.value = true;
  } else {
    alert("Item não encontrado.");
    return;
  }
}

async function save() {
  if (loadingItem.value) return;

  const { valid } = await formCreateOrEditProduto.value?.validate();
  if (!valid) {
    loadingItem.value = false;
    return;
  }

  if (isEditing.value) {
    try {
      let index = produtoStore.items.findIndex((g) => g.id == formModel.value.id);
      if (index > -1 && produtoStore.items[index]) {
        produtoStore.items[index].name = formModel.value.name;
        produtoStore.items[index].minWeight = formModel.value.minWeight;
        produtoStore.items[index].idealWeight = formModel.value.idealWeight;
        produtoStore.items[index].maxWeight = formModel.value.maxWeight;
        produtoStore.items[index].topic = formModel.value.topic;
      }
    } catch (error) {
      alert(error);
    }
  } else {
    produtoStore.items.push(formModel.value);
  }

  createOrEditDialog.value = false;
}

function handleSearch() { }
</script>
