<template>
  <prd-page :fetch="fetchMessages">
    <template v-slot:filters>
      <prd-filter-list>
        <h3>Buscar</h3>
        <prd-filter-text
          placeholder="Buscar por nome, nickname ou Nfe"
          :kinds="kindsFilterText"
          @addFilter="addFilter"
        />
      </prd-filter-list>
    </template>
    <div class="card chat-room">
      <div class="card-body">
        <!-- Grid row -->
        <div class="row px-lg-2 px-2">
          <!-- Grid column -->
          <div class="col-md-6 col-xl-4 px-0">
            <div
              class="white z-depth-1 px-2 pt-3 pb-0 members-panel-1 scrollbar-light-blue"
            >
              <ul class="list-unstyled friend-list">
                <li
                  v-for="(item, index) in data"
                  :key="index"
                  class="p-2"
                  :class="{ 'bg-secondary': index === selected }"
                >
                  <a
                    class="d-flex justify-content-between"
                    @click="selectChat(index)"
                  >
                    <img
                      :src="item.picture"
                      alt="avatar"
                      class="avatar rounded-circle d-flex align-self-center mr-2 z-depth-1"
                    />
                    <div class="text-small">
                      <strong>{{ item.name }} </strong>
                      <p class="last-message text-muted">
                        <!-- {{ item.messages[0].text }} -->
                      </p>
                    </div>
                    <div class="chat-footer">
                      <p class="text-smaller text-muted mb-0" />
                      <span class="badge badge-danger float-right">1</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Grid column -->

          <!-- Grid column -->

          <div class="col-md-6 col-xl-8 pl-md-3 px-lg-auto px-0">
            <div class="chat-message">
              <ul
                v-if="data[selected]"
                class="list-unstyled chat-1 scrollbar-light-blue"
              >
                <li
                  v-for="(item, index) in data[selected].messages"
                  :key="index"
                  class="d-flex justify-content-between mb-4"
                >
                  <img
                    src="https://mdbootstrap.com/img/Photos/Avatars/avatar-6.jpg"
                    alt="avatar"
                    class="avatar rounded-circle mr-2 ml-lg-3 ml-0 z-depth-1"
                  />
                  <div class="chat-body p-3 ml-2 z-depth-1">
                    <div class="header">
                      <strong class="primary-font">comprador </strong>
                      <small class="pull-right text-muted">
                        <i class="far fa-clock" />
                        {{ item.received | formatTime }}
                      </small>
                    </div>
                    <hr class="w-100" />
                    <p class="mb-0">
                      {{ item.text }}
                    </p>
                  </div>
                </li>
              </ul>
              <div class="white d-flex flex-column">
                <div class="form-group basic-textarea mh-75 d-flex">
                  <textarea
                    id="exampleFormControlTextarea2"
                    v-model="messageInputs.text"
                    class="form-control pl-2 my-0"
                    placeholder="Digite aqui..."
                  />
                </div>
                <div class="mh-25">
                  <dropzone-file-upload
                    v-model="messageInputs.attachments"
                    multiple
                    url="http://localhost:8080/messages/attachment"
                  />
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-outline-pink btn-rounded btn-sm waves-effect waves-dark float-right"
              >
                Enviar
              </button>
            </div>
          </div>

          <!-- Grid column -->
        </div>
        <!-- Grid row -->
      </div>
    </div>
  </prd-page>
</template>
<script>
import DropzoneFileUpload from '@/components/argon-core/Inputs/DropzoneFileUpload'
import PrdFilterText from '@/components/shared/filters/FilterText'
import clientPaginationMixin from '~/components/tables/PaginatedTables/clientPaginationMixin'
import { Select, Option } from 'element-ui'
import PrdPage from '~/components/shared/ProvendorPage'
import PrdFilterList from '@/components/shared/filters/FilterList'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    PrdFilterList,
    PrdFilterText,
    PrdPage,
    DropzoneFileUpload,
    [Select.name]: Select,
    [Option.name]: Option
  },
  mixins: [clientPaginationMixin],
  layout: 'SidebarLayout',

  data() {
    return {
      kindsFilterText: {
        number: ['sku'],
        text: ['name']
      },
      //declarar valores default em tableData aqui só é necessario ate implementar a store
      // data: [{ messages: [{ received: 'sds', text: 'adsasd' }] }],
      selected: 0,
      searchFilter: { status: ['nao lidas'], typedStr: '' },
      messageInputs: {
        text: '',
        attachments: []
      },
      selects: [
        { value: 'todas', label: 'todas' },
        { value: 'nao lidas', label: 'não lidas' },
        { value: 'lidas e nao respondidas', label: 'lidas e não respondidas' }
      ]
    }
  },
  computed: {
    ...mapState({
      data: state => state.messages.list
    })
  },
  mounted() {},
  methods: {
    ...mapActions('messages', [
      'getList',
      'addFilter',
      'changeSort',
      'changePage',
      'changeRowPerPage',
      'clearFilters'
    ]),
    async fetchMessages() {
      try {
        await this.getList()
      } catch (err) {
        console.error(err)
      } finally {
        this.fullscreenLoading = false
      }
    },
    selectChat(index) {
      this.selected = index
    },

    async onSubmit() {},

    addTypedQuery(text) {
      this.searchFilter.typedStr = text
    }
  }
}
</script>
<style>
.card.chat-room .members-panel-1,
.card.chat-room .chat-1 {
  position: relative;
  overflow-y: scroll;
}

.card.chat-room .members-panel-1 {
  height: 570px;
}

.card.chat-room .chat-1 {
  height: 495px;
}

.card.chat-room .friend-list li {
  border-bottom: 1px solid #e0e0e0;
}
.card.chat-room .friend-list li:last-of-type {
  border-bottom: none;
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

.scrollbar-light-blue::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: initial;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #82b1ff;
}

a {
  cursor: pointer;
}
</style>
