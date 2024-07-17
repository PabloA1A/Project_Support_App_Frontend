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
      cancelEdit
    };
  }
};
</script>

<template>
  <div>
    <h1>Edit Request</h1>
    <form @submit.prevent="updateRequest">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="request.name" required />
      </div>
      <div>
        <label for="date">Date:</label>
        <input type="date" v-model="request.date" required />
      </div>
      <div>
        <label for="subject">Subject:</label>
        <input type="text" v-model="request.subject" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea v-model="request.description" required></textarea>
      </div>
      <div>
        <button type="submit">Save Changes</button>
        <button type="button" @click="cancelEdit">Cancel</button>
        <button type="button" @click="deleteRequest">Delete</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>