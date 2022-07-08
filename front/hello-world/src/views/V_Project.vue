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
                  v-if="$v.form.title.$dirty && !$v.form.title.required"
                  class="invalid-feedback"
                >
                  Обязательное поле
                </p>
                <p
                  v-if="$v.form.title.$dirty && !$v.form.title.minLength"
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
              <button onclick="submit" type="submit" class="btn btn-primary">Создать</button>
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
import { mapActions, mapState } from 'vuex';
import router from '@/router';

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        title: '',
        content: '',
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
    },
  },
  computed: {
    ...mapState('project', ['info']),

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
