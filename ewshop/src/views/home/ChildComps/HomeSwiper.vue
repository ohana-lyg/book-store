<!--
 * @Author: your name
 * @Date: 2021-05-06 19:32:57
 * @LastEditTime: 2021-05-06 20:03:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewshop\src\views\home\ChildComps\HomeSwiper.vue
-->
<template>
    <van-swipe v-if="banners.length" class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in banners" :key="index">
            <img v-lazy="item.img_url" alt="">
        </van-swipe-item>
    </van-swipe>
</template>

<script>
export default {
    name: "HomeSwiper",
    props: {
        banners: Array,
        default() {
            return [];
        }
    }
}
</script>

<style scoped>
img {
    width: 100%;
    /* height: 200px; */
    height: auto ;
    /* margin-top: 45px; */
}
</style>