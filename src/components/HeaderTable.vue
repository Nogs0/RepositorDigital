<template>
    <v-sheet color="primary">
        <v-toolbar color="transparent">
            <v-toolbar-title>
                <v-icon :icon="icon" size="x-small" start></v-icon>
                {{ tableName }}
            </v-toolbar-title>

        </v-toolbar>
        <v-divider></v-divider>
        <v-container>
            <v-row>
                <v-col cols="12"class="py-0 pt-2">
                    <v-text-field placeholder="Digite sua busca" variant="outlined"
                        :hint="`Pesquise por ${searchFields}`" density="compact" prepend-inner-icon="mdi-magnify"
                        v-model="search"></v-text-field>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
</template>

<script setup lang="ts">
interface HeaderTableProps {
    icon: string;
    tableName: string;
    searchFields: string;
}

interface Emits {
    (e: "search", newValue: string): void;
}

const search = ref<string>('');
const emit = defineEmits<Emits>();

let debounceTimer: number;
watch(search, (newValue: string) => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        emit(`search`, newValue);
    });
});

defineProps<HeaderTableProps>();
</script>