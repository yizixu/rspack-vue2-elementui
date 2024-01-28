import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Select, Option } from 'element-ui'

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Option.name, Select)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
