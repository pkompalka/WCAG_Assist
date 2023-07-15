<template>
<div>
  <form v-on:submit.prevent="onSubmit" @submit="onRegisterClicked">
    <div class='registerContainer'>
      <div class='flexContainer'>
        <label class="registerLabel"><b>Email:</b></label>
        <input class="registerInput" v-model="email" name="ename" type="email" placeholder="Enter email" />
        <label class="registerLabel"><b>Login:</b></label>
        <input tabindex="4" class="registerInput" v-model="username" name="username" type="text" placeholder="Enter username" />
        <label class="registerLabel"><b>Password:</b></label>
        <input tabindex="3" class="registerInput" v-model="password" name="password" type="password" placeholder="Enter password" />
        <label class="registerLabel"><b>Repeat Password:</b></label>
        <input class="registerInput" v-model="passwordRepeat" name="passwordRepeat" type="password" placeholder="Repeat password" />
      </div>
      <div class='flexContainer'>
        <label class="registerLabel" htmlFor="nameInput"><b>Name:</b></label>
        <input tabindex="-1" class="registerInput" v-model="name" name="name" id="nameInput" type="text" placeholder="Enter name" required/>
        <label class="registerLabel" htmlFor="surnameInput"><b>Name:</b></label>
        <input tabindex="1" class="registerInput" v-model="surname" name="surname" id="surnameInput" type="text" placeholder="Enter surname" />
        <label class="registerLabel"><b>Residence:</b></label>
        <input class="registerInput" v-model="street" name="street" type="text" placeholder="Enter street with flat number" />
        <label class="registerLabel"><b>Residence:</b></label>
        <input class="registerInput" v-model="postcode" name="postcode" type="text" placeholder="Enter postcode" />
        <label class="registerLabel"><b>Residence:</b></label>
        <input class="registerInput" v-model="city" name="city" type="text" placeholder="Enter city" />
      </div>
    </div>
    <div class='submitContainer'> 
      <div class='registerCheckboxContainer'>  
        <input type="checkbox" id="checkboxTerms" name="checkboxTerms" v-model="checkboxState"/>
        <label htmlFor="checkboxTerms">Do you agree to Terms & Conditions?</label>   
      </div>  
      <input class='registerSubmit' type="submit" value=""/>
      <a class='registerHyperlink' href="/login">Already have an account?</a>
      <a class='registerHyperlink' href="/">Already have an account?</a>
      <p v-if="isLoading">Registering user....</p>
      <p v-if="registerError != ''">{{registerError}}</p>
    </div>
  </form>
</div>
</template>

<script>
import { setStorage } from '../utils/localStorage'
import { userRegister } from '../api/userAPIService'

export default {
  name: 'RegisterComponent',

  data() {
    return { 
      email: "",
      username: "",
      password: "",
      passwordRepeat: "",
      name: "",
      surname: "",
      street: "",
      postcode: "",
      city: "",
      isLoading: false,
      registerError: "",
      checkboxState: false,
    }
    },

  methods: {
    async onRegisterClicked() {
      try {
        this.isLoading = true;
        this.registerError = "";
        if (!this.checkboxState) {
          this.registerError = "Agree to Terms & Conditions to register";
          return;
        }
        if (this.password != this.passwordRepeat) {
          this.registerError = "Passwords are different";
          return;
        }
      
        const registerParams = {
          Login: this.username,
          Password: this.password,
          Name: this.name,
          Surname: this.surname,
          Street: this.street,
          Postcode: this.postcode,
          City: this.city,
          Email: this.email
        };
        const userParameters = await userRegister(registerParams);
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
.registerContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 5%;
}

.flexContainer{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 35vw;
}

.submitContainer{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.registerLabel{
    margin-top: 5%;
    width: 80%;
}

.registerInput{
    width: 80%;
}

.registerSubmit{
    margin-top: 2%;
    height:50px;
    width:100px;
    background: green;
    clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);
}

.registerHyperlink{
    margin-top: 1%;
}

.registerCheckboxContainer{
    display: flex;
    flex-direction: row;
}
</style>
