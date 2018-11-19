// 获取数据

import http from './fetch';


export const login = (params) => http.post('/user/adminLogin', params);       // 登录接口

export const getUserLoginState = (params) => http.get('/user/currentAdmin', params);      // 获取用户登录状态接口

export const getUserList = (params) => http.get('/user/list', params);       // 获取用户列表接口接口

export const deleteUser= (params) => http.post('/user/batchDelete', params);     //删除用户接口接口

export const changeUserInfo= (params) => http.post('/user/update', params);      //修改单个用户数据接口

export const checkeUser= (status,params) => http.post(`/user/batchUpdateStatus?status=${status}`, params);      //批量审核用户接口  

export const setTask= (params) => http.post('/task/insert', params);      //修改单个用户数据接口

export const getTaskList = (params) => http.get('/task/list', params);       // 获取用户列表接口

export const deleteTask= (params) => http.postParam('/task/delete', params);      //删除单个任务接口

export const getOneTask = (params) => http.get('/task/findById', params);       // 获取单个任务接口

export const editOneTask = (params) => http.post('/task/update', params);       // 修改单个任务接口

export const getIndexNum = (params) => http.get('/record/getRecord', params);       // 获取首页数据接口

export const editIndexNum = (params) => http.post('/record/update', params);       // 修改首页数据接口

export const addIndexImg = (params) => http.post('/slide/insert', params);       // 添加首页轮播图接口

export const getIndexImg = (params) => http.get('/slide/list', params);       // 获取首页轮播图接口

export const deleteIndexImg= (params) => http.postParam('/slide/delete', params);      //删除首页轮播图接口

export const editIndexImg = (params) => http.post('/slide/update', params);       // 修改首页轮播图接口

export const setInform= (params) => http.post('/notice/insert', params);     //创建通知接口

export const getInform= (params) => http.get('/notice/list', params);     //获取通知接口

export const deleteInform= (params) => http.postParam('/notice/delete', params);      //删除通知接口

export const getInformDetail= (params) => http.get('/notice/findById', params);     //获取通知详情接口

export const editInform= (params) => http.post('/notice/update', params);     //修改通知接口

export const getFeedbackList = (params) => http.get('/feedback/list', params);       // 获取意见反馈图接口

export const deleteFeedback= (params) => http.post('/feedback/batchDelete', params);     //删除意见反馈图接口

export const getUserTaskList = (params) => http.get('/user/task/list', params);      // 获取用户任务列表接口

export const checkTask= (params) => http.postParam('/user/task/check', params);      //审核任务接口

export const deleteUserTask= (params) => http.postParam('/user/task/delete', params);      //删除用户提交的任务接口

export const getUserPutMomey = (params) => http.get('/withdraw/list', params);      // 获取用户提现申请列表接口

export const checkUserPutMomey = (params) => http.postParam('/withdraw/confirm', params);      // 审核用户提现申请接口

export const deleteUserPutMomey = (params) => http.postParam('/withdraw/delete', params);      // 删除用户提现数据接口 

export const getHomeNum = (params) => http.get('/record/getAdminRecord', params);      // 获取首页数据统计接口




