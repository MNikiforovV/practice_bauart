<template>
  <div id="V_Idea">
    <div class="idea">
       <!-- v-if="infoIdeas" -->
      <p align="left">Название идеи: {{ infoIdeas.title }}</p>
      <p align="left">Описание идеи: {{ infoIdeas.content }}</p>
      <button v-if="UserRole == 'Admin' || infoIdeas.author.email == UserEmail" @click="editIdea" class="btn btn-primary">Изменить</button>
      <button v-if="UserRole == 'Admin' || infoIdeas.author.email == UserEmail" @click="deleteIdeas" class="btn btn-danger">Удалить</button>
    </div>
    <form @submit.prevent="addMoney" class="donate" v-if="UserRole == 'Admin'">
      <div>
        <label for="titleMoney" class="form-label">Название сбора</label>
        <input
          type="text"
          class="form-control"
          :class="$v.adminForm.titleMoney.$error ? 'is-invalid' : ''"
          id="title"
          placeholder="Введите название сбора"
          v-model.trim="adminForm.titleMoney"
        />
        <p
          v-if="
            $v.adminForm.titleMoney.$dirty && !$v.adminForm.titleMoney.minLength
          "
          class="invalid-feedback"
        >
          Минимальная длина названия 5 символов
        </p>
      </div>
      <div>
        <label for="goal" class="form-label">Цель сбора (руб.)</label>
        <input
          type="text"
          class="form-control"
          :class="$v.adminForm.goal.$error ? 'is-invalid' : ''"
          id="goal"
          placeholder="Введите цель сбора в рублях"
          v-model.trim="adminForm.goal"
        />
        <p
          v-if="$v.adminForm.goal.$dirty && !$v.adminForm.goal.required"
          class="invalid-feedback"
        >
          Обязательное поле
        </p>
      </div>
      <button @click="goToAddMoney" class="btn btn-primary">
        Добавить сбор средств
      </button>
    </form>
    <div class="moneyProgress">
      <p align="left">Собрано:</p>
      <p align="left">Цель:</p>
    </div>
    <form @submit="submit" class="chat">
      <h1 align="center">Обсуждение идеи</h1>
      <div v-for="(discussion, key) in contentChat" :key="key">
        <hr />
        <p align="left">Автор: {{ discussion.author.name}} {{ discussion.created }}</p>
        <p align="left">{{ discussion.content }}</p>
      </div>

      <input
        type="text"
        class="inChat"
        placeholder="Обсудить..."
        id="content"
        v-model.trim="chatForm.content"
      />
      <div class="buttonChat">
        <button class="btn btn-primary">Отправить</button>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
import { mapState, mapActions } from 'vuex';

export default {
  mixins: [validationMixin],
  data() {
    return {
      chatForm: {
        content: '',
      },
      adminForm: {
        titleMoney: '',
        goal: '',
      },
    };
  },
  validations: {
    adminForm: {
      titleMoney: {
        required,
      },
      goal: {
        minLength: minLength(5),
      },
    },
  },
  computed: {
    ...mapState('idea', ['infoIdeas', 'contentChat']),
    ...mapState('user', ['infoUser']),
    ...mapState('fundraising', ['getOneFund']),

    UserRole() {
      if (this.infoUser) {
        return this.infoUser.role;
      } else {
        return [];
      }
    },
     UserEmail() {
      if (this.infoUser) {
        return this.infoUser.email;
      } else {
        return [];
      }
    },
  },
  methods: {
    ...mapActions('idea', [
      'getIdeaBySlug',
      'deleteIdea',
      'getChat',
      'postChat',
    ]),
    ...mapActions('user', ['getInfoN']),

    async editIdea() {
      const slug = this.$route.params.slug;
      const slugIdea = this.$route.params.slugIdea;
      this.$router.push('/project/' + slug + '/idea/' + slugIdea + '/update');
    },
    async deleteIdeas() {
      const slug = this.$route.params.slug;
      const slugIdea = this.$route.params.slugIdea;
      await this.deleteIdea({ slug, slugIdea });
      this.$router.push('/project/' + slug + '/idea/');
    },
    async submit() {
      const slug = this.$route.params.slug;
      const slugIdea = this.$route.params.slugIdea;
      const create = await this.postChat({
        form: this.chatForm,
        slug,
        slugIdea,
      });
      // this.$router.push('/project/' + slug + '/idea/');
    },
    async addMoney() {
      this.$v.adminForm.$touch();
      if (!this.$v.adminForm.$error) {
        console.log('Валидация успешна!');
        // const slug = this.$route.params.slug;
        // this.$router.push('/project/' + slug + '/idea/');
      }
    },
  },
  async mounted() {
    const slug = this.$route.params.slug;
    const slugIdea = this.$route.params.slugIdea;
    this.getIdeaBySlug({ slug, slugIdea });
    this.getChat({ slug, slugIdea });
    this.getInfoN();
    console.log(this.$v);
  },
};
</script>

<style>
#V_Idea {
  font-family: 'Avenir', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px auto;
  width: 400px;
}

.idea {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}

/* .chat {
  margin-top: 500px;
} */

.inChat {
  margin: auto;
  width: 500px;
  height: 36px;
}

.buttonChat {
  width: 500px;
  height: 36px;
}

.moneyProgress {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}
</style>
