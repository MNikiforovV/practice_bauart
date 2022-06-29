<template>
  <div class="error-message">{{ errorMessage }}</div>
</template>

<script>
export default {
  props: {
    error: String
  },
  computed: {
    errorMessage() {
      let errorMessage = "";
      switch (this.error) {
        case "emptyField":
          errorMessage = "Поле обязательное для заполнения";
          break;

        case "passLimit":
          errorMessage = "Длина пароля должна быть от 4 до 16 символов";
          break;

        case "emailError":
          errorMessage = "Неверный формат эл. почты";
          break;

        case "nameError":
          errorMessage = "Имя и Фамилия должны быть с большой буквы";
          break;

        case "nameNumberError":
          errorMessage = "Имя и Фамилия не должны содержать цифр";
          break;

        case "passAcceptError":
          errorMessage = "Пароли должны совпадать";
          break;

        case "passNumberError":
          errorMessage = "В пароле должна быть цифра";
          break;
      }

      return errorMessage;
    }   
  }
};
</script>
