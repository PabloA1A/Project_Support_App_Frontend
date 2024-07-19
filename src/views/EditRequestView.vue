<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'EditRequestView',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const request = ref({
      name: '',
      date: '',
      subject: '',
      description: ''
    });

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const getRequest = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/healthcenters/${route.params.id}`);
        request.value = response.data;
        if (request.value.date) {
          request.value.date = formatDate(request.value.date);
        }
      } catch (error) {
        console.error('Error fetching the request:', error);
      }
    };

    const updateRequest = async () => {
      try {
        await axios.put(`http://localhost:8080/healthcenters/${route.params.id}`, request.value);
        router.push('/requests');
      } catch (error) {
        console.error('Error updating the request:', error);
      }
    };

    const deleteRequest = async () => {
      try {
        await axios.delete(`http://localhost:8080/healthcenters/${route.params.id}`);
        router.push('/requests');
      } catch (error) {
        console.error('Error deleting the request:', error);
      }
    };

    const cancelEdit = () => {
      router.push('/requests');
    };

    onMounted(getRequest);

    return {
      request,
      updateRequest,
      deleteRequest,
      cancelEdit,
      formatDate,
      getRequest
  };
  }
};
</script>

<template>
  <div class="new-request">
    <div class="background-image"></div>
    <div class="content">
      <h1>Edit Request</h1>
      <form @submit.prevent="updateRequest" class="request-form">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="request.name" required />
        </div>
        <div class="form-group">
          <label for="date">Date:</label>
          <input type="date" id="date" v-model="request.date" required />
        </div>
        <div class="form-group">
          <label for="subject">Subject:</label>
          <input type="text" id="subject" v-model="request.subject" required />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea id="description" v-model="request.description" required></textarea>
        </div>
        <div class="buttons-container">
          <button type="submit" class="action-button">Save Changes</button>
          <button type="button" @click="cancelEdit" class="action-button cancel-button">Cancel</button>
          <button type="button" @click="deleteRequest" class="action-button delete-button">Delete</button>
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