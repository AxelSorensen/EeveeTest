<script>
import Class from '../tasks/Class.vue';
import Seq from '../tasks/Seq.vue';
import SeqBio from '../tasks/SeqBio.vue';
import Seq2Seq from '../tasks/Seq2Seq.vue';
export default {
  data() {
    return {
      time: null
    }
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
    setStatus(value) {
      this.data[this.currentSentenceId.value].strings.find(string => string.name == '# status').string = value
      window.removeEventListener('keydown', this.handleKeyDown);
      setTimeout(() => {
        this.currentSentenceId.value++
        window.addEventListener('keydown', this.handleKeyDown);
      }, 200);
    },
    handleKeyDown(event) {

      if (event.keyCode == 32 && this.currentSentenceId.value < this.data.length) {
        this.setStatus('accepted')
      }

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
        if (!this.tasks[this.selectedTaskId.value].type.isWordLevel) {
          this.data[this.currentSentenceId.value].strings.find(string => string.name == this.tasks[this.selectedTaskId.value].output_index).string = this.tasks[this.selectedTaskId.value].labels[event.key - 1]
        }
      }


    },
  },
  created() {
    const startTime = new Date()
    startTime
    window.addEventListener("keydown", this.handleKeyDown);
    var currentTime = new Date()
    this.time = new Date(currentTime - startTime - 3600000).toTimeString().split(' ')[0];
    setInterval(() => {
      currentTime = new Date()
      this.time = new Date(currentTime - startTime - 3600000).toTimeString().split(' ')[0];
    }, 1000);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  components: { Seq, Class, SeqBio, Seq2Seq }
}
</script>

<template>
  <div class="grid grid-rows-[fit-content(20px),1fr,200px] items-center bg-gray-200 h-screen justify-between">
    <div class="flex gap-8 p-4 px-8 items-center">
      <div class="flex gap-2 flex-1">
        <p class="text-xs text-gray-400">Progress:</p>
        <div class="bg-gray-300 overflow-hidden rounded-full flex-1 h-4 flex">

          <div
            :class="index == currentSentenceId.value ? 'bg-white' : this.data[index].strings.find(string => string.name == '# status').string == 'accepted' ? 'bg-green-400' : this.data[index].strings.find(string => string.name == '# status').string == 'rejected' ? 'bg-red-400' : this.data[index].strings.find(string => string.name == '# status').string == 'unsure' ? 'bg-yellow-400' : null"
            v-for="(item, index) in  data" class="flex-grow bg-gray-300">
          </div>


        </div>
      </div>

      <div class="flex justify-between bg-white w-28 items-center p-2 border-2 border-purple-500 rounded-md">
        <p class="text-purple-500">{{ time }}</p>
        <font-awesome-icon icon="fa-solid fa-clock" class="text-purple-500" />

      </div>
    </div>
    <div class="flex flex-col gap-6 w-[calc(100vw-250px)] overflow-hidden">
      <div class="border-4 m-auto rounded-xl"
        :class="this.data[this.currentSentenceId.value].strings.find(string => string.name == '# status').string == 'accepted' ? 'border-green-400 border-4 rounded-sm' : this.data[this.currentSentenceId.value].strings.find(string => string.name == '# status').string == 'rejected' ? 'border-red-400 border-4 rounded-sm' : this.data[this.currentSentenceId.value].strings.find(string => string.name == '# status').string == 'unsure' ? 'border-yellow-400 border-4 rounded-sm' : null">
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
    </div>
    <div class="flex flex-col justify-center gap-4 bg-white p-4 rounded-md m-auto">
      <div class="flex justify-center gap-4 bg-gray-100 p-2 rounded-md select-none">
        <div
          :class="{ 'text-gray-500 hover:text-gray-700': currentSentenceId.value > 0, 'text-gray-300 pointer-events-none': currentSentenceId.value == 0 }"
          class="cursor-pointer group p-2 m-[-8px]" @click="$emit('prevSentence')">
          <font-awesome-icon icon="fa-solid fa-chevron-left" class="" />
        </div>
        <p class="flex">{{ currentSentenceId.value + 1 }} / {{ data.length }}</p>
        <div class="cursor-pointer group p-2 m-[-8px]"
          :class="{ 'text-gray-500 hover:text-gray-700': currentSentenceId.value < data.length, 'text-gray-300 pointer-events-none': currentSentenceId.value == data.length }"
          @click="$emit('nextSentence')">
          <font-awesome-icon icon="fa-solid fa-chevron-right" />
        </div>
      </div>
      <div class="flex gap-4 justify-between">
        <div @click="setStatus('accepted')">
          <font-awesome-icon title="Correct" icon="fa-solid fa-check"
            class="bg-green-400 p-4 rounded-md hover:bg-green-300 cursor-pointer text-green-900"
            :class="{ 'ring ring-offset-2 ring-green-400 hover:bg-green-400': this.data[this.currentSentenceId.value].strings.find(string => string.name == '# status').string == 'accepted' }" />
        </div>
        <div @click="setStatus('rejected')">
          <font-awesome-icon title="Wrong" icon="fa-solid fa-xmark"
            class="bg-red-400 p-4 rounded-md hover:bg-red-300 cursor-pointer text-red-900"
            :class="{ 'ring ring-offset-2 ring-red-400 hover:bg-red-400': this.data[this.currentSentenceId.value].strings.find(string => string.name == '# status').string == 'rejected' }" />
        </div>
        <div @click="setStatus('unsure')">
          <font-awesome-icon title="Unsure" icon="fa-solid fa-question"
            class="bg-yellow-400 p-4 rounded-md hover:bg-yellow-300 cursor-pointer text-yellow-900"
            :class="{ 'ring ring-offset-2 ring-yellow-400 hover:bg-yellow-400': this.data[this.currentSentenceId.value].strings.find(string => string.name == '# status').string == 'unsure' }" />
        </div>

      </div>

    </div>

  </div>
</template>