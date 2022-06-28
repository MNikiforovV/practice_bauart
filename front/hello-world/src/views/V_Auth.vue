<template>
    <div class="V_Auth">
        
        <div class="container mt-5 position-absolute top-50 start-50 translate-middle">
            <div class="row">
                <div class="col-sm-3 mx-auto">
                    <form @submit.prevent="authUser">

                        <div>
                            <div class="mb-3">
                                <label for="username" class="form-label">Логин</label>
                                <input type="text" class="form-control" id="username" placeholder="Ваш логин" v-model="form.username">
                            </div>

                            <div class="mb-3">
                                <label for="password" class="form-label">Пароль</label>
                                <input type="password" class="form-control" id="password" placeholder="Ваш пароль" v-model="form.password">
                            </div>

                            <button class="btn btn-primary">Авторизация</button>

                        </div>


                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>/* eslint-disable */
    import router from '@/router';
    import axios from 'axios';
    import { server } from '@/utils/helper'
    export default {
    name: 'PostFormAxios',
    data(){
        return{
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods:{
        authUser(){
            axios.post(`${server.baseURL}/auth/login`, this.form)
                    .then((res) => {
                        router.push({name: "Home"})
                    })
                    .catch((error) => {
                        error.response.status
                    }).finally(() => {
                      //Perform action in always
                    });
        }
    }
}

</script>
    
<style>
</style>
