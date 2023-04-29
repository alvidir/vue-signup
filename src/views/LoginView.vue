<script setup lang="ts">
import ViewHeader from "@/components/ViewHeader.vue";
</script>

<template>
  <div>
    <view-header title="Log in Alvidir"></view-header>
    <nav>
      <router-link to="/signup">Create an account</router-link>
      <span>&#124;</span>
      <router-link to="/reset">Forgot password?</router-link>
    </nav>
  </div>
</template>
