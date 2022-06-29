<template>
  <div class="container mt-5 position-absolute top-50 start-50 translate-middle test">

    <div class="row">
      <div class="col-sm-3 mx-auto">
        <form @submit.prevent="submit">
          <div class="mb-3">
            <label for="name" class="form-label">Имя</label>
            <input type="text" class="form-control" :class="$v.form.name.$error ? 'is-invalid' : ''" id="name"
              placeholder="Ваше имя" v-model.trim="form.name">
            <p v-if="$v.form.username.$dirty && !$v.form.name.required" class="invalid-feedback">
              Обязательное поле
            </p>
          </div>



          <div class="mb-3">
            <label for="surname" class="form-label">Фамилия</label>
            <input type="text" class="form-control" :class="$v.form.surname.$error ? 'is-invalid' : ''" id="surname"
              placeholder="Ваша фамилия" v-model.trim="form.surname">
            <p v-if="$v.form.username.$dirty && !$v.form.surname.required" class="invalid-feedback">
              Обязательное поле
            </p>
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Электронная почта</label>
            <input type="email" class="form-control" :class="$v.form.email.$error ? 'is-invalid' : ''" id="email"
              placeholder="Ваша почта" v-model.trim="form.email">
            <p v-if="$v.form.username.$dirty && !$v.form.email.required" class="invalid-feedback">
              Обязательное поле
            </p>
            <p v-if="$v.form.username.$dirty && !$v.form.email.email" class="invalid-feedback">
              Неккоректный Email
            </p>
          </div>

          <div class="mb-3"></div>



          <div class="mb-3">
            <label for="username" class="form-label">Логин</label>
            <input type="username" class="form-control" :class="$v.form.username.$error ? 'is-invalid' : ''" id="username"
              placeholder="Ваш логин" v-model.trim="form.username">
            <p v-if="$v.form.username.$dirty && !$v.form.username.required" class="invalid-feedback">
              Обязательное поле
            </p>
            <p v-if="$v.form.username.$dirty && !$v.form.username.minLength" class="invalid-feedback">
              Минимальная длинна логина 4 символа
            </p>

          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Пароль</label>
            <input type="password" class="form-control" :class="$v.form.password.$error ? 'is-invalid' : ''"
              id="password" placeholder="Ваш пароль" v-model.trim="form.password">
            <p v-if="$v.form.username.$dirty && !$v.form.password.required" class="invalid-feedback">
              Обязательное поле
            </p>
            <p v-if="$v.form.username.$dirty && !$v.form.password.minLength" class="invalid-feedback">
              Минимальная длинна логина 4 символа
            </p>
          </div>

          <div class="mb-3">
            <label for="passwordConfirm" class="form-label">Подтверждение пароля</label>
            <input type="password" class="form-control" :class="$v.form.passwordConfirm.$error ? 'is-invalid' : ''"
              id="passwordConfirm" placeholder="Повторите Ваш пароль" v-model.trim="form.passwordConfirm">
            <p v-if="$v.form.username.$dirty && !$v.form.passwordConfirm.required" class="invalid-feedback">
              Обязательное поле
            </p>
          </div>

          <button onclick="submit" type="submit" class="btn btn-primary">Зарегестрироваться</button>

        </form>
      </div>
    </div>
  </div>
</template>


<script>
import router from '@/router'
import { server } from '@/utils/helper'
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
        submitStatus: null
      }

    }
  },
  validations: {
    form: {
      name: { required },
      surname: { required },
      email: { required, email },
      username: { required, minLength: minLength(4) },
      password: { required, minLength: minLength(4) },
      passwordConfirm: { required },
    }
  },
  methods: {
    submit() {
      console.log('submit!')
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        axios.post(`${server.baseURL}/auth/register`, this.form)
          .then((res) => {
            console.log(res);
            router.push('/auth')
          })
          .catch((error) => {
            console.log(error);
          }).finally(() => {
            //Perform action in always
          });

      }
    }
  }
}



</script>

<style>
</style>
