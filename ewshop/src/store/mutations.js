/*
 * @Author: your name
 * @Date: 2021-05-19 19:57:18
 * @LastEditTime: 2021-05-21 22:12:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewshop\src\store\mutations.js
 */
const mutations = {
    setIsLogin(state, payload) {
        state.user.isLogin = payload;
    },
    addCart(state, payload) {
        state.cartCount = payload.count;
    } 
}

export default mutations