

<template>
  <div class="grid grid-rows-[fit-content] rounded-md mx-auto w-[calc(100vw-250px-64px)]">
    <div class="bg-purple-500 flex justify-between p-2 rounded-t-md">
      <div class="flex gap-2 flex-wrap">
        <div class="rounded-md p-2 px-6 border border-white border-1 font-bold text-center relative"
          :class="index == selectedLabelId.value ? 'bg-white text-purple-500' : 'text-white hover:bg-purple-400 cursor-pointer'"
          v-for="label, index in tasks[selectedTaskId.value]?.labels.slice(0, 9)"
          @click="this.selectedLabelId.value = index">
          <p class="absolute text-xs top-0 left-1 p-1">{{ index + 1 }}</p>
          {{ label }}
        </div>


      </div>


    </div>
    <div @mouseup="mouseUp" class="justify-center items-center flex bg-white rounded-b-md ">
      <div v-if="data.length > 0" class="flex justify-center items-center  rounded-b-md gap-2 flex-wrap gap-y-4 m-8">
        <span @mousedown="spanClicked = true" v-for="word, index in data[currentSentenceId.value]?.words"
          class="relative flex">
          <span v-if="word[tasks[selectedTaskId.value].output_index][0] == 'B'">
            <div @mouseup.stop="" @click.stop="deleteBioLabel(index)"
              class="relative group cursor-pointer w-2 bg-yellow-400 h-full ml-2">
              <font-awesome-icon icon="fa-solid fa-xmark"
                class="text-gray-400 group-hover:bg-gray-300 flex w-2 h-2 p-1 left-[-8px] absolute top-[-8px] bg-gray-200 rounded-full" />
            </div>
          </span>
          <span :id="index"
            :class="tasks[selectedTaskId.value]?.labels.includes((word[tasks[selectedTaskId.value].output_index]).slice(2)) ? 'bg-yellow-400 p-1 mx-[-4px] text-black hover' : null, index == selectedWordId.value && !tasks[selectedTaskId.value]?.labels.includes(word[tasks[selectedTaskId.value].output_index]) && keyboardMode ? 'bg-gray-300' : '', index == selectedWordId.value && tasks[selectedTaskId.value]?.labels.includes(word[tasks[selectedTaskId.value].output_index]) && keyboardMode ? 'bg-purple-400' : ''">{{
              word[1] }}</span>
          <span
            v-if="word[tasks[selectedTaskId.value].output_index][0] == 'I' && data[currentSentenceId.value]?.words[index + 1]?.[tasks[selectedTaskId.value].output_index][0] != 'I' || word[tasks[selectedTaskId.value].output_index][0] == 'B' && data[currentSentenceId.value]?.words[index + 1]?.[tasks[selectedTaskId.value].output_index][0] != 'I'"
            class="text-xs text-white font-semibold bg-yellow-400">
            <p class="p-2">{{
              word[tasks[selectedTaskId.value].output_index].slice(2) }}
            </p>
          </span>

        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spanClicked: false,
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
    setBioLabel(start, end, currentSentenceId, label) {
      for (let i = start; i <= end; i++) {
        if (i == start) {
          this.data[currentSentenceId.value].words[i][this.tasks[this.selectedTaskId.value].output_index] = 'B-' + this.tasks[this.selectedTaskId.value].labels[this.selectedLabelId.value]
        } else {
          this.data[currentSentenceId.value].words[i][this.tasks[this.selectedTaskId.value].output_index] = 'I-' + this.tasks[this.selectedTaskId.value].labels[this.selectedLabelId.value]
        }
      }


    },
    deleteBioLabel(index) {
      this.spanClicked = false
      while (this.data[this.currentSentenceId.value].words[index][this.tasks[this.selectedTaskId.value].output_index][0] != '_' && this.data[this.currentSentenceId.value].words[index + 1]?.[this.tasks[this.selectedTaskId.value].output_index][0] != 'B') {
        this.data[this.currentSentenceId.value].words[index][this.tasks[this.selectedTaskId.value].output_index] = '_'
        index++;
      }
      if (index == this.data[this.currentSentenceId.value].words.length - 1) {
        this.data[this.currentSentenceId.value].words[index][this.tasks[this.selectedTaskId.value].output_index] = '_'
      }
      this.data[this.currentSentenceId.value].words[index][this.tasks[this.selectedTaskId.value].output_index] = '_'

    },
    mouseUp() {
      if (!this.spanClicked) {
        return
      }
      var start = undefined;
      var end = undefined;
      try {
        start = window.getSelection().anchorNode.parentElement.attributes.id.value
        end = window.getSelection().extentNode.parentElement.attributes.id.value
      } catch (error) {
        if (start && end == undefined) {
          end = window.getSelection().extentNode.id - 1
        }
      }
      this.setBioLabel(Math.min(start, end), Math.max(start, end), this.currentSentenceId, 0)
      window.getSelection().removeAllRanges()
      this.spanClicked = false


    },
    handleKeyDown(event) {
      if (event.repeat) return;
      // Do something
      if (event.keyCode == 32) {
        this.setLabel(this.selectedWordId.value, this.currentSentenceId, this.tasks[this.selectedTaskId.value].labels[this.selectedLabelId.value])
      }


    },
    created: function () {
      window.addEventListener("keydown", this.handleKeyDown);
    },
  }
}

</script>

<style scoped>
::-moz-selection {
  /* Code for Firefox */
  background: #FACC14;
}

::selection {
  background: #FACC14;
}
</style>