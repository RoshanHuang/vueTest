import Router from 'vue-router'
import Index from '../views/index/index'
import Manage from '../views/manage/index'
import Vue from 'vue'
import $ from 'jquery'
import  'bootstrap/dist/css/bootstrap.min.css'
import  'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import Validator from 'vue-validator';
Vue.use(Validator);
import VueResource from 'vue-resource'
Vue.use(VueResource)
import axios from 'axios';
axios.defaults.headers.post['Content-Type']='text/plain'
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(Router)
Vue.use($)

const router=new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/manage',
      name:'Manage',
      component: Manage
    }
  ]
})
export  default  router;
