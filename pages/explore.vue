<template>
  <div class="hero">
    <div class="hero-content text-center">
      <div
        v-if="site && voteTypes"
        class="max-w-md flex flex-col gap-5"
      >
        <h1 class="text-5xl font-bold">
          {{ site.name }}
        </h1>
        <p class="py-6">
          {{ site.user.email }}
        </p>
        <a
          :href="site.url"
          target="_blank"
        >
          <img
            :src="`data:image/jpeg;base64, ${site.preview}`"
            alt="A preview of the website"
          />
        </a>
        <div class="flex flex-col gap-5">
          <div class="flex gap-2 justify-between">
            <button
              v-for="voteType in voteTypes"
              :key="voteType.id"
              class="btn"
              :class="{
                'btn-primary': !voteType.voted,
                'btn-success': voteType.voted
              }"
              @click="vote(voteType.id)"
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
      <div
        v-else
        class="max-w-md flex flex-col gap-5"
      >
        <h1 class="text-5xl font-bold">
          Oh no! There are no more sites to showcase, come back soon!
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { $client } = useNuxtApp()

const { data: site, refresh: newSite } =
  await $client.siteRouter.getNextSite.useQuery()

const { data: voteTypes } = await $client.voteRouter.getAll.useQuery()

const loadNext = async () => {
  await newSite()

  for (let index = 0; index < voteTypes.value!.length; index++) {
    const element = voteTypes.value![index]

    element.voted = false
  }
}

const vote = async (id: number) => {
  if (!site.value) {
    return
  }

  // eslint-disable-next-line arrow-parens
  const voteType = voteTypes.value!.find((x) => x.id === id)!
  voteType.voted = !voteType.voted

  await $client.voteRouter.vote.mutate({
    siteId: site.value.id,
    voteTypeId: id
  })
}
</script>
