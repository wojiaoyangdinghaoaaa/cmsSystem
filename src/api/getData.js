// 获取数据

import http from './fetch';


export const getUserList = (params) => http.get('/user/list', params);       // 获取用户列表接口

export const deleteUser= (params) => http.post('/user/batchDelete', params);     //删除用户接口   

export const changeUserInfo= (params) => http.post('/user/update', params);      //修改单个用户数据

export const checkeUser= (status,params) => http.post(`/user/batchUpdateStatus?status=${status}`, params);      //批量审核用户接口  

export const setTask= (params) => http.post('/task/insert', params);      //修改单个用户数据

// export const register = (params) => http.post('/user/register', params);      // 注册接口