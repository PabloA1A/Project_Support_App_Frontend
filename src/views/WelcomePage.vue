<script>
export default {
  name: 'WelcomePage',
};
</script>

<template>
  <div class="welcome">
    <h1>Welcome to the Support App</h1>
    <router-link to="/requests">Request List View</router-link>
    <router-link to="/new-request">New request</router-link>
  </div>
</template>

<style scoped>
.welcome {
  text-align: center;
}
</style>