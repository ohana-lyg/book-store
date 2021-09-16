/*
 * @Author: your name
 * @Date: 2021-04-27 20:14:47
 * @LastEditTime: 2021-05-04 17:53:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue3project\ewshop\src\network\home.js
 */
import instance from './request.js';

export  function getHomeAllData() {
    return instance({
        url: '/api/index',
    })
}

export  function getHomeGoods(type = 'sales', page = '1') {
    return instance({
        url: '/api/index?'+ type + '=1&page=' + page,
    })
}
