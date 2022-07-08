<template>
  <div id="V_Idea">
    <form @submit.prevent="submit">
      <div>
        <div>
          <label for="name" class="form-label">Название идеи</label>
          <input
            type="text"
            class="form-control"
            :class="$v.form.title.$error ? 'is-invalid' : ''"
            id="title"
            placeholder="Введите название идеи"
            v-model.trim="form.title"
          />
          <p
            v-if="$v.form.title.$dirty && !$v.form.title.required"
            class="invalid-feedback"
          >
            Обязательное поле
          </p>
          <p
            v-if="$v.form.title.$dirty && !$v.form.content.minLength"
            class="invalid-feedback"
          >
            Минимальная длина названия 5 символов
          </p>
        </div>
        <div>
          <label for="content" class="form-label">Содержание идеи</label>
          <input
            type="text"
            class="form-control"
            :class="$v.form.content.$error ? 'is-invalid' : ''"
            id="content"
            placeholder="Введите содержание идеи"
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
        <button class="btn btn-primary">Создать</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';

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
    ...mapState('idea', ['infoIdeas']),
  },
  methods: {
    ...mapActions('idea', ['getIdeaBySlug']),
    ...mapActions('idea', ['getAllIdeas']),
    ...mapActions('idea', ['createIdea']),

    async submit() {
      this.$v.form.$touch();
      if (!this.$v.form.$error) {
        console.log('Валидация успешна!');
        const slug = this.$route.params.slug;
        const create = await this.createIdea({ form: this.form, slug });
        this.$router.push('/project/' + slug + '/idea/');
      }
    },
  },

  async mounted() {
 
  },
};
</script>

<style>
#V_Idea {
  font-family: 'Avenir', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  width: 400px;
}

/* .project {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
} */
</style>
