import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/homeadministration',
                    component: resolve => require(['../components/page/HomeAdministration.vue'], resolve),
                    meta: { title: '首页管理' }
                },
               
               
                {
                  path:'/userwithdrawal',
                  component:resolve => require(['../components/page/UserWithdrawal.vue'],resolve),
                  meta: { title: '用户提现'}
                },
                
                {
                    path:'/usermanagement',
                    component:resolve => require(['../components/page/UserManagement.vue'],resolve),
                    meta: { title: '管理'}
                  },
                
                  {
                    path:'/releaseatask',
                    component:resolve => require(['../components/page/ReleaseATask.vue'],resolve),
                    meta: { title: '发布任务'}
                  },
                  {
                    path:'/taskmanagement',
                    component:resolve => require(['../components/page/TaskManagement.vue'],resolve),
                    meta: { title: '任务管理'}
                  },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
