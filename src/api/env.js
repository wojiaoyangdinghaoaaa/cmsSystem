/**
* 配置开发环境和线上环境之间的切换
*
* baseUrl: 请求地址
* url：本地请求地址
*
*/

let baseUrl = ''; //端口
// http://47.92.35.6:8080/api/user/register
let url = '47.92.35.6:8080/api'; //本地地址   

if (process.env.NODE_ENV == 'development') { //本地   

    baseUrl = 'http://'+url;

} else if(process.env.NODE_ENV == 'production') { //线上

    baseUrl = 'http://'+url;
}

export {
baseUrl
}