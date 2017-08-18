export const state = {
    logged_user: {},
    location: '',
}

export const mutations = {
    SET_LOGGED_USER (state, logged_user) {
        state.logged_user = logged_user
    },
    SET_LOCATION (state, location){
        state.location = location;
    }
}

export const getters = {
  logged_user (state) {
    return state.logged_user
  },
  location(state){
    return state.location;
  }
}
