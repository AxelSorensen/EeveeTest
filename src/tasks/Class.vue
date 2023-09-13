

<template>
  <div class="grid grid-rows-[fit-content] rounded-md mx-auto w-[calc(100vw-250px-64px)]">
    <div class="bg-purple-500 flex justify-end p-2 rounded-t-md">
      <div v-if="this.tasks[this.selectedTaskId.value]?.labels.length <= 9"
        class="items-center justify-center flex gap-2">
        <div class="group cursor-pointer " @click="searchMode = false; searchBarOpen.value = false">
          <font-awesome-icon class="mr-2 text-lg"
            :class="!searchMode ? 'text-purple-200' : 'group-hover:text-purple-400 text-purple-800'"
            icon="fa-solid fa-rectangle-list" />
        </div>
        <div class="group cursor-pointer" @click="searchMode = true;">
          <font-awesome-icon class="mr-2 text-lg"
            :class="searchMode ? 'text-purple-200' : 'group-hover:text-purple-400 text-purple-800'"
            icon="fa-solid fa-search" />
        </div>
      </div>
    </div>

    <div :class="!searchMode ? 'rounded-b-md' : null" class="justify-center items-center flex bg-white flex-col">
      <div v-if="data.length > 0" class="flex justify-center items-end  rounded-b-md gap-1 flex-wrap gap-y-4 m-8">
        <span v-for="word in data[currentSentenceId.value]?.words" class="select-none text-center">
          {{ word[tasks[selectedTaskId.value].input_index] }}
        </span>
      </div>

      <div v-if="!searchMode" class="flex flex-wrap gap-4 w-full p-4">
        <div
          class="rounded-md p-2 px-6 ring-purple-500 ring-2 font-bold text-center text-purple-500 relative select-none flex-grow"
          :class="tasks[selectedTaskId.value].labels[index] == data[currentSentenceId.value]?.strings.find(string => string.name == tasks[selectedTaskId.value].output_index).string ? 'bg-purple-500 text-white' : ' hover:bg-purple-100 cursor-pointer'"
          @click="data[currentSentenceId.value].strings.find(string => string.name == tasks[selectedTaskId.value].output_index).string = tasks[selectedTaskId.value].labels[index]"
          v-for="label, index in tasks[selectedTaskId.value]?.labels.sort()">
          <p class="absolute text-xs top-0 left-1 p-1">{{ index + 1 }}</p>
          {{ label }}
        </div>

      </div>
    </div>
    <div v-if="searchMode" class="px-6 bg-white">
      <div
        :class="(tasks[selectedTaskId.value].labels.includes(data[currentSentenceId.value].strings.find(string => string.name
          ==
          tasks[selectedTaskId.value].output_index).string)) && !searchBarOpen.value ? 'bg-purple-500 text-white' : 'bg-white text-purple-500 ring-purple-500 ring-2'"
        class="rounded-md p-2 px-6 font-bold text-center relative select-none flex-grow">
        {{ tasks[selectedTaskId.value].labels.includes(data[currentSentenceId.value].strings.find(string => string.name
          ==
          tasks[selectedTaskId.value].output_index).string) ?

          data[currentSentenceId.value].strings.find(string => string.name ==
            tasks[selectedTaskId.value].output_index).string : '?' }}
      </div>
    </div>

  </div>

  <div v-if="searchMode">
    <div class=" bg-white z-[1] rounded-b-md p-4" ref="search">
      <div class="flex justify-between items-center">

        <p class="text-gray-400 text-xs mb-2" for="">Select a label</p>
        <div class="flex gap-2 items-center">
          <p @click="searchContains = false; $refs.search_input.focus()"
            :class="!searchContains ? 'bg-purple-400 text-white' : 'hover:bg-gray-100'"
            class="text-gray-400 cursor-pointer  text-xs mb-2 p-1 rounded-md" for="">..a
          </p>
          <p @click="searchContains = true; $refs.search_input.focus()"
            :class="searchContains ? 'bg-purple-400 text-white' : 'hover:bg-gray-100'"
            class="text-gray-400 cursor-pointer text-xs mb-2 p-1 rounded-md" for="">..a..
          </p>
        </div>

      </div>
      <input @focus="searchBarOpen.value = true" @input="listIndex.value = 0" ref="search_input" v-model="search"
        type="text" class="w-[87%] outline-none border-b-2 border-purple-500 h-10 mb-4">
      <div class="divide-y flex flex-col h-32 overflow-scroll w-full">
        <div @mouseover="listIndex.value = index" v-for="label, index in  filteredLabels "
          class="flex justify-between items-center text-sm p-2 w-[90%] cursor-pointer"
          @click="data[currentSentenceId.value].strings.find(string => string.name == tasks[selectedTaskId.value].output_index).string = filteredLabels[listIndex.value]; search = ''; this.searchBarOpen.value = false"
          :ref="index" :class="index == listIndex.value ? 'bg-gray-100 font-bold' : null">
          <div class="bg-purple-100 text-xs w-6 rounded-full flex justify-center items-center h-6">{{
            label[0].toLowerCase()
          }}
          </div>
          {{
            label }}
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      searchContains: true,
      searchMode: this.tasks[this.selectedTaskId.value]?.labels.length > 9,
      inputFocused: false,
    }
  },
  props: {
    data: Array,
    tasks: Array,
    selectedTaskId: Object,
    selectedLabelId: Object,
    currentSentenceId: Object,
    listIndex: Object,
    searchBarOpen: Object,

  },
  methods: {
    clickAway(event) {
      const elementToCheck = this.$refs?.search;

      if (!elementToCheck?.contains(event.target)) {
        this.search = ''
        this.searchBarOpen.value = false

      }


    },
    handleKeyDown(event) {
      if (event.keyCode == 13 && this.searchMode) {
        this.data[this.currentSentenceId.value].strings.find(string => string.name == this.tasks[this.selectedTaskId.value].output_index).string = this.filteredLabels[this.listIndex.value]
        this.search = ''
        this.$refs.search_input.blur()
        this.searchBarOpen.value = false
      }
      if (event.keyCode == 27) {
        this.search = ''
        this.searchBarOpen.value = false
        this.$refs.search_input.focus()
      }

      if (event.keyCode == 9) {
        event.preventDefault();

        this.$refs.search_input.focus()
      }

    }
  },
  computed: {
    filteredLabels() {
      if (!this.searchContains) {
        return this.tasks[this.selectedTaskId.value].labels.filter(label => label.toLowerCase().startsWith(this.search.toLowerCase()))
      }
      return this.tasks[this.selectedTaskId.value].labels.filter(label => label.toLowerCase().includes(this.search.toLowerCase()))

    }
  },
  created() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("click", this.clickAway);



  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("click", this.clickAway);

  },
}
</script>

<style>
/* Your component styles here */
</style>