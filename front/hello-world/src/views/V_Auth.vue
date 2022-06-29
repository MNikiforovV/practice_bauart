<template>
    <div class="V_Auth">
        <div class="container mt-5 position-absolute top-50 start-50 translate-middle">
            <div class="row">
                <div class="col-sm-3 mx-auto">
                    <form @submit.prevent="checkForm">

                        <div>
                            <div class="mb-3">
                                <label for="login" class="form-label">Логин</label>
                                <input type="login" class="form-control"
                                    :class="$v.form.login.$error ? 'is-invalid' : ''" id="login" placeholder="Ваш логин"
                                    v-model.trim="form.login">
                                <p v-if="$v.form.login.$dirty && !$v.form.login.required" class="invalid-feedback">
                                    Обязательное поле
                                </p>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Пароль</label>
                                <input type="password" class="form-control"
                                    :class="$v.form.password.$error ? 'is-invalid' : ''" id="password"
                                    placeholder="Ваш пароль" v-model.trim="form.password">
                                <p v-if="$v.form.login.$dirty && !$v.form.password.required" class="invalid-feedback">
                                    Обязательное поле
                                </p>
                                <p v-if="$v.form.login.$dirty && !$v.form.password.minLength" class="invalid-feedback">
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
import axios from 'axios';
import { server } from '@/utils/helper'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    data() {
        return {
            form: {
                login: '',
                password: ''
            }

        }
    },
    validations: {
        form: {
            login: { required },
            password: { required, minLength: minLength(4) },
        }
    },
    methods: {
        checkForm() {
            this.$v.form.$touch()
            if (!this.$v.form.$error) {
                console.log("Валидация успешна")
                axios.post(`${server.baseURL}/auth/login`, this.form)
                    .then((res) => {
                        console.log(res);
                        router.push({ name: "Home" })
                    })
                    .catch((error) => {
                        console.log(error.response.status);
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
