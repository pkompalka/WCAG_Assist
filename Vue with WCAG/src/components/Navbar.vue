<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <title class='title' @hidden="true">Navbar</title>
    <a class="navbar-brand" href="/">Shop</a>
    <form class="searchInput" v-on:submit.prevent="onSubmit" @submit="onSearchClicked">
      <input type="text" id="searchInput" placeholder="Search auction by title" name="searchInput" v-model="searchInput"/>
      <button class="searchButton" type="submit" alt="Submit"><label for="searchInput">Submit</label></button>
    </form>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">{{usernameHello}}</a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li v-if="!isLoggedIn" class="nav-item">
              <a class="dropdown-item" href="/login">Login</a>
            </li>
            <li v-if="!isLoggedIn" class="nav-item">
              <a class="dropdown-item" href="/register">Register</a>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <a class="dropdown-item" href="/create">Create auction</a>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <a class="dropdown-item" href="{{sellingLink}}">Bought auctions</a>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <a class="dropdown-item" href="javascript:void(0)" @click="onLogoutClick">Logout</a>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="onColorClick">Change site color</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import { getStorage, setStorage } from '../utils/localStorage'

export default {
  name: 'NavbarComponent',
  data() {
    return { 
      isLoggedIn: (getStorage("user") == false) ? false : true,
      usernameHello: (getStorage("user") == false) ? "Account" : `Hello, ${getStorage("user")?.login}`,
      sellingLink: `/bought/${getStorage("user")?.id}`,
      searchInput: "",
    }
  },

  methods: {
    onSearchClicked() {
      document.location.href = "/search/" + this.searchInput;
    },     

    onLogoutClick() {
      setStorage("user", false);
      document.location.href = "/";
    }, 

    onColorClick() {
      if (document.body.style.background === 'goldenrod')
        document.body.style.background = 'white';
      else
        document.body.style.background = 'goldenrod';
    }, 
  }
}
</script>

<style scoped>

</style>
