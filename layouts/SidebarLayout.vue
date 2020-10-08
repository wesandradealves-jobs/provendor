<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Gerenciar',
            icon: 'ni ni-ui-04 text-info'
          }"
        >
          <sidebar-item
            :link="{ name: 'produtos', path: '/admin/produtos' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'anuncios', path: '/admin/anuncios' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'perguntas', path: '/admin/perguntas' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'reclamações', path: '/admin/reclamacoes' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'mensagens', path: '/admin/mensagens' }"
          ></sidebar-item>
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Analisar',
            icon: 'ni ni-chart-pie-35 text-info'
          }"
        >
          <sidebar-item
            :link="{ name: 'indicadores', path: '/admin/indicadores' }"
          />
          <sidebar-item
            :link="{ name: 'projeção do mês', path: '/admin/projecao-do-mes' }"
          />
          <sidebar-item
            :link="{
              name: 'performace anuncios',
              path: '/admin/performace-anuncios'
            }"
          />
          <sidebar-item
            :link="{
              name: 'margens de lucro',
              path: '/admin/margens-de-lucro'
            }"
          />
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Concorrencia',
            icon: 'fas fa-trophy'
          }"
        >
          <sidebar-item
            :link="{ name: 'o que se vende', path: '/admin/o-que-se-vende' }"
          />
          <sidebar-item
            :link="{
              name: 'o que se procura',
              path: '/admin/o-que-se-procura'
            }"
          />
          <sidebar-item
            :link="{
              name: 'seguir concorrentes',
              path: '/admin/seguir concorrentes'
            }"
          />
          <sidebar-item
            :link="{
              name: 'comparar concorrentes',
              path: '/admin/comparar-concorrentes'
            }"
          />
          <sidebar-item
            :link="{
              name: 'comparador preços',
              path: '/admin/comparador-precos'
            }"
          />
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Configurar',
            icon: 'fas fa-cog'
          }"
        >
          <sidebar-item
            :link="{
              name: 'mensagens automaticas',
              path: '/admin/mensagens-automaticas'
            }"
          />
          <sidebar-item
            :link="{
              name: 'respondedor de perguntas',
              path: '/admin/respondedor-de-perguntas'
            }"
          />
          <sidebar-item
            :link="{ name: 'preferencias', path: '/admin/preferencias' }"
          />
          <sidebar-item
            :link="{
              name: 'gerenciar integrações ',
              path: '/admin/gerenciar-integracoes'
            }"
          />
        </sidebar-item>
      </template>

      <template slot="links-after">
        <hr class="my-3" />
        <h6 class="navbar-heading p-0 text-muted">
          Suporte
        </h6>

        <ul class="navbar-nav mb-md-3">
          <li class="nav-item">
            <a
              class="nav-link"
              href="/admin/manual-de-uso"
              target="_blank"
              rel="noopener"
            >
              <i class="fas fa-tasks" />
              <span class="nav-link-text">manual de uso</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/admin/abrir-ou-gerenciar-chamados"
              target="_blank"
              rel="noopener"
            >
              <i class="fas fa-headset" />
              <span class="nav-link-text">abrir ou gerenciar chamados</span>
            </a>
          </li>
        </ul>
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar
        :type="$route.name === 'alternative' ? 'light' : 'default'"
      />

      <div @click="$sidebar.displaySidebar(false)">
        <nuxt />
      </div>
      <content-footer v-if="!$route.meta.hideFooter" />
    </div>
  </div>
</template>
<script>
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`)
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className)
    }, 100)
  }
}

import DashboardNavbar from '~/components/layouts/argon/DashboardNavbar.vue'
import ContentFooter from '~/components/layouts/argon/ContentFooter.vue'

export default {
  components: {
    DashboardNavbar,
    ContentFooter
  },
  mounted() {
    this.initScrollbar()
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith('Win')
      if (isWindows) {
        initScrollbar('scrollbar-inner')
      }
    }
  }
}
</script>
<style lang="scss"></style>
