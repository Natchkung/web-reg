<template>
  <div class="w-full h-full flex">
    <Sidebar :dataOpenSidebar="openSidebar" @clickHambuger="toggleSidebar" />
    <div class="main h-full mr-5" :class="openSidebar == true ? 'sidebar-space-visible' : 'sidebar-space-close'">
      <headerTop />
      <div class="w-full h-[clac(100vh-50px)]">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import headerTop from '../../views/headerTop.vue'
import Sidebar from '../../views/Sidebar.vue'
export default {
  name: 'Master',
  components: {
    Sidebar,
    headerTop
  },
  data() {
    return {
      openSidebar: false,
    }
  },
  methods: {
    toggleSidebar() {
      this.openSidebar = !this.openSidebar
    },
  }
}
</script>

<style>
.sidebar-space-visible {
  margin-left: 280px;

}

.sidebar-space-close {
  margin-left: 110px;

}

.main {
  transition: 300ms;
  width: 100% !important;
}
</style>