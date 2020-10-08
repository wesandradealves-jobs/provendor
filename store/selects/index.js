export const state = () => ({
  claimStatus: [
    {
      value: 'esperando sua resposta',
      label: 'Esperando sua resposta'
    },
    {
      value: 'esperando resposta do comprador',
      label: 'Esperando resposta do comprador'
    },
    {
      value: 'finalizado',
      label: 'Finalizado'
    },
    {
      value: 'esperando mediador',
      label: 'Esperando mediador'
    }
  ],
  ordersStatus: [
    {
      value: 'Alterar status',
      label: 'Alterar status'
    },
    {
      value: 'Nota fiscal',
      label: 'Nota fiscal'
    },
    {
      value: 'Impressões',
      label: 'Impressões'
    }
  ],
  filterStatus: [
    {
      value: 'posted',
      label: 'Postado'
    },
    {
      value: 'packed',
      label: 'Embalado'
    },
    {
      value: 'authorizated',
      label: 'Autorizado'
    }
  ],
  filterAdsStatus: [
    {
      value: 'ativo',
      label: 'Ativo'
    },
    {
      value: 'inativo',
      label: 'Inativo'
    }
  ]
})

export const mutations = {}

export const actions = {}

export const getters = {}
