<template>
<div>
  <form class='loginContainer' v-on:submit.prevent="onSubmit" @submit="onLoginClicked">
    <title class='title'>Login</title>
    <label class='loginLabel' for="loginUsername"><b>Username:</b></label>
    <input class='loginInput' id="loginUsername" v-model="username" placeholder='username' type="text" required />
    <label class='loginLabel' for="loginPassword"><b>Password:</b></label>
    <input class='loginInput' id="loginPassword" aria-invalid="loginPassword" v-model="password" placeholder='password' type="password" required />
    <input class='loginSubmit' type="submit" value="Submit" alt="Submit" />
    <a class='loginHyperlink' href="/register">Click to create account</a>
    <p v-if="isLoading">Logging user....</p>
    <p v-if="registerError != ''">{{registerError}}</p>
  </form>
</div>
</template>

<script>
import { setStorage } from '../utils/localStorage'
import { userLogin } from '../api/userAPIService'

export default {
  name: 'LoginComponent',

  data() {
    return { 
      username: "",
      password: "",
      isLoading: false,
      registerError: "",
      checkboxState: false,
    }
  },

  methods: {
    async onLoginClicked() {
      try {
        this.isLoading = true;
        this.registerError = "";
        if (this.username == "" || this.password == "") {
          this.registerError = "No username or password";
          return;
        }
        const loginParams = {
          Login: this.username,
          Password: this.password
        };
        const userParameters = await userLogin(loginParams);
        setStorage("user", userParameters);      
        document.location.href = "/";
      } catch {
        this.registerError = "Wrong username or password";
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.loginContainer {
    position: absolute;
    left: 50%;
    top: 65%;
    height: 40%;
    margin-top: -15%;
    width: 30%;
    margin-left: -15%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.loginLabel{
    margin-top: 5%;
    width: 80%;
}

.loginInput{
    width: 80%;
}

.loginSubmit{
    margin-top: 5%;
    width: 40%;
}

.loginHyperlink{
    text-align: center;
    margin-top: 3%;
}

.loginHyperlink{
    text-align: center;
    margin-top: 3%;
}

.title{
    font-size: 30px;
    margin-top: 1%;
}

.loginLabel:after {
    color: red;
    content: ' *';
}

b {
    animation-name: loginLabelAnimation;
    animation-duration: 1s;
    animation-iteration-count: infinite;
}

@keyframes loginLabelAnimation {
    0%   {background-color: yellow;}
    100%  {background-color: red;}
}
</style>
