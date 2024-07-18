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
  <div class="new-request">
    <div class="background-image"></div>
    <div class="content">
      <h1>Create a New Request</h1>
      <form @submit.prevent="createRequest" class="request-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="request.name" required />
        </div>
        <div class="form-group">
          <label for="date">Date</label>
          <input type="date" id="date" v-model="request.date" required />
        </div>
        <div class="form-group">
          <label for="subject">Subject</label>
          <input type="text" id="subject" v-model="request.subject" required />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="request.description" required></textarea>
        </div>
        <div class="buttons-container">
          <button type="submit" class="action-button">Create</button>
          <button type="button" @click="resetForm" class="action-button">Reset</button>
          <router-link to="/requests" class="action-button">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.new-request {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/src/assets/img/background.jpg'); 
  background-size: cover;
  background-position: center;
  filter: brightness(0.5);
}

.content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 20px;
  color: #fff;
}

.request-form {
  max-width: 600px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.9); 
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: calc(100% - 20px); 
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  resize: none;
  height: 100px;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.action-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;
}

.action-button:hover {
  background-color: #0056b3;
}
</style>