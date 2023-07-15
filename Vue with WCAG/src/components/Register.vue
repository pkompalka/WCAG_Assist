<template>
<div>
  <form v-on:submit.prevent="onSubmit" @submit="onRegisterClicked">
    <div class='registerContainer'>
      <div class='flexContainer'>
        <title class='title'>Register</title>
        <label class="registerLabel" for="email"><b>Email:</b></label>
        <input class="registerInput" v-model="email" id="email" type="email" placeholder="Enter email" required/>
        <label class="registerLabel" for="username"><b>Login:</b></label>
        <input class="registerInput" v-model="username" id="username" type="text" placeholder="Enter username" required/>
        <label class="registerLabel" for="password"><b>Password:</b></label>
        <input class="registerInput" v-model="password" id="password" type="password" placeholder="Enter password" required/>
        <label class="registerLabel" for="passwordRepeat"><b>Repeat Password:</b></label>
        <input class="registerInput" v-model="passwordRepeat" id="passwordRepeat" type="password" placeholder="Repeat password" required/>
      </div>
      <div class='flexContainer'>
        <label class="registerLabel" for="nameInput"><b>Name:</b></label>
        <input class="registerInput" v-model="name" name="name" id="nameInput" type="text" placeholder="Enter name" required/>
        <label class="registerLabel" for="surnameInput"><b>Surname:</b></label>
        <input class="registerInput" v-model="surname" name="surname" id="surnameInput" type="text" placeholder="Enter surname" required/>
        <label class="registerLabel" for="street"><b>Street:</b></label>
        <input class="registerInput" v-model="street" id="street" type="text" placeholder="Enter street with flat number" required/>
        <label class="registerLabel" for="postcode"><b>Postcode:</b></label>
        <input class="registerInput" v-model="postcode" id="postcode" type="text" placeholder="Enter postcode" required/>
        <label class="registerLabel" for="city"><b>City:</b></label>
        <input class="registerInput" v-model="city" id="city" type="text" placeholder="Enter city" required/>
      </div>
    </div>
    <div class='submitContainer'> 
      <div class='registerCheckboxContainer'>  
        <input type="checkbox" id="checkboxTerms" name="checkboxTerms" v-model="checkboxState"/>
        <label class="registerLabel" htmlFor="checkboxTerms">Do you agree to <a href="/terms" rel="noreferrer" target="_blank">Terms & Conditions</a>?</label>   
      </div>  
      <input class='registerSubmit' type="submit" value="Submit" alt="Submit"/>
      <a class='registerHyperlink' href="/login">Already have an account?</a>
      <a class='registerHyperlink' href="/">Go back to home page</a>
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
    width: 40%;
    background-color: green;
    border-color: white;
}

.registerHyperlink{
    margin-top: 1%;
}

.registerCheckboxContainer{
    display: flex;
    flex-direction: row;
}

.registerLabel:after {
    color: red;
    content: ' *';
}

</style>
