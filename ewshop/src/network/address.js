/*
 * @Author: your name
 * @Date: 2021-05-27 20:32:12
 * @LastEditTime: 2021-05-27 21:53:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewshop\src\network\address.js
 */
import instance from './request.js';

//添加地址
export function ADDaddress(params) {
    return instance({
        url: '/api/address',
        method: 'post',
        params
    })
}

//编辑地址(更新地址)
export function Editaddress(id, params) {
    return instance({
        url: `/api/address/${id}`,
        method: 'put',
        params
    })
}

//删除地址
export function Deleteaddress(id) {
    return instance({
        url: `/api/address/${id}`,
        method: 'delete',
    })
}

//地址列表
export function getaddresslist() {
    return instance({
        url: '/api/address',
    })
}

//地址详情
export function getaddressdetail(id) {
    return instance({
        url: `/api/address/${id}`,
    })
}