<template>
    <div class="w-full">
        <nav class="w-full h-[60px] m-auto bg-[#213550] p-2 flex align-center justify-between rounded-lg my-5">
      <span class="mt-2 text-lg font-bold pl-5">ระบบสารสนเทศเพื่องานเก็บข้อมูล</span>
      <ul class="flex flex-wrap gap-4 justify-center items-center">
        <li class="pr-2">
          <router-link to="/login" v-show="!userdata.checkLogin">
          <button
            class="p-2 bg-sky-500 rounded-lg text-sm hover:shadow-lg duration-500 hover:shadow-sky-500/50">เข้าสู่ระบบ
          </button>
        </router-link>
          <button v-show="userdata.checkLogin" @click="refreshpage()"
            class="p-2 bg-sky-500 rounded-lg text-sm hover:shadow-lg duration-500 hover:shadow-sky-500/50">ออกจากระบบ
          </button>
        </li>
      </ul>
    </nav>
    </div>
  
</template>

<script>
export default {
    name: 'headerTop',
    data() {
        return {
            userdata: {
                checkLogin: false,
                username: null,
                role: null
            }
        }
    },
    methods:{
      refreshpage(){
        localStorage.clear()
        location.replace('/home')
      }
    },
    created(){
    this.userdata.checkLogin = localStorage.getItem('checkLogin')
    this.userdata.username = localStorage.getItem('username')
    this.userdata.username = localStorage.getItem('username')
  }
}
</script>

<style>

</style>