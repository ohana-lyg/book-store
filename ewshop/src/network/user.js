/*
 * @Author: your name
 * @Date: 2021-05-17 19:24:47
 * @LastEditTime: 2021-05-25 19:46:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit 
 * @FilePath: \ewshop\src\network\user.js
 */
import instance from './request.js';

export function register(data) {
    return instance ({
        url: '/api/auth/register',
        method: 'post',
        data
    })
}

export function login(data) {
    return instance ({
        url: '/api/auth/login',
        method: 'post',
        data
    })
}

export function logout() {
    return instance ({
        url: '/api/auth/logout',
        method: 'post',
    })
}

export function getuser() {
    return instance ({
        url: '/api/user',
    })
}