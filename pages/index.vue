<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          Dev Showcase
        </h1>
        <p class="py-6">
          A place to show off your portfolios or side projects!
        </p>
        <button
          id="login"
          class="btn btn-primary"
          @click="
            signIn('github', { redirect: true, callbackUrl: '/dashboard' })
          "
        >
          Get Started
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})
const { signIn } = useAuth()
</script>
