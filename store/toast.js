export const state = () => ({
  opened: false,
  message: '',
  color: '',
  timeout: 6000
})

export const mutations = {
  open (state, data) {
    state.opened = true
    state.message = data.message
    state.color = data.color
    state.timeout = data.timeout
  },
  close (state) {
    state.opened = false
    state.message = ''
    state.color = ''
  }
}
