<template>
  <div class="main bg-default container-fluid px-6 d-flex align-items-center">
    <div class="row">
      <div class="col">
        <div
          class="d-flex align-items-center"
          style="width: 100%; height: 100%;"
        >
          <img class="" src="../../static/img/brand/logo.png" alt="" />
        </div>
      </div>
      <div class="col">
        <div class="flex-column">
          <h2 class="text-center">
            Foi criado um reset para sua senha com sucesso
          </h2>
          <div class="d-flex justify-content-center py-4" style="width: 100%;">
            <img src="../../static/img/gif/send.gif" alt="" />
          </div>
          <h3 class="text-center">
            Para confirmar, verifique seu email e acesse o link para finalizar a
            alteração da sua senha
          </h3>
          <p class="text-center">
            Se você não vê, verifique a pasta SPAM, pois às vezes nosso email de
            ativação de aticação fica preso lá :)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      layoutClass() {
        let exceptions = ['index', 'home']
        if (!exceptions.includes(this.$route.name)) {
          return 'bg-default'
        } else {
          return ''
        }
      }
    }
  }
}
</script>

<style scoped>
h1,
h2,
h3 {
  text-transform: uppercase;
  color: #fff;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.5rem;
}

h3 {
  font-size: 1.2rem;
}

p {
  color: #fff;
}

.title {
  font-weight: 900;
  text-align: center;
}
img {
  margin: 0;
}

.main {
  height: 100vh;
  width: 100vw;
}
</style>
