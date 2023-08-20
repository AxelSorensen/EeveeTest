<script>
export default {
  data() {
    return {
      modal: { isOpen: false, primaryText: null, secondaryText: null, buttons: [] },
    }
  },
  methods: {
    createModal(primaryText, secondaryText, buttons) {
      this.modal.primaryText = primaryText;
      this.modal.secondaryText = secondaryText;
      this.modal.buttons = buttons;
      this.modal.isOpen = true;
    },
  },

}

</script>

<template>
  <div v-if="modal.isOpen" class="w-full flex justify-center items-center h-screen absolute bg-black bg-opacity-20 z-[1]">
    <div class="bg-white w-fit min-w-[40%] rounded-md z-[2]">
      <div class="gap-2 p-4 flex flex-col">
        <p class="font-bold text-gray-700">{{ modal.primaryText }}</p>
        <p class="text-sm text-gray-500">{{ modal.secondaryText }}</p>
      </div>
      <div class="bg-gray-100 rounded-md flex justify-between p-4">
        <button
          class="bg-white px-4 p-2 rounded-md ring-inset ring-1 text-sm ring-gray-300 font-semibold text-gray-700 hover:bg-gray-100"
          @click="modal.buttons[0]?.action">{{ modal.buttons[0]?.text }}</button>
        <button class="bg-red-600 px-4 p-2 rounded-md ring-gray-300 text-white font-semibold text-sm hover:bg-red-700"
          @click="modal.buttons[1]?.action">{{ modal.buttons[1]?.text }}</button>
      </div>
    </div>
  </div>
</template>

<style>
/* Your component styles here */
</style>