<template>
  <div class="col-xl-9">
    <card class="d-flex no-border-card">
      <div v-if="data[selected]" class="row">
        <div
          class="col-md-6 col-xl-4 px-0 scrollbar-light-blue"
          style="
            height: 900px;
            overflow-y: scroll;
            overflow-x: hidden;
            border-radius: 10px;
          "
        >
          <div v-for="(claim, index) in data" :key="index" class="px-2">
            <a
              :class="
                index === selected
                  ? 'd-flex flex-column p-2  bg-user-claim'
                  : 'd-flex flex-column p-2 '
              "
              @click="selectChat(index)"
            >
              <div class="claim pb-1">
                <div class="d-flex align-items-center">
                  <i class="fas fa-user"></i>
                  <h3 class="ml-2">{{ claim.order.buyerName }}</h3>
                  <img
                    v-show="claim.shipping.fulfilled"
                    src="~/assets/img/full.svg"
                    alt=""
                  />
                </div>
                <div>
                  <span class="badge badge-green-brand">{{
                    claim.claimsMessages.length
                  }}</span>
                </div>
              </div>
              <div class="d-flex align-items-center mt-1"></div>
              <p class="mt-1">
                {{ responseStatus(claim.status) }}
                {{ claim.deadline | formatDate }}
              </p>
            </a>
            <el-divider></el-divider>
          </div>
        </div>
        <div class="col-md-6 col-xl-8 pl-md-3 px-lg-auto">
          <div>
            <div
              class="d-flex justify-content-center mb-2 px-4 badge badge-green-brand"
            >
              {{ data[selected].messagesBeforeClaim }} mensagens antes da
              reclamação
            </div>
            <div
              class="d-flex justify-content-center mb-5 px-4 badge badge-green-brand"
            >
              {{ data[selected].order.buyerName }} abriu a primeira reclamação
              no dia
              {{ data[selected].claimsMessages[0].received | formatDate }}
            </div>
          </div>
          <div
            class="scrollbar-light-blue px-4"
            style="overflow-y: scroll; overflow-x: hidden; height: 480px;"
          >
            <div
              v-for="(item, index) in data[selected].claimsMessages"
              :key="index"
            >
              <div
                class="mb-1 pb-1"
                :style="
                  item.from === 'buyer'
                    ? 'display: flex; align-items: center'
                    : 'display: flex; justify-content: flex-end; text-align: right; margin-bottom: 5px paddinb-bottm: 5px; align-items: center'
                "
              >
                <strong>
                  {{ userChat(data[selected].order.buyerName, item.from) }}
                  <i class="far fa-clock mr-2 ml-2"></i>
                </strong>
                <p>{{ item.received | formatTime }}</p>
              </div>
              <div :style="item.from === 'buyer' ? '' : 'text-align: right;'">
                <em>{{ item.text }} </em>
              </div>
              <el-divider class="my-4"></el-divider>
            </div>
          </div>
          <div class="d-flex mt-4">
            <el-input
              id="exampleFormControlTextarea2"
              v-model="messageInputs.text"
              type="textarea"
              rows="3"
              placeholder="Digite qui..."
              :disabled="data[selected].openChat"
            >
            </el-input>
          </div>

          <div class="d-flex justify-content-end mt-3" style="width: 100%;">
            <el-button type="submit" class="" @click="sendMessage(data[0]._id)">
              Enviar
            </el-button>
          </div>
          <div v-show="data[selected].resolution" class="mt-4">
            <ul class="list-group">
              <li class="list-group-item resolution">
                <h3 style="color: #fff;">Reclamação Encerrada!</h3>
                <p class="mt-2">
                  <strong>{{ data[selected].resolution.reason }}</strong>
                </p>
                <p>
                  <strong>Data:</strong>
                  {{
                    data[selected].resolution.dateCreated
                      | formatDate({
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                  }}
                </p>
                <p>
                  <strong>Custo:</strong>
                  {{ data[selected].resolution.cost | formatPrice }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import { Divider, Button, Notification } from 'element-ui'
export default {
  name: 'Chatbox',
  components: {
    [Notification.name]: Notification,
    [Divider.name]: Divider,
    [Button.name]: Button
  },
  props: {
    data: {
      type: Array,
      default: null
    },
    selected: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      messageInputs: {
        text: ''
      }
    }
  },
  methods: {
    responseStatus(status) {
      if (status === 'finalizado') return `${status} no dia `
      else return `${status} até o dia `
    },

    userChat(user, from) {
      if (from === 'buyer') return user
      if (from === 'seller') return 'Provendor'
      if (from === 'mediator') return 'Mediador'
    },
    selectChat(index) {
      let changeSelected = this.selected
      changeSelected = index
      this.$emit('change-selected', changeSelected)
    },
    sendMessage(id) {
      this.$axios
        .$post(`/claims/message-claims`, {
          id: id,
          message: this.messageInputs.text
        })
        .then(res => {
          console.log(res.data)

          Notification.success({
            message: 'Menssagem enviada com sucesso',
            type: 'info'
          })
        })
        .catch(err => {
          console.error(err)

          Notification.error({
            message: 'Falha ao enviar mensagem',
            type: 'info'
          })
        })
      this.messageInputs.text = ''
    }
  }
}
</script>

<style scoped>
a {
  cursor: pointer;
}

p {
  margin: 0;
}

.scrollbar-light-blue::-webkit-scrollbar-track {
  box-shadow: initial;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border-radius: 10px;
}

.scrollbar-light-blue::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
}

.bg-user-claim {
  background: #f7fafc;
}

a:hover {
  background: #f7fafc;
}

.scrollbar-light-blue::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: initial;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #82b1ff;
}

.claim {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  margin: 0;
}

img {
  width: 80px;
}

.resolution {
  background: #60a99e;
  color: #fff;
}

.el-divider {
  margin: 0;
  padding: 0;
}
</style>
