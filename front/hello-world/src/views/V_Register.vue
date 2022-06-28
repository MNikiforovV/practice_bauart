<template>
  <div class="container mt-5 position-absolute top-50 start-50 translate-middle">
    <div class="row">
      <div class="col-sm-3 mx-auto">
        <form @submit.prevent="registerUser">

          <div v-show="step === 1" class="step">
            <div class="mb-3">
              <label for="name" class="form-label">Имя</label>
              <input type="text" class="form-control" id="name" placeholder="Ваше имя" v-model="form.name">
            </div>

            <div class="mb-3">
              <label for="surname" class="form-label">Фамилия</label>
              <input type="text" class="form-control" id="surname" placeholder="Ваша фамилия" v-model="form.surname">
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Электронная почта</label>
              <input type="email" class="form-control" id="email" placeholder="Ваша почта" v-model="form.email">
            </div>

            <div class="mb-3"></div>
            <button @click="nextStep" type="button" class="btn btn-primary">Следующий шаг</button>
          </div>



          <div v-show="step === 2" class="step">

            <div class="mb-3">
              <label for="login" class="form-label">Логин</label>
              <input type="login" class="form-control" id="login" placeholder="Ваш логин" v-model="form.username">
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Пароль</label>
              <input type="password" class="form-control" id="password" placeholder="Ваш пароль" v-model="form.password">
            </div>

            <div class="mb-3">
              <label for="passwordConfirm" class="form-label">Подтверждение пароля</label>
              <input type="password" class="form-control" id="passwordConfirm" placeholder="Повторите Ваш пароль">
            </div>

            <button @click="backStep" type="button" class="btn btn-light" style="margin-right: 10px">Назад</button>
            <button class="nav-link active"><h7>Зарегистрация</h7></button>

          </div>


        </form>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import router from '@/router';
    import axios from 'axios';
    import { server } from '@/utils/helper'

export default {
  data() {
    return {
      step: 1,
      form: {
        name: '',
        surname: '',
        email: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    nextStep() {
      if (this.step < 2) {
        this.step++
      }
    },
    backStep() {
      if (this.step > 1) {
        this.step--
      }
    },
    registerUser() {
      axios.post(`${server.baseURL}/auth/register`, this.form)
        .then((res) => {
          router.push({name: "Home"})
        })
        .catch((error) => {
          error.response.status
        })
    }
  }
}

</script>

<style>
</style>
