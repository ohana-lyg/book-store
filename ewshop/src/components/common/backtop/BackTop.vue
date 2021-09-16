<!--
 * @Author: your name
 * @Date: 2021-05-05 21:09:18
 * @LastEditTime: 2021-05-30 21:44:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewshop\src\components\common\backtop\BackTop.vue
-->
<template>
    <div class="backTop" @click="backtop">

    </div>
</template>

<script>
export default {
  name: "BackTop",
  setup(props, { emit }) {
    return {
      backtop: () => {
        emit('BTop');
      }
    }
  }
}
</script>

<style scoped>
.backTop {
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 80px;
    right: 10px;
    z-index: 20;
    box-shadow: 5px 5px 5px #888888;
    border-radius: 50%;
    background: #fcfcfc url('~assets/images/up.png') no-repeat center center;
}
</style>
