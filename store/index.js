export const state = {
    logged_user: {}
}

export const mutations = {
    SET_LOGGED_USER (state, logged_user) {
        state.logged_user = logged_user
    }
}

export const getters = {
  logged_user (state) {
    return state.logged_user
  },
}