import Vue from 'vue'
import App from './index.vue'
import router from './router/index_router'

//关闭生产环境下的提示
Vue.config.productionTip = false;

new Vue({
    el:'#app',
    router,
    template:'<App />',
    components:{App}
})