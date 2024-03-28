<template>
  <form @submit.prevent="addTask">
    <div class="flex space-x-4">
      <input
        v-model="name"
        type="text"
        id="task"
        name="task"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="study vue"
        required
      />
      <button
        type="submit"
        class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Add Task
      </button>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  props: {
    updateTasks: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      name: "",
    };
  },
  methods: {
    async addTask() {
      try {
        const response = await axios.post(
          "http://localhost:3000/task",
          {
            name: this.name,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to register for an account");
        }

        this.updateTasks(response.data.task);
        this.name = "";
        this.$toast.success("Successfully added task! ^_^", {
          position: "top-right",
        });
      } catch (err) {
        let message = err.message;
        if (err.response) {
          message = err.response.message;
        }
        this.$toast.error(message, { position: "top-right" });
      }
    },
  },
};
</script>
