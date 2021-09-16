/*
 * @Author: your name
 * @Date: 2021-05-07 22:03:42
 * @LastEditTime: 2021-05-08 15:32:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewshop\src\network\category.js
 */
import instance from './request.js';

export  function getCategory() {
    return instance({
        url: '/api/goods',
    })
}

export  function getCategoryGoods(order = 'sales', cid = 0, page = 1) {
    return instance({
        url: '/api/goods?category_id=' + cid + '&page=' + page + '&' + order + '=1' ,
    })
}
