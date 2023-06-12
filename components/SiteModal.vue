<script setup lang="ts">
import { Site, SiteVote, Technology } from '@prisma/client'
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

const { data: technologies } = await $client.technologyRouter.getAll.useQuery()

const siteName = ref(props.site?.name)
const siteUrl = ref(props.site?.url)
const repositoryUrl = ref(props.site?.repoUrl ?? '')
const loading = ref(false)
const modalOpen = ref(false)
const selectedTechnologies: Ref<Technology[]> = ref([technologies.value[0]])
const selectedTechnology: Ref<Technology | undefined> = ref()

const availableTechnologies = computed(() => {
  return technologies.value.filter(
    x => !selectedTechnologies.value.includes(x)
  )
})

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

const addTechnology = () => {
  if (!selectedTechnology) {
    return
  }

  selectedTechnologies.value.push(selectedTechnology.value!)
  selectedTechnology.value = undefined
}

const removeTechnology = (technology: Technology) => {
  const index = selectedTechnologies.value.indexOf(technology)
  selectedTechnologies.value.splice(index, 1)
}
</script>

<template>
  <div>
    <label
      for="my-modal"
      class="btn btn-primary"
    >{{ props.site ? 'Edit Site' : 'Create Site' }}</label>
    <input
      id="my-modal"
      v-model="modalOpen"
      type="checkbox"
      class="modal-toggle"
    >
    <div class="modal">
      <div class="modal-box">
        <label
          for="my-modal"
          class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label>
        <h3 class="font-bold text-lg">
          New Site
        </h3>
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
          >
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
          >
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
          >
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Technologies</span>
          </label>
          <select
            v-model="selectedTechnology"
            class="select select-bordered w-full max-w-xs"
            @change="addTechnology()"
          >
            <option
              disabled
              selected
              :value="undefined"
            >
              What technologies does your site use?
            </option>
            <option
              v-for="tech in availableTechnologies"
              :key="tech.id"
              :value="tech"
            >
              {{ tech.name }}
            </option>
          </select>
          <div class="flex mt-5 gap-2">
            <div
              v-for="tech in selectedTechnologies"
              :key="tech.id"
              class="badge badge-outline gap-2 cursor-pointer"
              @click="removeTechnology(tech)"
            >
              {{ tech.name }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-4 h-4 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="modal-action">
          <label
            class="btn"
            :class="{ 'btn-disabled': !siteName || loading }"
            @click="createSite()"
          >Create</label>
        </div>
      </div>
    </div>
  </div>
</template>
