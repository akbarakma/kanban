import Vue from 'vue';
import App from './App.vue';
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '691541468197-8e7tlujp0lvardka3e659gcjf1tcm8bq.apps.googleusercontent.com'
}
Vue.use(GAuth, gauthOption)


new Vue({
    render: createElement => createElement(App)
}).$mount('#app');