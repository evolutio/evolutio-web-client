export const state = {
  r: null
}

export const mutations = {
  SET_R (state, r) {
    state.r = r
  }
}

export const getters = {
  r (state) {
    return state.r
  },
}