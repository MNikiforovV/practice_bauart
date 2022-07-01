<template>
    <div class="position-absolute top-50 start-50 translate-middle">
        <h1>
            <p class="text-center">Профиль </p>
        </h1>
    </div>
</template>

<script>
/* eslint-disable */    
import instance from '../components/Instance.js'
export default {
    name: "V_Profile",
    methods: {
        beforeMount() {
            instance.get('auth/isloggedin') 
        }
    }
}


</script>
<style>
</style>
