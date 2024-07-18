<script>
export default {
  name: 'WelcomePage',
};
</script>

<template>
  <div class="welcome">
    <img src="/src/assets/img/background.jpg" class="background-image"></img> 
    <div class="content">
      <h1>Welcome to the Support App</h1>
      <div class="buttons-container">
        <router-link to="/requests" class="action-button">Request List View</router-link>
        <router-link to="/new-request" class="action-button">New Request</router-link>
      </div>
      <div class="center-info">
        <div class="info-box">
          <img src="/src/assets/img/health-center-logo.jpeg" alt="Health Center Logo" class="center-logo">
          <h2>Our Health Center</h2>
          <p>Welcome to our online support application. Here you can manage health center requests efficiently.</p>
        </div>
        <div class="info-box">
          <img src="/src/assets/img/medical-staff.jpeg" alt="Medical Staff" class="center-image">
          <h2>Our Medical Staff</h2>
          <p>Our dedicated medical staff is here to assist you with any health concerns.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome {
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
  background-image: url('/images/background.jpg'); 
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

.center-info {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
}

.info-box {
  text-align: left;
  max-width: 300px;
}

.center-logo {
  width: 100%;
  max-width: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.center-image {
  width: 100%;
  max-width: 250px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.info-box h2 {
  margin-bottom: 5px;
}

.info-box p {
  line-height: 1.6;
}
</style>