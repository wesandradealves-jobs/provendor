const getState = () => ({
  list: [],
  sort: {
    field: 'createdAt',
    direction: 'desc'
  },
  meta: {
    pagination: {
      perPage: 50,
      currentPage: 1
    }
  },
  filters: []
})

export default getState
