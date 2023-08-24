

<template>
  <div class="grid grid-rows-[60px,1fr] rounded-md mx-auto w-[calc(100vw-250px-64px)]">
    <div class="bg-purple-500 flex justify-between p-2 rounded-t-md">
    </div>
    <div class="justify-center items-center flex bg-white rounded-b-md flex-col">
      <div v-if="data.length > 0" class="flex justify-center items-end  rounded-b-md gap-1 flex-wrap gap-y-4 m-8">
        <span v-for="word in data[currentSentenceId.value]?.words" class="select-none text-center">
          {{ word[tasks[selectedTaskId.value].input_index] }}
        </span>
      </div>
      <div class="flex gap-4 w-full p-4">

        <div class="w-full">
          <textarea
            :value="data[currentSentenceId.value].strings.find(string => string.name == tasks[selectedTaskId.value].output_index).string == '_' ? '' : data[currentSentenceId.value].strings.find(string => string.name == tasks[selectedTaskId.value].output_index).string"
            @keydown.stop="" @input="event => setString(event)" placeholder="..."
            class="bg-gray-100 rounded-md outline-none p-4 w-full overflow-scroll resize-none text-sm" />
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
  methods: {
    setString(event) {
      this.data[this.currentSentenceId.value].strings.find(string => string.name == this.tasks[this.selectedTaskId.value].output_index).string = event.target.value
    }
  }
}
</script>

<style>
/* Your component styles here */
</style>