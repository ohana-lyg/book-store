/*
 * @Author: your name
 * @Date: 2021-04-27 20:14:59
 * @LastEditTime: 2021-05-23 20:12:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue3project\ewshop\src\network\cart.js
 */
import instance from './request';

//添加购物车
export function addCart(data) {
    return instance ({
        url: '/api/carts',
        method: 'post',
        data
    })
}

//修改购物车  data = {num : 1}
export function modifyCart(id, data) {
    return instance ({
        url: `/api/carts/${id}`,
        method: 'put',
        data
    })
}

//选择商品的状态 checked  所有选中的id
export function checkedCartshopping(data) {
    return instance ({
        url: '/api/carts/checked',
        method: 'patch',
        data
    })
}

//删除购物车
export function deleteCartItem(id) {
    return instance ({
        url: `/api/carts/${id}`,
        method: 'delete',
    })
}

//获取购物车列表
export function getCart(data = '') {
    return instance ({
        url: '/api/carts?' + data,
    })
}
