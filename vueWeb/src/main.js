// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  store from './store'

Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  if (to.path==='/') {
    next();
  }else {
    let token=localStorage.getItem('Authorization');
    console.log(token)
    if(token===null||token===""){
      next("/");
    }else {
      next();
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
})
