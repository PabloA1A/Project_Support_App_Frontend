<script>
import axios from 'axios';

export default {
  name: 'RequestListView',
  data() {
    return {
      requests: []
    };
  },
  created() {
    axios.get('http://localhost:8080/healthcenters')
      .then(response => {
        this.requests = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>

<template>
  <div>
    <h1>List of Applications</h1>
    <ul>
      <li v-for="request in requests" :key="request.id_healthcenter">
        {{ request.name }} - {{ request.date }} - {{ request.subject }} - {{ request.description }}
        <router-link :to="'/edit-request/' + request.id">Edit</router-link>
      </li>
    </ul>
  </div>
</template>