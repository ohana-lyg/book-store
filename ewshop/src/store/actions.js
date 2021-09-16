/*
 * @Author: your name
 * @Date: 2021-05-19 19:56:48
 * @LastEditTime: 2021-05-21 22:18:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewshop\src\store\actions.js
 */
import { getCart } from '../network/cart';

const actions = {
    updateCart({commit}) {
        getCart().then(res => {
            commit('addCart', {count: res.data.length || 0});
        })
    }
}

export default actions