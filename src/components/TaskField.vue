<script>
export default {
  data() {
    return {
      emptyValue: null,
    }
  },
  props: {
    tasks: Array,
    selectedTaskId: Number,
    rows: Array,
    columns: Array,
    label: Object,
    data: Array,
    taskTypes: Array,
  },
  methods: {
    setDefaultValue() {
      this.data.map(data => data.words.map(word => ([
        word[this.tasks[this.selectedTaskId.value].output_index] = this.emptyValue
      ])));
    }
  },
  computed: {
    uniqueLabels() {
      const labels = []
      this.data.map(data => {
        data.words.map(word => {
          if (word[this.tasks[this.selectedTaskId.value].output_index] != '_' && word[this.tasks[this.selectedTaskId.value].output_index] != undefined) {
            const label = word[this.tasks[this.selectedTaskId.value].output_index].split('|')
            labels.push(...label)
          }

        })
      })
      if (this.tasks[this.selectedTaskId.value].output_index != '') {
        return [...new Set(labels)]
      } else {
        return 0
      }

    }
  },
  // Your JavaScript logic here
}
</script>

<template>
  <div class="grid-rows-[40px,1fr] px-10">
    <div class="divide-y pb-2" v-if="tasks.length > 0">
      <div class="text-center flex justify-center items-center"><input ref="title"
          v-model="tasks[selectedTaskId.value].title" @click="this.$refs.title.select();"
          class="text-center outline-none p-4" type="text">
        <div class="group right-10 cursor-pointer p-2 absolute" @click="this.$refs.title.select();"><font-awesome-icon
            class="text-gray-400 group-hover:text-gray-600" icon="fa-solid fa-pencil" /></div>
      </div>
      <div class="divide-y flex flex-col">
        <div class="flex flex-col py-4">
          <label class="text-center text-sm font-semibold text-gray-500 mb-2" for="">Task type</label>
          <div class="flex justify-center">
            <p @click="tasks[selectedTaskId.value].type = task_type" v-for="task_type in taskTypes"
              :class="tasks[selectedTaskId.value]?.type == task_type ? 'bg-purple-200 pointer-events-none ring-1 ring-purple-300' : 'bg-white hover:bg-gray-100 ring-gray-300'"
              class=" p-1 text-sm px-4 cursor-pointer ring-1">{{ task_type.name }}</p>
          </div>
        </div>
        <div class="flex gap-16 justify-center">

          <div class="flex flex-col py-4">
            <label class="text-center text-sm font-semibold text-gray-500 mb-2" for="">Output</label>
            <div class="flex gap-2 text-sm justify-evenly w-full">
              <div class="flex gap-2 items-center relative">
                <label>{{ this.tasks[selectedTaskId.value].type.isColumn ? 'Column index:' : 'Row index:' }}</label>
                <input v-model="tasks[selectedTaskId.value].output_index"
                  class="bg-gray-100 outline-none w-10 p-2 rounded-sm text-center" type="text" placeholder="0">

              </div>

            </div>
          </div>
          <div class="flex flex-col py-4">
            <label class="text-center text-sm font-semibold text-gray-500 mb-2" for="">Default value</label>
            <div class="flex gap-2 text-sm justify-evenly w-full">
              <div class="flex gap-2 items-center relative">
                <label>Value:</label>
                <input v-model="emptyValue" class="bg-gray-100 outline-none w-10 p-2 rounded-sm text-center" type="text"
                  placeholder="_">
                <div @click="setDefaultValue"
                  class="text-sm bg-gray-200 text-gray-500 p-2 rounded-sm hover:bg-gray-300 cursor-pointer whitespace-nowrap">
                  Set value</div>

              </div>

            </div>
          </div>
        </div>
        <div class="flex flex-col py-4">
          <label class="text-center text-sm font-semibold text-gray-500 mb-2" for="">Labels</label>
          <div class="flex items-center gap-4">
            <input v-model="label.text" class="bg-gray-100 outline-none w-full rounded-sm p-2 text-sm"
              @keydown.enter="$emit('addLabel')" placeholder="Press Enter to add label" type="text">
            <div class="flex gap-2">
              <div @click="tasks[selectedTaskId.value].labels.push(...uniqueLabels)"
                :class="{ 'opacity-50 pointer-events-none': uniqueLabels.length == 0 }"
                class="text-sm bg-gray-200 text-gray-500 p-2 rounded-sm hover:bg-gray-300 cursor-pointer whitespace-nowrap">
                Import {{ uniqueLabels.length || null }}</div>
              <div @click="this.tasks[selectedTaskId.value].labels = []"
                class="text-sm text-red-500 bg-red-100 p-2 rounded-sm hover:bg-red-200 cursor-pointer whitespace-nowrap">
                Delete all</div>
            </div>
          </div>

          <div class="flex gap-2 mt-4 flex-wrap overflow-scroll w-full max-h-28">
            <div v-if="tasks[selectedTaskId.value].labels.length > 0"
              class="group text-white bg-purple-500 text-sm p-1 px-2 rounded-md h-7 hover:bg-purple-600 cursor-pointer whitespace-nowrap"
              @click="$emit('deleteLabel', label)" v-for="label in tasks[selectedTaskId.value].labels.slice().reverse()">
              {{ label
              }}<font-awesome-icon class="text-purple-800 ml-2 group-hover:text-purple-300" icon="fa-solid fa-xmark" />
            </div>

          </div>

        </div>
      </div>

    </div>
    <div class="text-sm text-center flex justify-center items-center h-full text-gray-500" v-else>
      <div>
        <p>There are currently no tasks to display<br>Add new task in the left panel</p>
      </div>
    </div>
  </div>
</template>

<style>
/* Your component styles here */
</style>