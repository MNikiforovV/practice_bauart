<template>
  <div class="chatCont" id="V_Idea">
    <div class="idea">
      <p align="left">Название идеи: {{ infoIdeas.title }}</p>
      <p align="left">Описание идеи: {{ infoIdeas.content }}</p>
      <button
        v-if="UserRole == 'Admin' || infoIdeas.author.email == UserEmail"
        @click="editIdea"
        class="btn1"
      >
        Изменить
      </button>
      <button
        v-if="UserRole == 'Admin' || infoIdeas.author.email == UserEmail"
        @click="deleteIdeas"
        class="btn1"
      >
        Удалить
      </button>
    </div>
    <!-- <button
      v-if="
        (UserRole == 'Admin' || infoIdeas.author.email == UserEmail)
      "
      @click="goToAddMoney"
      class="btn btn-primary"
    >
      Добавить сбор средств
    </button> -->
    <form
      @submit.prevent="addMoney"
      class="donate"
      v-if="
        (UserRole == 'Admin' || infoIdeas.author.email == UserEmail)
      "
    >
      <div>
        <label for="titleMoney" class="form-label">Название сбора</label>
        <input
          type="text"
          class="inChat"
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
          Минимальная длина названия 1 символ
        </p>
      </div>
      <div>
        <label for="goal" class="form-label">Цель сбора (руб.)</label>
        <input
          type="number"
          class="inChat"
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
      <button class="btn5">Добавить</button>
    </form>
    <div class="moneyProgress">
      <p align="left">Собрано: [[данные удалены]]</p>
      <p align="left">Цель: {{ infoFund.goal }}</p>
      <button>Учавствовать</button>
    </div>
    <form @submit="submit" class="chat">
      <h1 align="center">Обсуждение идеи</h1>
      <Chat v-for="(chat, key) in contentChat" :key="key" :chat="chat"> </Chat>

      <input
        type="text"
        class="inChat"
        placeholder="Обсудить..."
        id="content"
        v-model.trim="chatForm.content"
      />
      <div class="buttonChat">
        <button class="btn5">Отправить</button>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
import { mapState, mapActions } from 'vuex';
import Chat from '@/components/Chat.vue';

export default {
  mixins: [validationMixin],
  name: 'V_Idea',
  components: {
    Chat,
  },
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
        minLength: minLength(1),
      },
      goal: {
        required,
      },
    },
  },
  computed: {
    ...mapState('idea', ['infoIdeas', 'contentChat']),
    ...mapState('user', ['userInfo']),
    ...mapState('fundraising', ['infoFund']),

    UserRole() {
      if (this.userInfo) {
        return this.userInfo.role;
      } else {
        return [];
      }
    },
    UserEmail() {
      if (this.userInfo) {
        return this.userInfo.email;
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
    ...mapActions('user', ['getUserInfo']),
    ...mapActions('fundraising', ['createFund', 'getFund']),

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
    },
    async addMoney() {
      this.$v.adminForm.$touch();
      if (!this.$v.adminForm.$error) {
        const slug = this.$route.params.slug;
        const slugIdea = this.$route.params.slugIdea;
        const create = this.createFund({
          form: this.adminForm,
          slug,
          slugIdea,
        });
      }
    },
    async goToAddMoney() {
      let status = true;
      return status;
    },
  },
  async mounted() {
    const slug = this.$route.params.slug;
    const slugIdea = this.$route.params.slugIdea;
    this.getIdeaBySlug({ slug, slugIdea });
    this.getChat({ slug, slugIdea });
    this.getUserInfo();
    this.getFund({ slug, slugIdea });
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
  margin-bottom: 1rem;
  border-radius: 30px;
  box-shadow: 0 5px 45px #d5f3ee;
  margin-right: 5%;
  margin-left: 5%;
}

.inChat {
  margin: auto;
  width: 400px;
  height: 36px;

  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 20px;
}

.btn5 {
   border: none;
  background: none;
  box-sizing: border-box;
  font-family: 'Inter';
  font-style: normal;
  font-size: 20px;
  line-height: 0px;

 
  justify-content: center;
  align-items: center;
  padding: 15px 25px;
  gap: 10px;

  width: 250px;
  height: 36px;

  background: #d5f3ee;
  border: 1px solid #000000;
  border-radius: 30px;

  transition: color 0.2s linear;
  margin-top: 20px;
  margin-bottom: 20px;
}

.moneyProgress {
  border: 1px solid #ccc;
  border-radius: 30px;
  margin-bottom: 1rem;
  box-shadow: 0 5px 45px #d5f3ee;
}

.chatCont {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;

}

.donate {
  box-shadow: 0 5px 45px #d5f3ee;
  margin-bottom: 30px;
}
/* .inputAdmin */
</style>
