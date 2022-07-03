<template>
  <div class="V_Auth">
    <div
      class="container mt-5 position-absolute top-50 start-50 translate-middle"
    >
      <div class="row">
        <div class="col-sm-3 mx-auto">
          <form @submit.prevent="checkForm">
            <div>
              <div class="mb-3">
                <label for="email" class="form-label">email</label>
                <input
                  type="email"
                  class="form-control"
                  :class="$v.form.email.$error ? 'is-invalid' : ''"
                  id="email"
                  placeholder="Ваш email"
                  v-model.trim="form.email"
                />
                <p
                  v-if="$v.form.email.$dirty && !$v.form.email.required"
                  class="invalid-feedback"
                >
                  Обязательное поле
                </p>
                <p
                  v-if="$v.form.email.$dirty && !$v.form.email.email"
                  class="invalid-feedback"
                >
                  Обязательное поле
                </p>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Пароль</label>
                <input
                  type="password"
                  class="form-control"
                  :class="$v.form.password.$error ? 'is-invalid' : ''"
                  id="password"
                  placeholder="Ваш пароль"
                  v-model.trim="form.password"
                />
                <p
                  v-if="$v.form.email.$dirty && !$v.form.password.required"
                  class="invalid-feedback"
                >
                  Обязательное поле
                </p>
                <p
                  v-if="$v.form.email.$dirty && !$v.form.password.minLength"
                  class="invalid-feedback"
                >
                  Минимальная длина пароля 4 символа
                </p>
              </div>

              <button class="btn btn-primary">Авторизация</button>
            </div>
          </form>
        </div>
      </div>
    </div>
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
      email: { required, email },
      password: { required, minLength: minLength(4) },
    },
  },
  methods: {
    ...mapActions('user', ['loginUser']),
    async checkForm() {
      this.$v.form.$touch();
      if (!this.$v.form.$error) {
        console.log('Валидация успешна');
        try {
          await this.loginUser(this.form);
          router.push({ name: 'Home' });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style></style>
