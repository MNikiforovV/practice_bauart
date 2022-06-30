<template>
  <div>
    <header>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/"><h7>Foedus</h7></router-link>
     
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="/register"><h7>Регистрация</h7></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/auth"><h7>Авторизация</h7></router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link active" to="/"><h7>Выйти</h7></router-link>
          </li>
        </ul>
      </div>  
    </div>
  </nav>
</header>
  </div>
</template> 

<script>

export default {
    data() {
        return {
            isLoggedIn: !!this.$cookies.get('Authentication')

        }
    },
    methods: { }
}


</script>

