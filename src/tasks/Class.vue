

<template>
  <div class="grid grid-rows-[60px,1fr] rounded-md mx-auto w-[calc(100vw-250px-64px)]">
    <div class="bg-purple-500 flex justify-between p-2 rounded-t-md">
    </div>
    <div class="justify-center items-center flex bg-white rounded-b-md flex-col">
      <div v-if="data.length > 0" class="flex justify-center items-end  rounded-b-md gap-1 flex-wrap gap-y-4 m-8">
        <span v-for="word in data[currentSentenceId.value]?.words" class="select-none text-center">
          {{ word[1] }}
        </span>
      </div>
      <div class="flex flex-wrap gap-4 w-full p-4">
        <div class="rounded-md p-2 px-6 ring-purple-500 ring-2 font-bold text-center text-purple-500 relative select-none flex-grow"
          :class="tasks[selectedTaskId.value].labels[index] == data[currentSentenceId.value]?.strings[tasks[selectedTaskId.value].output_index].string ? 'bg-purple-500 text-white' : ' hover:bg-purple-100 cursor-pointer'" @click="data[currentSentenceId.value].strings[tasks[selectedTaskId.value].output_index].string = tasks[selectedTaskId.value].labels[index]"
          v-for="label, index in tasks[selectedTaskId.value]?.labels.sort()">
          <p class="absolute text-xs top-0 left-1 p-1">{{ index + 1 }}</p>
          {{ label }}
        </div>

      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    tasks: Array,
    selectedTaskId: Object,
    selectedLabelId: Object,
    currentSentenceId: Object
  },
}
</script>

<style>
/* Your component styles here */
</style>