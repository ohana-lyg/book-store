/*
 * @Author: your name
 * @Date: 2021-05-30 20:36:04
 * @LastEditTime: 2021-06-01 20:27:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewshop\src\network\order.js
 */
import instance from './request.js';

//创建订单
export function CreateOrder(params) {
    return instance({
        url: '/api/orders',
        method: 'post',
        params
    })
}

//获取订单预览
export function getOrderPreview() {
    return instance({
        url: '/api/orders/preview',
    })
}

//订单支付 获取二维码
export function PayOrder(order, params) {
    return instance({
        url: `/api/orders/${order}/pay`,
        params
    })
}

//订单状态
export function Orderstatus(order) {
    return instance({
        url: `/api/orders/${order}/status`,
    })
}

//获取订单列表
export function getOrderlist(params) {
    return instance({
        url: '/api/orders',
        params
    })
}

//获取订单详情
export function getOrderDetail(order) {
    return instance({
        url: `/api/orders/${order}`,
        order: {
            include: 'user, orderDetails.goods'
        }
    })
}

//确认订单(确认收货)
export function confirmOrder(order) {
    return instance({
        url: `/api/orders/${order}/confirm`,
        method: 'patch'
    })
}

//获取物流信息
export function viewExpress(order) {
    return instance({
        url: `/api/orders/${order}/express`,
    })
}