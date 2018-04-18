import Vue from 'vue';
import App from './App';
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false;

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  // loading: 'dist/loading.gif',
  attempt: 1
});

new Vue({
    el: '#app',
    components: { App },
    template:   '<App/>'
});




