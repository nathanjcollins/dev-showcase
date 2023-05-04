<script setup lang="ts">
import { Site, SiteVote } from '@prisma/client'
// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'created', site: Site & { siteVotes: SiteVote[] }): void
  (e: 'update', site: Site & { siteVotes: SiteVote[] }): void
}>()

const props = defineProps({
  site: {
    type: Object as PropType<Site>,
    required: false,
    default: null
  }
})
const { $client } = useNuxtApp()

const siteName = ref(props.site?.name)
const siteUrl = ref(props.site?.url)
const repositoryUrl = ref(props.site?.repoUrl ?? '')
const loading = ref(false)
const modalOpen = ref(false)

const createSite = async () => {
  loading.value = true

  if (props.site?.id) {
    const site = await $client.siteRouter.updateSite.mutate({
      id: props.site.id,
      name: siteName.value,
      url: siteUrl.value,
      repositoryUrl: repositoryUrl.value
    })

    const eventData = { ...site, siteVotes: [] } as Site & {
      siteVotes: SiteVote[]
    }
    emit('update', eventData)
  } else {
    const site = await $client.siteRouter.createSite.mutate({
      name: siteName.value,
      url: siteUrl.value,
      repositoryUrl: repositoryUrl.value
    })

    const eventData = { ...site, siteVotes: [] } as Site & {
      siteVotes: SiteVote[]
    }
    emit('created', eventData)
  }

  loading.value = false
  modalOpen.value = false
}
</script>

<template>
  <div>
    <label
      for="my-modal"
      class="btn btn-primary"
      >{{ props.site ? 'Edit Site' : 'Create Site' }}</label
    >
    <input
      id="my-modal"
      v-model="modalOpen"
      type="checkbox"
      class="modal-toggle"
    />
    <div class="modal">
      <div class="modal-box">
        <label
          for="my-modal"
          class="btn btn-sm btn-circle absolute right-2 top-2"
          >✕</label
        >
        <h3 class="font-bold text-lg">New Site</h3>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Site Name*</span>
          </label>
          <input
            v-model="siteName"
            placeholder="e.g. Portfolio"
            type="text"
            required
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Site Url*</span>
          </label>
          <input
            v-model="siteUrl"
            placeholder="e.g. https://nathancollins.dev"
            type="text"
            required
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Repo Url</span>
          </label>
          <input
            v-model="repositoryUrl"
            placeholder="e.g. https://github.com/nathanjcollins/portfolio"
            type="text"
            class="input input-bordered w-full"
          />
        </div>
        <div class="modal-action">
          <label
            class="btn"
            :class="{ 'btn-disabled': !siteName || loading }"
            @click="createSite()"
            >Create</label
          >
        </div>
      </div>
    </div>
  </div>
</template>
