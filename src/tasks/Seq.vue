

<template>
  <div class="grid grid-rows-[fit-content1new,1fr] rounded-md mx-auto w-[calc(100vw-250px-64px)]">
    <div class="bg-purple-500 flex justify-between p-2 rounded-t-md">
      <div class="flex gap-2 flex-wrap">
        <div class="rounded-md p-2 px-6 border border-white border-1 font-bold text-center relative select-none"
          :class="index == selectedLabelId.value ? 'bg-white text-purple-500' : 'text-white hover:bg-purple-400 cursor-pointer'"
          v-for="label, index in tasks[selectedTaskId.value]?.labels.sort()" @click="this.selectedLabelId.value = index">
          <p class="absolute text-xs top-0 left-1 p-1">{{ index + 1 }}</p>
          {{ label }}
        </div>


      </div>
      <div class="items-center justify-center flex gap-2">
        <div class="group cursor-pointer " @click="keyboardMode = true">
          <font-awesome-icon class="mr-2 text-lg"
            :class="keyboardMode ? 'text-purple-200' : 'group-hover:text-purple-400 text-purple-800'"
            icon="fa-solid fa-keyboard" />
        </div>
        <div class="group cursor-pointer" @click="keyboardMode = false">
          <font-awesome-icon class="mr-2 text-lg"
            :class="!keyboardMode ? 'text-purple-200' : 'group-hover:text-purple-400 text-purple-800'"
            icon="fa-solid fa-mouse" />
        </div>
      </div>


    </div>
    <div class="justify-center items-center flex bg-white rounded-b-md">
      <div v-if="data.length > 0" class="flex justify-center items-end  rounded-b-md gap-1 flex-wrap gap-y-4 m-8">
        <span v-for="word, index in data[currentSentenceId.value]?.words"
          class="cursor-pointer rounded-md select-none relative p-2 text-center min-w-[6ch]"
          :class="tasks[selectedTaskId.value]?.labels.includes(word[tasks[selectedTaskId.value].output_index]) ? 'bg-yellow-400 text-white hover' : 'hover:bg-gray-300', index == selectedWordId.value && !tasks[selectedTaskId.value]?.labels.includes(word[tasks[selectedTaskId.value].output_index]) && keyboardMode ? 'bg-gray-300' : '', index == selectedWordId.value && tasks[selectedTaskId.value]?.labels.includes(word[tasks[selectedTaskId.value].output_index]) && keyboardMode ? 'bg-purple-400' : ''"
          @click="setLabel(index, currentSentenceId, tasks[selectedTaskId.value]?.labels[selectedLabelId.value])">
          <p v-if="tasks[selectedTaskId.value]?.labels.includes(word[tasks[selectedTaskId.value].output_index])"
            class="text-center font-bold text-xs">{{ word[tasks[selectedTaskId.value]?.output_index] }}</p>
          <p v-else class="text-center text-white font-bold text-xs">{{
            tasks[selectedTaskId.value]?.labels[selectedLabelId.value]
          }}</p>
          {{ word[tasks[selectedTaskId.value].input_index] }}
        </span>
      </div>
    </div>
  </div>
  <div class="flex justify-center items-end  gap-1 flex-wrap px-8 ">
    <span v-for="word in data[currentSentenceId.value]?.words" class="select-none text-center">
      {{ word[tasks[selectedTaskId.value].input_index] }}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyboardMode: false,
    }
  },
  props: {
    data: Array,
    tasks: Array,
    selectedTaskId: Object,
    selectedLabelId: Object,
    currentSentenceId: Object,
    selectedWordId: Object,
  },
  methods: {
    setLabel(word_index, currentSentenceId, label) {
      if (this.tasks[this.selectedTaskId.value].labels.includes(this.data[currentSentenceId.value].words[word_index][this.tasks[this.selectedTaskId.value].output_index])) {
        this.data[currentSentenceId.value].words[word_index][this.tasks[this.selectedTaskId.value].output_index] = '_'
      } else {
        this.data[currentSentenceId.value].words[word_index][this.tasks[this.selectedTaskId.value].output_index] = label
      }

    },
    handleKeyDown(event) {
      if (event.repeat) return;
      // Do something
      if (event.keyCode == 32) {
        this.setLabel(this.selectedWordId.value, this.currentSentenceId, this.tasks[this.selectedTaskId.value].labels[this.selectedLabelId.value])
      }

      if (event.keyCode == 68 && this.selectedWordId.value < this.data[this.currentSentenceId.value].words.length - 1 && this.keyboardMode) {
        this.selectedWordId.value++
      }

      if (event.keyCode == 65 && this.selectedWordId.value > 0 && this.keyboardMode) {
        this.selectedWordId.value--
      }
    },
  },
  created: function () {
    window.addEventListener("keydown", this.handleKeyDown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
  },
}

</script>

<style>
/* Your component styles here */
</style>