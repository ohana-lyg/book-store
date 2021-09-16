<!--
 * @Author: your name
 * @Date: 2021-04-26 16:34:51
 * @LastEditTime: 2021-05-24 18:49:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue3project\ewshop\src\App.vue
-->
<template>
  <!-- <router-view v-solt="{ Component }">
    <transition>
      <keep-alive>
        <component :is="component" />
      </keep-alive>
    </transition>
  </router-view> -->

  <div>
    <router-view/>
    <div id="nav">
      <router-link class="tab-bar-item" to="/">
        <div class="icon"><i class="iconfont icon-biaoqiankuozhan_shouye-186"></i></div>
        <div>首页</div>
      </router-link> 
      <router-link class="tab-bar-item" to="/category">
        <div class="icon"><i class="iconfont icon-fenlei"></i></div>
        <div>分类</div>
      </router-link> 
      <router-link class="tab-bar-item" to="/shopcart">
        <div class="icon">
          <van-badge :content="$store.state.cartCount" max="9">
            <i class="iconfont icon-gouwuche1"></i>
          </van-badge>
        </div>
        <div>购物车</div>
        </router-link> 
      <router-link class="tab-bar-item" to="/profile">
        <div class="icon"><i class="iconfont icon-gerenzhongxin"></i></div>
        <div>我的</div>
        </router-link> 
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch('updateCart');
    })
  }
}
</script>

<style lang="scss">
@import "assets/css/base.css";
@import "assets/css/iconfont.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  // padding: 30px;
  background-color: #f6f6f6;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);

  a {
    font-weight: bold;
    color: var(--color-text);

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 50px;
    font-size:var(--font-size);
  }
  .tab-bar-item .icon {
    width: 24px;
    height: 24px;
    margin-top: 5px;
    vertical-align: middle;
    display: inline-block;
  }
}
</style>
