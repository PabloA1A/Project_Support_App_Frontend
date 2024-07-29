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
    axios.get('http://localhost:8080/patients')
      .then(response => {
        this.requests = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    goToWelcomePage() {
      this.$router.push('/');
    }
  }
};
</script>

<template>
  <div class="request-list">
    <img src="/src/assets/img/background.jpg" class="background-image"></img>
    <div class="content">
      <h1>List of Applications</h1>
      <ul>
        <li v-for="request in requests" :key="request.id_healthcenter" class="request-item">
          <div class="request-info">
            <h2>{{ request.name }}</h2>
            <p><strong>Date:</strong> {{ request.date }}</p>
            <p><strong>Subject:</strong> {{ request.subject }}</p>
            <p><strong>Description:</strong> {{ request.description }}</p>
          </div>
          <router-link :to="'/edit-request/' + request.id" class="action-button">Edit</router-link>
        </li>
      </ul>
      <div class="buttons-container">
        <router-link to="/new-request" class="action-button">New Request</router-link>
        <router-link to="/" class="action-button">Back to Welcome Page</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.request-list {
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
  overflow-y: auto;
  height: calc(100vh - 40px);
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0 auto;
  max-width: 90%;
}

.request-item {
  background: rgba(255, 255, 255, 0.8);
  margin: 20px 0;
  padding: 20px;
  border-radius: 10px;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s ease;
  overflow: hidden;
  max-width: 100%;
  box-sizing: border-box;
}

.request-item:hover {
  transform: scale(1.01);
}

.request-info {
  text-align: left;
}

h2 {
  margin: 0 0 10px;
}

p {
  margin: 5px 0;
}

.buttons-container {
  margin-bottom: 20px;
}

.action-button {
  display: inline-block;
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #0056b3;
}
</style>