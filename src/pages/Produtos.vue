<template>
  <v-sheet border rounded>
    <v-data-table-server :headers="headers" :loading="produtoStore.isLoadingProdutos" :items="produtoStore.items"
      :hide-default-footer="produtoStore.totalCount < 11" :items-length="produtoStore.totalCount"
      @update:options="produtoStore.fetch()" disable-sort>
      <template v-slot:top>
        <header-table table-name="Seus Produtos" icon="mdi-store" @add="openCreateDialog()" search-fields="Nome"
          @search="handleSearch">
        </header-table>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-container>
          <v-icon icon="mdi-pencil" size="small" title="Editar" @click="openEditDialog(item.produto_id)"></v-icon>
          <v-icon icon="mdi-trash-can" size="small" title="Excluir" @click="openDeleteDialog(item.produto_id)"></v-icon>
        </v-container>
      </template>
      <template v-slot:no-data>
        <no-items-table @add="openCreateDialog()" table-name="produtos"></no-items-table>
      </template>
    </v-data-table-server>
  </v-sheet>

  <v-dialog max-width="500" v-model="createOrEditDialog">
    <v-card :title="`${isEditing ? 'Editando' : 'Criando'} Produto`">
      <v-divider></v-divider>
      <v-form @submit.prevent="save" ref="formCreateOrEditProduto" v-model="isFormValid" :loading="loadingItem">
        <v-container>
          <v-text-field v-model="formModel.nome" label="Nome *" placeholder="Insira o nome"
            :rules="[rules.required, rules.minLength(1), rules.maxLength(128)]"></v-text-field>
          <v-text-field v-model="formModel.pesoMinimo" label="Peso mínimo *" placeholder="Insira o peso mínimo"
            :rules="[rules.required]"></v-text-field>
          <v-text-field v-model="formModel.pesoIdeal" label="Peso ideal *" placeholder="Insira o peso ideal"
            :rules="[rules.required]"></v-text-field>
          <v-text-field v-model="formModel.pesoMaximo" label="Peso máximo *" placeholder="Insira o peso máximo"
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
    <v-card title="Excluindo Produto">
      <v-divider></v-divider>
      <v-card-text>
        Deseja realmente excluir esse produto?
      </v-card-text>
      <v-card-actions>
        <v-btn text="Cancelar" @click="deleteDialog = !deleteDialog"></v-btn>
        <v-spacer></v-spacer>
        <v-btn text="Excluir" color="red" :loading="loadingItem" :disabled="loadingItem" variant="flat"
          @click="deleteProduto()"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useProdutoStore } from "@/stores/produtos";
import type { ProdutoDto } from "@/types/produtos";
import { rules } from "@/utils/rules";
import type { DataTableHeader } from "vuetify";
const produtoStore = useProdutoStore();
const isEditing = ref<boolean>(false);

const headers = ref<Readonly<DataTableHeader[]>>([
  { title: "Nome", key: "nome", sortable: false },
  { title: "Peso Mínimo", key: "pesoMinimo", sortable: false },
  { title: "Peso Ideal", key: "pesoIdeal", sortable: false },
  { title: "Peso Máximo", key: "pesoMaximo", sortable: false },
  { title: "Ações", key: "actions", sortable: false, align: "center", width: "10%" },
]);

const createOrEditDialog = ref<boolean>(false);
const formModel = ref<ProdutoDto>(createNewRecord());
const formCreateOrEditProduto = ref<HTMLFormElement | null>(null);
const isFormValid = ref<boolean>(false);
const loadingItem = ref<boolean>(false);
const idToDelete = ref<number | null>(null)
const deleteDialog = ref<boolean>(false);

function createNewRecord(): ProdutoDto {
  return {
    produto_id: 0,
    nome: "",
    pesoMinimo: 0,
    pesoIdeal: 0,
    pesoMaximo: 0
  };
}

function openCreateDialog() {
  isEditing.value = false;
  formModel.value = createNewRecord();
  createOrEditDialog.value = true;
}

async function openEditDialog(id: number) {
  isEditing.value = true;
  await produtoStore.fetchById(id);
  if (produtoStore.produto) {
    formModel.value = produtoStore.produto;
    createOrEditDialog.value = true;
  }
}

function openDeleteDialog(id: number) {
  idToDelete.value = id;
  deleteDialog.value = true;
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
      produtoStore.update(formModel.value);
    } catch (error) {
      alert(error);
    }
  } else {
    produtoStore.create(formModel.value);
  }

  createOrEditDialog.value = false;
}

async function deleteProduto() {
  if (!idToDelete.value) {
    alert("id to delete undefined");
    return;
  }
  deleteDialog.value = false;
  await produtoStore.delete(idToDelete.value)
}

function handleSearch() { }
</script>
