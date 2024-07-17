<script>
import axios from 'axios';

export default {
  name: 'NewRequestView',
  data() {
    return {
      request: {
        name: '',
        date: this.formatDate(new Date()),
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
        date: this.formatDate(new Date()),
        subject: '',
        description: ''
      };
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
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
      <router-link to="/">Cancel</router-link>
    </form>
  </div>
</template>