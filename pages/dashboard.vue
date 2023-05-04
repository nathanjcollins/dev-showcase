<template>
  <div class="prose p-5 overflow-x-auto">
    <div class="flex gap-2 justify-between">
      <h1>My Sites</h1>
      <SiteModal @created="(e) => me.data.value?.sites.push(e)" />
    </div>
    <table class="table w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Url</th>
          <th>Votes</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="site in me.data.value?.sites"
          :key="site.id"
        >
          <td>{{ site.name }}</td>
          <td>{{ site.url }}</td>
          <td>{{ site.siteVotes.length }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { $client } = useNuxtApp()

const me = await $client.userRouter.me.useQuery()
</script>
