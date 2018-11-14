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
                    path: '/images',
                    component: resolve => require(['../components/page/Images.vue'], resolve),
                    meta: { title: '轮播图' }
                },
                {
                    path: '/addimage',
                    component: resolve => require(['../components/page/AddImage.vue'], resolve),
                    meta: { title: '添加轮播图' }
                },
               
               
                {
                  path:'/userwithdrawal',
                  component:resolve => require(['../components/page/UserWithdrawal.vue'],resolve),
                  meta: { title: '用户提现'}
                },
                
                {
                    path:'/usermanagement',
                    component:resolve => require(['../components/page/UserManagement.vue'],resolve),
                    meta: { title: '用户管理'}
                  },
                
                {
                    path:'/checkTask',
                    component:resolve => require(['../components/page/CheckTask.vue'],resolve),
                    meta: { title: '任务审核'}
                  },
                
                  {
                    path:'/releaseatask',
                    component:resolve => require(['../components/page/ReleaseATask.vue'],resolve),
                    meta: { title: '发布任务'}
                  },
                  {
                    path:'/taskmanagement',
                    component:resolve => require(['../components/page/TaskManagement.vue'],resolve),
                    meta: { title: '任务管理'},
                    // children:[

                    // ]
                  },
                  {
                    path:'/systemnotice',
                    component:resolve => require(['../components/page/SystemNotice.vue'],resolve),
                    meta: { title: '系统公告'}
                  },
                  {
                    path:'/announce',
                    component:resolve => require(['../components/page/Announce.vue'],resolve),
                    meta: { title: '发布公告'}
                  },
                  {
                    path:'/feedback',
                    component:resolve => require(['../components/page/Feedback.vue'],resolve),
                    meta: { title: '意见反馈'}
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
