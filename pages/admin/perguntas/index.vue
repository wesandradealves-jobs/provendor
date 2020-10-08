<template>
  <prd-page :fetch="fetchQuestions">
    <client-only>
      <card
        v-if="data.length === 0"
        class="d-flex no-border-card mt-4"
        style="height: 60vh;"
      >
        <div
          class="d-flex align-items-center justify-content-center"
          style="width: 100%; height: 100%;"
        >
          <h2 class="text-center">{{ noQuestions }}</h2>
        </div>
      </card>
      <div
        v-for="(question, index) in listQuestions(data, currentQuestion, 1)"
        v-else
        :key="index"
        class="row"
      >
        <div class="col-lg-8 order2">
          <questions
            :question="question"
            :data="data"
            :selects="selects"
            :current-question="currentQuestion"
            @change-list-data="data = $event"
            @change-current-question="currentQuestion = $event"
            @removeItem="removeItem"
          ></questions>
        </div>

        <div class="col-lg-4">
          <accounts :selects="selects"></accounts>
          <actions :question="question"></actions>
        </div>
      </div>
    </client-only>
  </prd-page>
</template>

<script>
import Questions from '@/components/Questions/Questions'
import Accounts from '@/components/Questions/Accounts'
import Actions from '@/components/Questions/Actions'
import PrdPage from '~/components/shared/ProvendorPage'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Perguntas',
  components: {
    PrdPage,
    Actions,
    Questions,
    Accounts
  },
  layout: 'SidebarLayout',
  data() {
    return {
      noQuestions: 'Não há nenhuma pergunta',
      currentQuestion: 1,
      url: 'questions',
      selects: {
        salutation: '',
        farewell: '',
        accounts: '',
        selectSalutation: [
          {
            value: '',
            label: ''
          },
          { value: 'Olá GERALTOFRIVIA', label: 'Olá GERALTOFRIVIA' },
          {
            value: 'Bem vindo novamente GERALTOFRIVIA',
            label: 'Bem vindo novamente GERALTOFRIVIA'
          },
          {
            value: 'Olá GERALTOFRIVIA, em que posso ajudar?',
            label: 'Olá GERALTOFRIVIA, em que posso ajudar?'
          }
        ],
        selectFarewell: [
          {
            value: '',
            label: ''
          },
          {
            value: 'Aguardamos a sua compra! Geralt',
            label: 'Aguardamos a sua compra! Geralt'
          }
        ],
        selectAccount: [
          {
            value: 'Conta 1',
            label: 'Conta 1'
          },
          {
            value: 'Conta 2',
            label: 'Conta 2'
          },
          {
            value: 'Conta 3',
            label: 'Conta 3'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      data: state => state.questions.list,
      meta: state => state.questions.meta
    })
  },

  methods: {
    ...mapActions('questions', ['getList', 'removeItem']),
    async fetchQuestions() {
      try {
        await this.getList()
      } catch (err) {
        console.error(err)
      } finally {
        this.fullscreenLoading = false
      }
    },

    hasQuestions() {
      if (this.data.length === 0) return (this.questions = false)
      else return (this.questions = true)
    },

    listQuestions(question, currentQuestion, limitQuestion) {
      let result = []
      let totalPage = Math.ceil(question.length / limitQuestion)
      let count = currentQuestion * limitQuestion - limitQuestion
      let delimiter = count + limitQuestion

      if (currentQuestion <= totalPage) {
        for (let i = count; i < delimiter; i++) {
          if (question[i] != null) {
            result.push(question[i])
          }
          count++
        }
      }
      return result
    }
  }
}
</script>
<style scoped>
@media only screen and (max-width: 990px) {
  .order2 {
    order: 2;
  }
}
</style>
