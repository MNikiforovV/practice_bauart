<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-sm-3 mx-auto">
        <form @submit.prevent="registerUser" novalidate>

          <div v-show= "step ===1" class="step">
            <div class="mb-3">
              <label for="name" class="form-label">Имя</label>
              <input type="text" class="form-control" id="name" placeholder="Ваше имя">
            </div>

            <div class="mb-3">
              <label for="surname" class="form-label">Фамилия</label>
              <input type="text" class="form-control" id="surname" placeholder="Ваша фамилия">
            </div>
            
            <div class="mb-3">
              <label for="email" class="form-label">Электронная почта</label>
              <input type="email" class="form-control" id="email" placeholder="Ваша почта">
            </div>

            <div class="mb-3"></div>
            <button @click="nextStep" type="button" class="btn btn-primary">Следующий шаг</button>
          </div>

            
          <transition name="slide-fade">
            <div v-show= "step ===2" class="step">
              <div class="mb-3">
                <label for="password" class="form-label">Пароль</label>
                <input type="password" class="form-control" id="password">
              </div>

              <div class="mb-3">
                <label for="passwordConfirm" class="form-label">Подтверждение пароля</label>
                <input type="password" class="form-control" id="passwordConfirm">
              </div>

              <button @click="backStep" type="button" class="btn btn-light" style="margin-right: 10px">Назад</button>
              <button type="submit" class="btn btn-primary">Зарегестрироваться</button>
              
            </div>
          </transition>

        </form>
      </div>
    </div> 
  </div>
</template>

<script>

export default {
  data () {
    return {
      step: 1
    }
  },
  methods: {
    nextStep() {
      if(this.step < 2) {
        this.step++
      }
    },
    backStep () {
      if(this.step > 1 ) {
        this.step--
      }
    },
    registerUser () {
      console.log ('Регистрация прошла успешно!')
    }
  }
}
 
</script>

<style>


</style>
