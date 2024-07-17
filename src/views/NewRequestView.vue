<script>
import axios from 'axios';

export default {
  name: 'NewRequestView',
  data() {
    return {
      request: {
        name: '',
        date: '',
        subject: '',
        description: ''
      }
    };
  },
  methods: {
    createRequest() {
      axios.post('/healthcenters', this.request)
        .then(response => {
          this.$router.push('/requests');
        })
        .catch(error => {
          console.error(error);
        });
    },
    resetForm() {
      this.request = {
        name: '',
        date: '',
        subject: '',
        description: ''
      };
    }
  }
};
</script>

<template>
  <div>
    <h1>New Request</h1>
    <form @submit.prevent="createRequest">
      <div>
        <label>Name</label>
        <input v-model="request.name" required />
      </div>
      <div>
        <label>Date</label>
        <input v-model="request.date" required />
      </div>
      <div>
        <label>Subject</label>
        <input v-model="request.subject" required />
      </div>
      <div>
        <label>Description</label>
        <textarea v-model="request.description" required></textarea>
      </div>
      <button type="submit">Create</button>
      <button type="button" @click="resetForm">Reset</button>
      <router-link to="/requests">Cancel</router-link>
    </form>
  </div>
</template>