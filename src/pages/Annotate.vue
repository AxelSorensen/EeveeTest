<script>
import Class from '../tasks/Class.vue';
import Seq from '../tasks/Seq.vue';
import SeqBio from '../tasks/SeqBio.vue';
import Seq2Seq from '../tasks/Seq2Seq.vue';
export default {
  data() {
  },
  props: {
    page: String,
    data: Array,
    tasks: Array,
    selectedTaskId: Object,
    selectedLabelId: Object,
    currentSentenceId: Object,
    selectedWordId: Object,
  },
  methods: {
    handleKeyDown(event) {
      // Do something
      if (event.keyCode == 39 && this.currentSentenceId.value < this.data.length) {
        this.$emit('nextSentence')
      }

      if (event.keyCode == 37 && this.currentSentenceId.value > 0) {
        this.$emit('prevSentence')
      }

      if (event.keyCode == 38 && this.selectedTaskId.value > 0) {
        this.selectedTaskId.value--
      }

      if (event.keyCode == 40 && this.selectedTaskId.value < this.tasks.length - 1) {
        this.selectedTaskId.value++
      }

      if (0 < parseInt(event.key) && parseInt(event.key) < this.tasks[this.selectedTaskId.value]?.labels.length + 1) {
        this.selectedLabelId.value = event.key - 1;
        if (!this.tasks[this.selectedTaskId.value].type.isColumn) {
          this.data[this.currentSentenceId.value].strings[this.tasks[this.selectedTaskId.value].output_index].string = this.tasks[this.selectedTaskId.value].labels[event.key - 1]
        }
      }


    },
  },
  created: function () {
    window.addEventListener("keydown", this.handleKeyDown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  components: { Seq, Class, SeqBio, Seq2Seq }
}
</script>

<template>
  <div class="grid grid-rows-[1fr,100px] pt-2 items-center bg-gray-200 h-screen justify-between">
    <div class="flex flex-col gap-6 w-[calc(100vw-250px)] overflow-hidden">
      <Seq v-if="tasks[selectedTaskId.value]?.type.name == 'seq'" :data="data" :tasks="tasks"
        :selectedLabelId="selectedLabelId" :selectedTaskId="selectedTaskId" :selectedWordId="selectedWordId"
        :currentSentenceId="currentSentenceId" />
      <SeqBio v-if="tasks[selectedTaskId.value]?.type.name == 'seq_bio'" :data="data" :tasks="tasks"
        :selectedLabelId="selectedLabelId" :selectedTaskId="selectedTaskId" :selectedWordId="selectedWordId"
        :currentSentenceId="currentSentenceId" />
      <Class v-if="tasks[selectedTaskId.value]?.type.name == 'classification'" :data="data" :tasks="tasks"
        :selectedLabelId="selectedLabelId" :selectedTaskId="selectedTaskId" :currentSentenceId="currentSentenceId" />
      <Seq2Seq v-if="tasks[selectedTaskId.value]?.type.name == 'seq2seq'" :data="data" :tasks="tasks"
        :selectedLabelId="selectedLabelId" :selectedTaskId="selectedTaskId" :currentSentenceId="currentSentenceId" />
    </div>
    <div class="flex items-center font-medium text-gray-500 select-none justify-between w-[300px] mx-auto h-full">
      <div class="bg-gray-200 p-4 px-8 rounded-md cursor-pointer hover:bg-gray-300 hover:text-gray-700"
        @click="$emit('prevSentence')">Prev</div>
      <p class="flex">{{ currentSentenceId.value + 1 }} / {{ data.length }}</p>
      <div class="bg-gray-200 p-4 px-8 rounded-md cursor-pointer hover:bg-gray-300 hover:text-gray-700"
        @click="$emit('nextSentence')">Next</div>
    </div>
  </div>
</template>