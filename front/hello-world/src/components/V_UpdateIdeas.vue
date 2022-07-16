<template>
  <div class="updateIdea" id="V_UpdateIdeas">
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
        <button class="btn btn-primary">Изменить</button>
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
    ...mapActions('idea', ['updateIdea']),
    ...mapActions('idea', ['getIdeaBySlugForUpd']),

    async submit() {
      this.$v.form.$touch();
      if (!this.$v.form.$error) {
        console.log('Валидация успешна!');
        const slug = this.$route.params.slug;
        const slugIdea = this.$route.params.slugIdea;
        console.log(slug)
        console.log(slugIdea)
        const update = await this.updateIdea({
          slug,
          slugIdea,
          data: this.form,
        });
        this.$router.push('/project/' + slug + '/idea/');
      }
    },
  },

  async mounted() {
    const slug = this.$route.params.slug;
    const slugIdea = this.$route.params.slugIdea;
    const form = await this.getIdeaBySlugForUpd({ slug, slugIdea });
    if (form) {
      this.form = form;
    }
  },
};
</script>

<style>
#V_UpdateIdeas {
  font-family: 'Avenir', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  width: 400px;
}

.updateIdea{
   display: flex;
  justify-content: center;
  border-radius: 30px;
  box-shadow: 0 5px 45px #d5f3ee;
  padding: 30px;
}
</style>
