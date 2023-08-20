<script>
export default {

}
</script>

<template>
  <div class="flex flex-col h-screen items-center justify-center bg-gray-100 gap-2">
    <div class="bg-purple-500 p-4 px-8 rounded-md cursor-pointer  text-white font-medium hover:bg-purple-600 w-56 text-center" @click="this.$router.push('/new-project')">
      Create new project</div>
    <div class="bg-gray-200 p-4 px-8 rounded-md cursor-pointer font-medium text-gray-500 hover:bg-gray-300 hover:text-gray-700 w-56 text-center">
      Create from Config</div>
  </div>
</template>