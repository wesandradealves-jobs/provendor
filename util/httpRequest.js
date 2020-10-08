export const mountQueryString = (sort, filters, meta) => {
  const queries = []
  queries.push(mountSort(sort))
  if (filters && filters.length > 0) {
    queries.push(mountFilter(filters))
  }
  queries.push(mountPaginationControl(meta))
  console.info(queries)
  return queries.join('&')
}

export const mountSort = sort => {
  return `orderByDirection=${sort.direction}&orderBy=${sort.field}`
}

export const mountFilter = filters => {
  return filters.map(filter => `filters[]=${JSON.stringify(filter)}`).join('&')
}

export const mountPaginationControl = meta => {
  return `page=${meta.pagination.currentPage}&limit=${meta.pagination.perPage}`
}
