<template>
  <div>
    <header>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/"><h7>Foedus</h7></router-link>
     
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link active" to="/register"><h7>Регистрация</h7></router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link active" to="/auth"><h7>Авторизация</h7></router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <a href="href" class="nav-link active" @click.prevent="logout"><h7>Выйти</h7></a>
          </li>
        </ul>
      </div>  
    </div>
  </nav>
</header>
  </div>
</template> 

<script>
/* eslint-disable */
import { server } from '@/utils/helper'
import axios from 'axios'


export default {
    data() {
        return {
          isLoggedIn: !!this.$cookies.get('Set-Cookie'),
          cookie: this.$cookies.get('Set-Cookie')
        }
    },
    methods: { 
      async logout(){
        
        const response = await axios.post(`${server.baseURL}/auth/logout`, this.cookie)
        // .then((res) =>
        //   {
        //     console.log(this.$cookies.get('Set-Cookie'))
        //   }
        // )
        console.log(response)
      }
    }
}


</script>

