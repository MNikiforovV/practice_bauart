<template>
  <div id="project">
    <div>
      <div>
        <div class="UpdateProject">
          <form @submit.prevent="submit">
            <div>
              <div>
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
              <button class="btn btn-primary">Изменить</button>
              <button @click="deleteProj" class="btn btn-danger">
                Удалить
              </button>
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
  // props: ['slug'],
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
    },
  },
  computed: {
    ...mapState('project', ['info']),
  },
  methods: {
    ...mapActions('project', ['updateProject']),
    ...mapActions('project', ['getProjectBySlug']),
    ...mapActions('project', ['deleteProject']),
    async submit() {
      this.$v.form.$touch();
      if (!this.$v.form.$error) {
        console.log('Валидация успешна!');
        const slug = this.$route.params.slug;
        await this.updateProject({ slug, data: this.form });
        router.push('/');
      }
    },
    async deleteProj() {
      const slug = this.$route.params.slug;
      await this.deleteProject({ slug });
      router.push('/');
    },
  },
  async mounted() {
    //   console.log(typeof this.$route.params.slug);
    const slug = this.$route.params.slug;
    const form = await this.getProjectBySlug(slug);
    if (form) {
      this.form = form;
    }
  },
};
</script>

<style>
.UpdateProject {
  display: flex;
  justify-content: center;
  max-width: 450px;
  height: 250px;
  box-shadow: 0 5px 45px #d5f3ee;
  margin: 0 auto;
  top: 15px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
  width: 100%;
  margin-top: 200px;
	padding: 30px 25px;
  font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 24px;
	line-height: 29px;



  background: #ffffff;
  border-radius: 30px;
}
</style>
