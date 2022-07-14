<template>



  <div class="auth-body">
    <form class="auth-container" @submit.prevent="checkForm">
      <div class="auth">
        <h1 class="auth-title">Авторизация</h1>
        <div class="auth-field">
          <input type="Email" class="email" :class="$v.form.email.$error ? 'is-invalid' : ''" id="email"
            placeholder="Почта" v-model.trim="form.email" />
          <p v-if="$v.form.email.$dirty && !$v.form.email.required" class="invalid-feedback">
            Обязательное поле
          </p>
          <p v-if="$v.form.email.$dirty && !$v.form.email.email" class="invalid-feedback">
            Неверный формат Email
          </p>
          <input type="password" class="password" :class="$v.form.password.$error ? 'is-invalid' : ''" id="password"
            placeholder="Пароль" v-model.trim="form.password" />
          <p v-if="$v.form.email.$dirty && !$v.form.password.required" class="invalid-feedback">
            Обязательное поле
          </p>
          <p v-if="$v.form.email.$dirty && !$v.form.password.minLength" class="invalid-feedback">
            Минимальная длина пароля 4 символа
          </p>
        </div>
    
        <button class="form-button">Авторизация</button>
        <label class="or">ИЛИ</label>
        <router-link to="/register"><button class="form-button">Зарегистрироваться</button></router-link>
    
      </div>



    </form>
  </div>

</template>

<script>
import router from '@/router';
// import axios from 'axios';
// import { server } from '@/utils/helper'
import { validationMixin } from 'vuelidate';
import { required, minLength, email } from 'vuelidate/lib/validators';
import instance from '../components/Instance.js';
import { mapActions } from 'vuex';


export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
        // validError: (val) => validErrorEmail.test(val),
      },
      password: {
        required,
        minLength: minLength(4),

        //    validError: (val) => validErrorPass.test(val),
      },
    },
  },
  methods: {
    ...mapActions('user', ['loginUser']),
    async checkForm() {
      //   var validErrorPass = false;
      //   var validErrorEmail = false;
      this.$v.form.$touch();
      if (!this.$v.form.$error) {
        console.log('Валидация успешна');
        try {
          await this.loginUser(this.form);
          router.push({ name: 'Home' });
        } catch (error) {
          if (error == 401) {
            // console.log(error);
            // validErrorPass = true;
            // console.log(validErrorPass);
          } else if (error == 404) {
            // validErrorEmail = true;
            // console.log(validErrorEmail);
          }
        }
      }
    },
  },
};
</script>

<style src=@/style/Auth.css>
</style>
