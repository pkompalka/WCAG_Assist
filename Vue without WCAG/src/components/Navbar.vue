<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Shop</a>
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
    onLogoutClick() {
      setStorage("user", false);
      document.location.href = "/";
    }, 
  }
}
</script>

<style scoped>

</style>
