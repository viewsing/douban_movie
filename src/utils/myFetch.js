import axios from 'axios';

/**
 * 请求数据，在sessionStorage有数据时有限从storage获取
 */
export default (url, options={}, noCache) => {
    let config = {
        method: 'get',
        url: url,
    }, localData;
    //因为豆瓣有请求限制，默认从sessionStorage取数据
    if (!noCache) {
        localData = JSON.parse(sessionStorage.getItem(url));
    }
    //第一次是没有数据的，要请求
    if (!localData) {
        config = Object.assign({}, config, options);
        const axiosInstance = axios.create();
        axiosInstance.interceptors.response.use(function (response) {
            sessionStorage.setItem( url, JSON.stringify(response.data) );
            return response.data;
        }, function (error) {
            // Do something with response error
            return Promise.reject(error);
        });
        return axiosInstance(config);
    //用已有数据创建一个promise
    } else {
        return new Promise(function(resolve, reject) {
            setTimeout(function(){
                resolve(localData);
            }, 2000)
        });
    }

}
