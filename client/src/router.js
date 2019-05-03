import VueRouter from 'vue-router';

import EditDocument from './components/EditDocument.vue'
import NewDocument from './components/NewDocument.vue'


export default new VueRouter({
  routes: [
    {path: '/edit', component: EditDocument},
    {path: '/new', component: NewDocument}
  ]
});
