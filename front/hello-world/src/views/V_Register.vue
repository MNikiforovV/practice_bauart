<template>


  <div class="register-body">
    <form class="register-container" @submit.prevent="submit">
      <div class="register">
        <h1 class="register-title">Регистрация</h1>
        <div class="register-field">
          
          <div>
            <input type="text" class="name" :class="$v.form.name.$error ? 'is-invalid' : ''" id="name" placeholder="Имя"
              v-model.trim="form.name">
            <p v-if="$v.form.username.$dirty && !$v.form.name.required" class="invalid-feedback">
              Обязательное поле
            </p>
            <p v-if="$v.form.username.$dirty && !$v.form.name.alpha" class="invalid-feedback">
              Имя должно содержать только буквы
            </p>
          </div>


          <div>
            <input type="text" class="surname" :class="$v.form.surname.$error ? 'is-invalid' : ''" id="surname"
              placeholder="Фамилия" v-model.trim="form.surname">
            <p v-if="$v.form.username.$dirty && !$v.form.surname.required" class="invalid-feedback">
              Обязательное поле
            </p>
            <p v-if="$v.form.username.$dirty && !$v.form.surname.alpha" class="invalid-feedback">
              Фамилия должна содержать только буквы
            </p>
          </div>


          <div>
            <input type="email" class="emailreg" :class="$v.form.email.$error ? 'is-invalid' : ''" id="email"
              placeholder="Почта" v-model.trim="form.email">
            <p v-if="$v.form.username.$dirty && !$v.form.email.required" class="invalid-feedback">
              Обязательное поле
            </p>
            <p v-if="$v.form.username.$dirty && !$v.form.email.email" class="invalid-feedback">
              Неккоректный Email
            </p>
          </div>


          <div>
            <input type="username" class="username" :class="$v.form.username.$error ? 'is-invalid' : ''" id="username"
              placeholder="Логин" v-model.trim="form.username">
            <p v-if="$v.form.username.$dirty && !$v.form.username.required" class="invalid-feedback">
              Обязательное поле
            </p>
            <p v-if="$v.form.username.$dirty && !$v.form.username.minLength" class="invalid-feedback">
              Минимальная длина логина 4 символа
            </p>
          </div>


          <div>
            <input type="password" class="passwordreg" :class="$v.form.password.$error ? 'is-invalid' : ''"
              id="password" placeholder="Пароль" v-model.trim="form.password">
            <p v-if="$v.form.username.$dirty && !$v.form.password.required" class="invalid-feedback">
              Обязательное поле
            </p>
            <p v-if="$v.form.username.$dirty && !$v.form.password.minLength" class="invalid-feedback">
              Минимальная длина логина 4 символа
            </p>
          </div>


          <div>
            <input @blur='$v.confirmPassword.$touch()' type="password" class="passwordConfirm"
              :class="$v.form.passwordConfirm.$error ? 'is-invalid' : ''" id="passwordConfirm"
              placeholder="Повторите Ваш пароль" v-model.trim="form.passwordConfirm">
            <p v-if="$v.form.username.$dirty && !$v.form.passwordConfirm.required" class="invalid-feedback">
              Обязательное поле
            </p>
          </div>
         
            <button onclick="submit" type="submit" class="button">Зарегистрироваться</button>
          

        </div>
      </div>

    </form>
  </div>


</template>

<script>
import router from '@/router';
import { server } from '@/utils/helper';
import axios from 'axios';
import { validationMixin } from 'vuelidate';
import { required, minLength, email } from 'vuelidate/lib/validators';

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
        submitStatus: null,
      },
    };
  },
  validations: {
    form: {
      name: { required, alpha: (val) => /^[а-яё]*$/i.test(val) },
      surname: { required, alpha: (val) => /^[а-яё]*$/i.test(val) },
      email: { required, email },
      username: { required, minLength: minLength(4) },
      password: { required, minLength: minLength(4) },
      passwordConfirm: { required },
    },
  },
  methods: {
    submit() {
      console.log('submit!');
      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        axios
          .post(`${server.baseURL}/auth/register`, this.form)
          .then((res) => {
            console.log(res);
            router.push('/auth');
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            //Perform action in always
          });
      }
    },
    validate() {
      console.log(this.password === this.passwordConfirm);
    },
  },
};
</script>

<style src=@/style/Registr.css>
</style>


