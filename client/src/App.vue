<script setup>
import AddTask from './components/AddTask.vue';
</script>



<template>
  <div class="flex flex-col justify-center items-center p-4">
    <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Task List</span></h1>

    <AddTask />
  </div>
</template>

<style scoped>
</style>
