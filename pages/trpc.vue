<script setup lang="ts">
const { $client } = useNuxtApp()

const me = await $client.userRouter.me.useQuery()
</script>

<template>
  <div>
    {{ me.data.value?.email }}
  </div>
</template>
