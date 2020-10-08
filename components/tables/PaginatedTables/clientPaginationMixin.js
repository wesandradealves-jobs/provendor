import Fuse from 'fuse.js'

export default {
  computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    queriedData() {
      let result = this.tableData
      if (this.searchedData.length > 0) {
        result = this.searchedData
      } else {
        if (this.searchQuery) {
          result = []
        }
      }

      return result.slice(this.from, this.to)
    },
    to() {
      let highBound = this.from + this.pagination.perPage
      if (this.total < highBound) {
        highBound = this.total
      }
      return highBound
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1)
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length
    }
  },
  data() {
    return {
      pagination: {
        perPage: 50,
        currentPage: 1,
        perPageOptions: [50, 75, 100],
        total: 0
      },
      searchQuery: '',
      searchFilter: null,
      searchedData: [],
      fuseSearch: null,
      url: ''
    }
  },
  methods: {
    sortChange({ prop, order }) {
      if (prop) {
        this.tableData.sort((a, b) => {
          let aVal = a[prop]
          let bVal = b[prop]
          if (order === 'ascending') {
            return aVal > bVal ? 1 : -1
          }
          return bVal - aVal ? 1 : -1
        })
      } else {
        this.tableData.sort((a, b) => {
          return a.id - b.id
        })
      }
    }
  },
  beforeUpdate() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ['name', 'email'],
      threshold: 0.3
    })
  },
  watch: {
    /**
     * Searches through the table data by a given query.
     * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
     * @param value of the query
     */

    searchFilter: {
      handler: async function (searchFilter) {
        let searchUrl = ''
        let first = true
        for (const key in searchFilter) {
          // eslint-disable-next-line no-prototype-builtins
          if (searchFilter.hasOwnProperty(key) && searchFilter[key] != '') {
            if (first) {
              searchUrl += `${key}=${searchFilter[key]}`
              first = false
            } else {
              searchUrl += `&${key}=${searchFilter[key]}`
            }
          }
        }

        searchUrl = searchUrl.replace('+', ' ').toLowerCase()

        const config = {
          headers: {
            Accept: 'application/json'
          }
        }
        try {
          const res = await this.$axios.$get(
            `${this.url}/search?${searchUrl}`,
            config
          )
          this.searchedData = res.data
        } catch (err) {
          console.log(err)
        }
      },
      deep: true
    }
  }
}
