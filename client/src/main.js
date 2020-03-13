import Vue from 'vue';
import App from './App.vue';
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '3709380928-t23aavhno1rvnm0lkukgtrke3d50vaq7.apps.googleusercontent.com'
}
Vue.use(GAuth, gauthOption)


new Vue({
    render: createElement => createElement(App)
}).$mount('#app');