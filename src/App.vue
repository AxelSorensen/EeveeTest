<script>
import Modal from './components/Modal.vue'
import DataField from './components/DataField.vue';
import SideBar from './components/SideBar.vue';
import TaskField from './components/TaskField.vue';
import Annotate from './pages/Annotate.vue';
import DataControls from './components/DataControls.vue';

export default {

  data() {
    return {
      tasks: [],
      data: [],
      selectedTaskId: { value: 0 },
      showStrings: { value: false },
      currentSentenceId: { value: 0 },
      label: { text: "" },
      page: { name: 'config' },
      selectedLabelId: { value: 0 },
      selectedWordId: { value: 0 },
      taskTypes: [{ name: 'seq', isColumn: true }, { name: 'classification', isColumn: false }, { name: 'seq2seq', isColumn: false }, { name: 'seq_bio', isColumn: true }]
    };
  },
  methods: {
    updateIDs() {
      this.tasks.map((item, index) => {
        item.id = index;
      });
    },
    addColumn() {
      this.data.map(data => data.words.map(word => ([
        word.push("_")
      ])));
      this.$nextTick(() => (this.$refs.datafield.$refs.scrollToMe.scrollLeft = this.$refs.datafield.$refs.scrollToMe.scrollWidth));
    },
    addRow() {
      this.data.map(data => {
        data.strings.push({ name: '_', string: '_' });
      });

      this.newRowIndex = this.data[0].strings.length - 1
      this.$nextTick(() => (this.$refs.datafield.$refs.scrollToMe.scrollTop = this.$refs.datafield.$refs.scrollToMe.scrollHeight));

    },
    updateRowName(name) {
      console.log(name)
      this.data.map(data => {
        data.strings[this.newRowIndex].name = name
      });
      this.newRowIndex = null

    },
    deleteRow(index) {
      this.data.map(data => {
        data.strings.splice(index, 1);
      });
    },
    deleteColumn(index) {
      this.data.map(data => data.words.map(word => ([
        word.splice(index, 1)
      ])));
    },
    addTask() {
      this.tasks.push({ title: "Untitled task", type: this.taskTypes[0], output_index: null, labels: [] });
      this.updateIDs();
      this.selectedTaskId.value = this.tasks.length - 1;
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((obj) => obj.id !== id);
      this.updateIDs();
      this.selectedTaskId.value = this.tasks.length - 1;
    },
    addLabel(text) {
      this.tasks[this.selectedTaskId.value].labels.push(this.label.text);
      this.label.text = "";
    },
    deleteLabel(label) {
      this.tasks[this.selectedTaskId.value].labels = this.tasks[this.selectedTaskId.value].labels.filter(item => {
        return item !== label;
      });
    },
    saveFile() {
      let file = [];
      this.data.flatMap(data => {
        let strings = data.strings.map(string => {
          return `${string.name} = ${string.string}`
        })
        file.push([strings.join('\n'), data.words.map(row => {
          return row.join('\t');
        }).join('\n')].join('\n'))
      });
      let filename = `test.conll`;
      let element = document.createElement('a');
      element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(file.join('\n\n')));
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

    },

    async readFile(type) {
      let element = document.createElement("input");
      element.setAttribute("type", "file");
      element.style.display = "none";
      element.multiple = true;
      document.body.appendChild(element);
      element.click();
      element.addEventListener("change", async (e) => {
        let reader = new FileReader();
        reader.addEventListener("loadend", () => {
          if (type == 'txt') {
            let data = reader.result.split("\n")
            this.data = data.map((sentence, index) => {
              const words = sentence.match(/\w+|[^\w\s]|(?<=\w\s+)\s/g).map((word, index) => {
                return [index + 1, word]

              });
              const strings = [{ name: '# sent_id', string: index }, { name: '# text', string: sentence }]
              return { strings: strings, words: words };
            })


          } else {
            let data = reader.result.split(/(?=# sent_id)/);
            this.data = data.map(sentence => {
              const strings = sentence.match(/#[^\n]*/g).map(strings => {
                return { name: strings.split('=')[0], string: strings.split('=')[1] }
              });
              const rows = sentence.split("\n")
              const words = rows.slice(strings.length).map(row => {
                const cols = row.split("\t");
                return cols;
              });
              return { strings: strings, words: words.slice(0, -2) };
            });
          }


        });
        reader.readAsText(e.target.files[0]);
      });
    }
  },
  components: { Modal, SideBar, TaskField, DataField, Annotate, DataControls }
}
</script>

<template>
  <Modal ref="myModal" />
  <div class="w-full h-[100vh] bg-white grid grid-cols-[250px,1fr] grid-rows-1 overflow-hidden">
    <SideBar :tasks="tasks" :selectedTaskId="selectedTaskId" @addTask="addTask" @deleteTask="deleteTask"
      @saveFile="saveFile" :data="data" :page="page" />
    <div v-if="page.name == 'config'" class="grid grid-rows-[1fr,60px,minmax(0,1fr)]">
      <TaskField ref="taskfield" :tasks="tasks" :selectedTaskId="selectedTaskId" @addLabel="addLabel" :label="label"
        @deleteLabel="deleteLabel" :data="data" :taskTypes="taskTypes" @importLabels="importLabels" />
      <DataControls :data="data" :showStrings="showStrings" :currentSentenceId="currentSentenceId" @addRow="addRow"
        @addColumn="addColumn" />
      <DataField ref="datafield" :data="data" :showStrings="showStrings" @readFile="readFile" @addRow="addRow"
        @addColumn="addColumn" :refs="$refs" @deleteColumn="deleteColumn" @deleteRow="deleteRow"
        @updateRowName="updateRowName" :currentSentenceId="currentSentenceId" :tasks="tasks" />
    </div>
    <div v-else>
      <Annotate :selectedWordId="selectedWordId" :page="page" :data="data" :tasks="tasks" :selectedTaskId="selectedTaskId"
        @setLabel="setLabel" :selectedLabelId="selectedLabelId" @nextSentence="nextSentence" @prevSentence="prevSentence"
        :currentSentenceId="currentSentenceId" @nextTask="nextTask" @prevTask="prevTask" />
    </div>
  </div>
</template>

