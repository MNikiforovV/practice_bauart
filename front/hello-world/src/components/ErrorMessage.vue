<template>
  <div id="app">
    <form> <label for="pass">Пароль</label> <input id="pass" :class='{ "error": $v.password.$error }' type="password"
        v-model='password' @blur='$v.password.$touch()'> <span v-if="!$v.password.minLength && $v.password.$error"
        class="error-msg"> Необходимо указать пароль не менее {{ $v.password.$params.minLength.min }} символов </span>
      <label for="confirm_pass">Подтверждение пароля</label> <input id="confirm_pass"
        :class='{ "error": $v.confirmPassword.$error }' type="password" v-model='confirmPassword'
        @blur='$v.confirmPassword.$touch()'> 
        <span v-if="!$v.confirmPassword.sameAs && $v.confirmPassword.$error"
        class="error-msg"> Пароли не совпадают </span>
    </form>
  </div>
</template>
 <script>import { minLength, sameAs } from 'vuelidate/lib/validators';
 export default {
   data: () => ({ password: '', confirmPassword: '', }),
   validations: {
     password: { minLength: minLength(6), },
     confirmPassword: {
       sameAs: sameAs('password'), // если переменная пришла из вне //
       sameAs: sameAs(vue => vue.newObj.password)
     },
   },
 };
 </script>
