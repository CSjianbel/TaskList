<script setup>
import Header from "../components/Header.vue";
import AddTask from "../components/AddTask.vue";
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="m-5 flex flex-row-reverse">
      <button
        @click="logoutUser()"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Logout
      </button>
    </div>
    <div class="flex flex-col items-center mx-auto md:h-screen lg:py-0">
      <Header />
      <AddTask :updateTasks="updateTasks" />

      <div class="m-6 overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead
            class="text-xs text-gray-800 uppercase bg-gradient-to-r to-sky-500 from-blue-600"
          >
            <tr>
              <th scope="col" class="px-6 py-3 w-1/4 text-white">Task</th>
              <th scope="col" class="px-6 py-3 w-1/4 text-white">Status</th>
              <th scope="col" class="px-6 py-3 w-1/4 text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in tasks" :key="task.id">
              <td class="px-10 py-3 w-1/2 text-base text-black">
                <input
                  min="1"
                  v-model="task.name"
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </td>
              <td class="px-6 py-3 w-1/4">
                <button @click="() => (task.status = !task.status)">
                  <span
                    v-if="task.status"
                    class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                    >Finished</span
                  >
                  <span
                    v-else
                    class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                    >Pending</span
                  >
                </button>
              </td>
              <td class="px-6 py-3 w-1/4">
                <div class="flex gap-4 justify-around">
                  <button>
                    <font-awesome-icon
                      @click="saveChanges(task, index)"
                      icon="fa-solid fa-floppy-disk"
                      class="hover:text-blue-600"
                    />
                  </button>
                  <button>
                    <font-awesome-icon
                      @click="deleteTask(task, index)"
                      icon="fa-solid fa-trash"
                      class="hover:text-red-500"
                    />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

library.add(faFloppyDisk);
library.add(faTrash);

export default {
  name: "TasksPage",
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get("http://localhost:3000/task", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        this.tasks = response.data.tasks;
      } catch (err) {
        let message = err.message;
        if (err.response) {
          message = err.response.message;
        }
        this.$toast.error(message, { position: "top-right" });
      }
    },
    async saveChanges(task, index) {
      try {
        const response = await axios.put(
          "http://localhost:3000/task",
          {
            id: task.id,
            name: task.name,
            status: task.status,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        this.tasks[index] = response.data.updatedTask;

        this.$toast.success("Successfully updated task. ^_^", {
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
    async deleteTask(task, index) {
      try {
        await axios.delete(`http://localhost:3000/task/${task.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        this.tasks.splice(index, 1);
        this.$toast.success("Successfully deleted task. ^_^", {
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
    logoutUser() {
      localStorage.clear();

      this.$router.push("/login");
    },
    updateTasks(task) {
      this.tasks.push(task);
    },
  },
  async mounted() {
    await this.fetchTasks();
  },
};
</script>
