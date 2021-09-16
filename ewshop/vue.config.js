/*
 * @Author: your name
 * @Date: 2021-04-27 17:13:01
 * @LastEditTime: 2021-04-27 21:39:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue3project\ewshop\vue.config.js
 */
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'network': '@/network',
                'utils': '@/utils',
                'views': '@/views',
            }
        }
    },
    publicPath: './',
}