<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Explore</h1>
        <p class="py-6">
          {{ site.data.value?.name ?? '' }}
        </p>
        <div v-html="data" />
        <div class="flex flex-col gap-5">
          <div class="flex gap-2">
            <button
              v-for="voteType in voteTypes.data.value"
              :key="voteType.id"
              class="btn btn-primary"
            >
              {{ voteType.name }}
            </button>
          </div>
          <button
            class="btn btn-ghost"
            @click="loadNext"
          >
            Next ▶️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { $client } = useNuxtApp()

let site = await $client.siteRouter.getNextSite.useQuery()
const { data } = await useFetch(site.data.value!.url!, {
  headers: { mode: 'no-cors' }
})
console.log(data)
const voteTypes = await $client.voteRouter.get.useQuery()

const loadNext = async () => {
  site = await $client.siteRouter.getNextSite.useQuery()
}
</script>
