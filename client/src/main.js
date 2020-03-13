import Vue from 'vue';
import App from './App.vue';
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '691541468197-akoajlshfo4cvspfhu10l3q83cf2pj81.apps.googleusercontent.com'
}
Vue.use(GAuth, gauthOption)


new Vue({
    render: createElement => createElement(App)
}).$mount('#app');