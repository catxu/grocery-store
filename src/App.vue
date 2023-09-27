<script setup>

</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style>
#nprogress .bar {
  height: 3px;
}

body {
  @apply bg-gray-100;
}

::-webkit-scrollbar {
  width: 0px;
  background-color: transparent;
}

::-webkit-scrollbar-corner {
  display: block;
}

::-webkit-scrollbar:hover {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #4B5563;
  border: 2px solid transparent;
  background-clip: padding-box;
}

::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track {
  border-left-color: transparent;
  border-right-color: transparent;
  /* background-color: #4c5562; */
}
</style>
