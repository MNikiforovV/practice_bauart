<template>
  <div id="project">
    <div
      class="container mt-5 position-absolute top-50 start-50 translate-middle"
    >
      <div class="row">
        <div class="col-sm-3 mx-auto">
          <form @submit.prevent="submit">
            <div>
              <div class="mb-3">
                <label for="name" class="form-label">Название проекта</label>
                <input
                  type="text"
                  class="form-control"
                  :class="$v.form.title.$error ? 'is-invalid' : ''"
                  id="title"
                  placeholder="Введите название проекта"
                  v-model.trim="form.title"
                />
                <p
                  v-if="$v.form.title.$dirty && !$v.form.name.required"
                  class="invalid-feedback"
                >
                  Обязательное поле
                </p>
                <p
                  v-if="$v.form.title.$dirty && !$v.form.name.minLength"
                  class="invalid-feedback"
                >
                  Минимальная длина названия 5 символов
                </p>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label"
                  >Содержание проекта</label
                >
                <input
                  type="text"
                  class="form-control"
                  :class="$v.form.content.$error ? 'is-invalid' : ''"
                  id="content"
                  placeholder="Введите содержание проекта"
                  v-model.trim="form.content"
                />
                <p
                  v-if="$v.form.content.$dirty && !$v.form.content.required"
                  class="invalid-feedback"
                >
                  Обязательное поле
                </p>
                <p
                  v-if="$v.form.content.$dirty && !$v.form.content.minLength"
                  class="invalid-feedback"
                >
                  Минимальная длина содержания 10 символов
                </p>
              </div>

              <!-- <div class="mb-3">
                <label for="author" class="form-label">Автор проекта</label>
                <input
                  type="text"
                  class="form-control"
                  :class="$v.form.author.$error ? 'is-invalid' : ''"
                  id="author"
                  placeholder="Введите автора проекта"
                  v-model.trim="form.author"
                />
                <p
                  v-if="$v.form.author.$dirty && !$v.form.author.required"
                  class="invalid-feedback"
                >
                  Обязательное поле
                </p>
                <p
                  v-if="$v.form.author.$dirty && !$v.form.author.minLength"
                  class="invalid-feedback"
                >
                  Минимальная длина автора 2 символа
                </p>
                <p
                  v-if="$v.form.author.$dirty && !$v.form.author.alpha"
                  class="invalid-feedback"
                >
                  Можно использовать только буквы
                </p>
              </div> -->

              <!-- <div class="mb-3">
                <label for="image" class="form-label">Аватарка проекта</label>
                <p>
                  <input
                    type="file"
                    name="image"
                    multiple
                    accept="image/jpeg, image/png"
                  />
                </p>
                <input
                  type="image"
                  class="form-control"
                  id="email"
                  placeholder="Вставьте аватар проекта"
                />
              </div> -->
              <button class="btn btn-primary">Создать</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import router from '@/router';

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        title: '',
        content: '',
        // author: '',
      },
    };
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(5),
      },
      content: {
        required,
        minLength: minLength(10),
      },
      // author: {
      //   required,
      //   minLength: minLength(2),
      //   alpha: (val) => /^[а-яё]*$/i.test(val),
      // },
    },
  },
  methods: {
    ...mapActions('project', ['createProject']),
    async submit() {
      this.$v.form.$touch();
      if (!this.$v.form.$error) {
        console.log('Валидация успешна!');
        await this.createProject(this.form);
        router.push('/');
      }
    },
  },
};
</script>

<style></style>
