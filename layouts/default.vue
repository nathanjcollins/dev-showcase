<template>
  <div class="flex flex-col">
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <a class="btn btn-ghost normal-case text-xl">DevShowcase</a>
        <span>{{ data?.user?.email }}</span>
      </div>
      <div class="navbar-center flex">
        <ul class="menu menu-horizontal px-1 flex gap-2">
          <NuxtLink
            v-slot="{ href, isActive }"
            to="dashboard"
            custom
          >
            <li>
              <a
                :href="href"
                :class="{ 'border-purple-400': isActive, border: isActive }"
                >Dashboard</a
              >
            </li>
          </NuxtLink>
          <NuxtLink
            v-slot="{ href, isActive }"
            to="explore"
            custom
          >
            <li>
              <a
                :href="href"
                :class="{ 'border-purple-400': isActive, border: isActive }"
                >Explore</a
              >
            </li>
          </NuxtLink>
        </ul>
      </div>
      <div class="navbar-end">
        <a
          class="btn"
          @click="signOut({ redirect: true, callbackUrl: '/' })"
          >Sign Out</a
        >
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const { data, signOut } = useAuth()
</script>
