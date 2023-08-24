<script>
export default {

  props: {
    tasks: Array,
    selectedTaskId: Object,
    data: Array,
    page: Object,
  },
  // Your JavaScript logic here
}
</script>



<template>
  <div class="grid grid-rows-[40px,1fr]  font-medium h-full text-white">
    <div class="bg-purple-500  items-center justify-center flex font-normal">
      Tasks
    </div>

    <div class="bg-gray-100 flex flex-col justify-between  p-2 gap-2">
      <div class="bg-gray-100 flex flex-col font-normal gap-2">
        <div v-for="task in tasks" class="flex justify-between"
          :class="{ 'text-black bg-purple-200 w-full h-10 p-4 text-sm rounded-md items-center flex justify-center cursor-pointer': selectedTaskId.value == task.id, 'text-black bg-white w-full h-10 flex items-center p-4 text-sm rounded-md cursor-pointer hover:bg-gray-200': selectedTaskId.value != task.id }"
          @click="selectedTaskId.value = task.id">

          <div>{{ task.title }}</div>
          <div></div>
          <div @click.stop="$emit('deleteTask', task.id)">
            <font-awesome-icon v-if="page.name == 'config'" icon="fa-solid fa-trash-can"
              class="text-gray-600 hover:text-red-500 cursor-pointer p-4 m-[-16px]" />
          </div>
        </div>
        <div v-if="page.name == 'config'"
          class="text-gray-500 bg-gray-200 w-full h-10 p-4 text-sm rounded-md items-center justify-center gap-2 flex hover:bg-gray-300 cursor-pointer"
          @click="$emit('addTask')">
          Add task<font-awesome-icon icon="fa-solid fa-plus" /></div>

      </div>
      <div class="flex flex-col gap-4 items">

        <div class="flex flex-col gap-2">
          <div v-if="page.name == 'config'"
            class="text-gray-500 bg-gray-200 w-full h-10 p-4 text-sm rounded-md items-center justify-between gap-2 flex hover:bg-gray-300 cursor-pointer">
            Import task file<font-awesome-icon icon="fa-solid fa-file-import" class="text-lg" /></div>
          <div v-if="page.name == 'config'"
            class="text-gray-500 bg-gray-200 w-full h-10 p-4 text-sm rounded-md items-center justify-between gap-2 flex hover:bg-gray-300 cursor-pointer"
            :class="{ 'opacity-50 pointer-events-none': tasks.length == 0 }">
            Save task file<font-awesome-icon icon="fa-solid fa-file-arrow-down" class="text-lg" /></div>
          <div v-if="page.name == 'config'" class="flex items-center justify-center p-2">
            <hr>
          </div>
          <div v-if="page.name == 'config'"
            class="text-gray-500 bg-gray-200 w-full h-10 p-4 text-sm rounded-md items-center justify-between gap-2 flex hover:bg-gray-300 cursor-pointer"
            :class="{ 'opacity-50 pointer-events-none': data.length == 0 || tasks.length == 0 }"
            @click="page.name = 'annotate'">
            Annotate<font-awesome-icon icon="fa-solid fa-pencil-square" class="text-xl" /></div>
          <div
            class="text-gray-500 bg-gray-200 w-full h-10 p-4 text-sm rounded-md items-center justify-between gap-2 flex hover:bg-gray-300 cursor-pointer"
            :class="{ 'opacity-50 pointer-events-none': data.length == 0 }" @click="$emit('saveFile')">
            Save file<font-awesome-icon icon="fa-solid fa-download" class="text-lg" /></div>

        </div>
        <div class="flex items-center justify-center">
          <hr>
        </div>
        <div
          class="text-gray-500 bg-gray-200 w-full h-10 p-4 text-sm rounded-md items-center gap-2 flex hover:bg-gray-300 cursor-pointer"
          @click="page.name = 'config'"><font-awesome-icon icon="fa-solid fa-arrow-left" class="text-lg" />
          Back</div>

      </div>


    </div>
  </div>
</template>

<style>
/* Your component styles here */
</style>