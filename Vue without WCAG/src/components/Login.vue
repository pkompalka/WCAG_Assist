<template>
<div>
  <form class='loginContainer' v-on:submit.prevent="onSubmit" @submit="onLoginClicked">
    <img :src="require(`@/assets/login.jpg`)"/>
    <div id='usernameDiv' class='loginLabel' contenteditable="true" name="username" @input="onUsernameChange($event)">Username</div>
    <label class='loginLabel'><b>Password:</b></label>
    <input class='loginInput' name="password" v-model="password" placeholder='password' type="password" />
    <input class='loginSubmit' type="submit" value="Submit" />
    <a accesskey="q" class='loginHyperlink' href="/register">Click to create account</a>
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
          return;
        }
        const loginParams = {
          Login: this.username,
          Password: this.password
        };
        const userParameters = await userLogin(loginParams);
        setStorage("user", userParameters);      
        document.location.href = "/";
      } catch(error) {
        console.log(error)
      } finally {
        this.isLoading = false;
      }
    },

    onUsernameChange(event) {
      this.username = event.target.innerText;
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

b {
    animation-name: loginLabelAnimation;
    animation-duration: 0.2s;
    animation-iteration-count: infinite;
}

@keyframes loginLabelAnimation {
    0%   {background-color: yellow;}
    100%  {background-color: red;}
}
</style>
