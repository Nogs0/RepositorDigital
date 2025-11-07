<template>
    <v-card elevated hover>
        <v-row>
            <v-col cols="10" class="pa-8">
                <h2 class="text-subtitle-1">
                    {{ name }}
                </h2>
                <p class="text-h3">
                    {{ count }}
                </p>
            </v-col>
            <v-col cols="2" align-self="center">
                <v-icon :icon="icon" size="x-large" :color="iconColor"></v-icon>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup lang="ts">
interface CountCardProps {
    icon: string;
    name: string;
    count: number;
    iconColor: string;
}

defineProps<CountCardProps>();
</script>