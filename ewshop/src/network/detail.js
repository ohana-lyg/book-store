/*
 * @Author: your name
 * @Date: 2021-05-12 20:30:33
 * @LastEditTime: 2021-05-12 20:38:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewshop\src\network\detail.js
 */
import instance from './request.js';

export function getDetail(id) {
    return instance({
        url: '/api/goods/' + id,
    })
}