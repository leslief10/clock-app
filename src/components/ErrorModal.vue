<script setup lang="ts">
defineProps<{
    message: string;
    isVisible: boolean;
}>();

const emit = defineEmits<{
    (e: 'retry'): void;
}>();
</script>

<template>
    <div v-if="isVisible" class="modal-overlay">
        <div class="modal-content">
            <p>{{ message }}</p>
            <button class="retry-button" @click="emit('retry')">Retry</button>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 0.5rem;
    text-align: center;
    max-width: 90%;
    width: 25rem;
}

.retry-button {
    margin-top: 1rem;
    padding: 0.5rem 1.5rem;
    background: var(--dark-gray);
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
}

.retry-button:hover {
    background: darkgray;
}
</style>
