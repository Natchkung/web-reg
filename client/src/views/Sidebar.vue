<template>
    <div class="h-screen fixed side-bar-visible bg-[#213550] text-center z-50" id="side-bar"
        :class="dataOpenSidebar == true ? 'side-bar-visible' : 'side-bar-close'" @mouseover="textbar = true"
        @mouseleave="textbar = false">
        <div class="w-full relative">
            <div class="logo m-auto mt-10"></div>
            <button @click="toggleShowbar">
                <i :class="{
                    'fa-regular fa-circle-dot': activebar,
                    'fa-regular fa-circle': !activebar,
                }" class="absolute top-[-15%] right-6 text-sky-500 text-lg cursor-pointer" v-show="textbar || activebar"></i>
            </button>
        </div>

        <div class="flex flex-col h-[calc(100vh-3rem)] text-lg mt-10">
            <!-- {{ userdata.token }} -->
            <div class="flex flex-col">
                <router-link to="/home">
                    <button class="active">
                        <i class="fa-solid fa-house"></i><span class="text-bar" v-show="textbar || activebar">หน้าแรก</span>
                    </button>
                </router-link>
                <router-link to="/login" v-show="!userdata.checkLogin">
                <button class="btn">
                    <i class="fa-solid fa-right-to-bracket"></i><span class="text-bar"
                        v-show="textbar || activebar">เข้าสู่ระบบ</span>
                </button>
            </router-link>
            <router-link to="/post" v-show="userdata.checkLogin">
                <button class="btn">
                    <i class="fa-solid fa-right-to-bracket"></i><span class="text-bar"
                        v-show="textbar || activebar">แบบฟอร์ม</span>
                </button>
            </router-link>
                <router-link to="/usermanual">
                    <button class="btn">
                        <i class="fa-regular fa-file-lines"></i><span class="text-bar"
                            v-show="textbar || activebar">คู่มือการใช้งาน</span>
                    </button>
                </router-link>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    props: {
        dataOpenSidebar: Boolean,
        dataChecklogin: Boolean
    },
    data() {
        return {
            activebar: false,
            textbar: false,
            userdata: {
                checkLogin: false,
                username: null,
                role: null
            }
        }
    },
    methods: {
        toggleShowbar() {
            this.activebar = !this.activebar;
            this.$emit('clickHambuger');
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
.logo {
    background-image: url("../assets/logo.png");
    height: 100px;
    width: 100px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

#side-bar {
    overflow: hidden;
    transition: 300ms;
}

.side-bar-visible {
    width: 250px !important;
}

.side-bar-visible:hover {
    width: 250px !important;
}

.side-bar-close {
    width: 90px !important;
}

.active {
    padding: 10px;
    width: 70%;
    margin: auto;
    margin-top: 0;
    margin-bottom: 0;
    background-color: #318CE7;
    border-radius: 5px;
}

.btn {
    margin-top: 1.75rem;
}

.text-bar {
    margin-left: 1rem;
}</style>