import Vue from 'vue';
import Router from 'vue-router';
import Main from '../components/main.vue';

Vue.use(Router);

export default new Router({
    routes:[
        {
            path:'/',
            name:'index',
            component:Main
        },
        {
            path:'/:page_path',
            name:'main',
            component:Main
        }
    ]
})