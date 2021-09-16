<!--
 * @Author: your name
 * @Date: 2021-05-15 21:01:24
 * @LastEditTime: 2021-05-20 22:43:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewshop\src\views\profile\Register.vue
-->
<template>
    <div>
        <nav-bar>
            <template v-slot:default>用户注册</template>
        </nav-bar>
        <div style="margin-top: 50px">
            <div style="taxt-align: center">
                <van-image
                    width="10rem"
                    height="10rem"
                    fit="contain"
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
                />
            </div>
            <van-form @submit="onSubmit">
                <van-field
                    v-model="name"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请输入密码' }]"
                />
                <van-field
                    v-model="password_confirmation"
                    type="password"
                    name="确认密码"
                    label="确认密码"
                    placeholder="请确认密码"
                    :rules="[{ required: true, message: '请再次输入密码' }]"
                />
                <van-field
                    v-model="email"
                    name="电子邮箱"
                    label="电子邮箱"
                    placeholder="请输入电子邮箱"
                    :rules="[{ required: true, message: '请填写电子邮箱' }]"
                />
                <div style="margin: 16px;">
                    <div class="link-login" @click="$router.push({path: '/login'})">
                        已有账号，立即登录
                    </div>
                    <van-button round block type="info" color="#42b983" native-type="submit">提交</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import { register } from '../../network/user';
import { Notify, Toast } from 'vant';
import { toRefs, reactive } from 'vue';
import { useRouter } from 'vue-router';
export default {
    name: 'Register',
    components: {
        NavBar
    },
    setup() {
        const router = useRouter();

        const userinfo = reactive({
            name: '',
            password: '',
            password_confirmation: '',
            email: ''
        })

        const onSubmit = () => {
            //先验证
            if(userinfo.password != userinfo.password_confirmation) {
                Notify('密码不一致');
            }
            else {
                //再提交给服务器
                register(userinfo).then(res => {
                    // console.log(res);
                    if(res.status == '201') {
                        Toast.success('注册成功');
                        setTimeout(() => {
                            router.push({path: '/login' });
                        }, 1000);
                    }
                    userinfo.password_confirmation = '';
                    userinfo.password = '';
                })
            }
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