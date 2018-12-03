export const state = () => ({
  list: []
})

export const mutations = {
  add(state, product) {
    state.list.push(product)
  },
  emptyList(state) {
    state.list = []
  }
}

export const getters = {
  getById: (state) => (id) => {
    return state.list.find(product => product.id === id)
  },

  list: state => {
    return state.list
  },
  noDescription: state => {
    return state.list.filter(product => product.description.length === 0)
  },
  uniqueDescription: state => {
    return state.list.filter(product => product.uniqueDescription)
  },
  noAndUniqueDescription: state => {
    return state.list.filter(product => product.description.length === 0 && product.uniqueDescription)
  }

}
