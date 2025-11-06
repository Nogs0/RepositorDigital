<template>
    <v-card elevated hover>
        <v-card-title>
            <v-icon :icon="icon" size="large" start></v-icon>
            {{ name }}
        </v-card-title>
        <v-card-text class="text-center">
            {{ count }}
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
interface CountCardProps {
    icon: string;
    name: string;
    count: number;
}

defineProps<CountCardProps>();
</script>