<!--
 * @Author: your name
 * @Date: 2021-05-15 21:01:24
 * @LastEditTime: 2021-05-24 21:49:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewshop\src\views\profile\Login.vue
-->
<template>
    <div>
        <nav-bar>
            <template v-slot:default>用户登录</template>
        </nav-bar>
        <div style="margin-top: 50px">
            <div style="taxt-align: center">
                <van-image
                    width="10rem"
                    height="10rem"
                    fit="contain"
                    :src="require('@/assets/images/Mall-logo.png')"
                />
            </div>
            <van-form @submit="onSubmit">
                <van-field
                    v-model="email"
                    name="电子邮箱"
                    label="电子邮箱"
                    placeholder="请输入电子邮箱"
                    :rules="[{ required: true, message: '请填写电子邮箱' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请输入密码' }]"
                />
                <div style="margin: 16px;">
                    <div class="link-login" @click="$router.push({path: '/register'})">
                        没有账号，立即注册
                    </div>
                    <van-button round block type="info" color="#42b983" native-type="submit">提交</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import { login } from '../../network/user';
import { Toast } from 'vant';
import { toRefs, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
    name: 'Login',
    components: {
        NavBar
    },
    setup() {
        const router = useRouter();
        const store = useStore();

        const userinfo = reactive({
            email: '',
            password: '',
        })

        const onSubmit = () => {
           login(userinfo).then(res => {
               //将token保存到本地 window.localStorage  找：setItem(key, value)   getItem(key)
               window.localStorage.setItem('token', res.access_token);
               //在vuex  isLogin
               store.commit('setIsLogin', true);


               Toast.success('登录成功');
               userinfo.password = '';
               userinfo.email = '';
               setTimeout(() => {
                   router.push({path: '/home'});
               }, 500);
           })
        }

        return {
            onSubmit,
            ...toRefs(userinfo),
        }
    }
    
}
</script>

<style scoped>
.link-login {
    font-size: 14px;
    margin-bottom: 15px;
    color: orangered;
    /* display: inline-block; */
    text-align: left;
    /* float: left; */
}
</style>