<!--
 * @Author: your name
 * @Date: 2021-04-26 16:34:51
 * @LastEditTime: 2021-05-02 21:50:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue3project\ewshop\src\views\Home.vue
-->
<template>
  <div class="home">
    {{ banner }}
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getHomeAllData } from '@/network/home';

export default {
  name: 'Home',
  setup() {
    const banner = ref([]);

    onMounted(() => {
      getHomeAllData().then(res => {
        banner.value = res.slides;
      }).catch (err => {
        console.log(err);
      })
    })

    return {
      banner,
    }
  },
  components: {

  }
}
</script>
<style>
  #demo {
    background: url('~assets/images/3.png') no-repeat;
    width: 100px;
    height: 100px;
  }
</style>
