<template>
    <div v-if="authtoken">
        <!-- Sidebar Content -->
        <div class="card flex justify-content-center">
            
        </div>

        <nav class="w-[80%] h-[60px] m-auto bg-[#213550] p-2 flex align-center justify-start rounded-lg mt-7">
            <Button icon="pi pi-bars" @click="sidebaropen = true" />
            <span class="mt-2 text-lg font-bold pl-5">ระบบงานเก็บข้อมูล</span>
    </nav>


        <!-- Page Content -->
        <div
            class="w-[80%] h-full m-auto">
            <POST :auth="page.Post" v-show="page.Post" @token-timeout="tokentimeout"/>
            <VIEWEDIT :auth="page.ViewEdit"  v-show="page.ViewEdit" ref="ViewEdit" @token-timeout="tokentimeout"/>
            <USERMANUAL :auth="page.UserManual" v-show="page.UserManual"  />
        </div>
    </div>
    <div v-else>
        <div class="w-full h-full text-center mt-[350px]">
            <h1 class="text-4xl text-[#e72727] font-bold">คุณยังไม่ได้เข้าสู่ระบบ !!</h1>
            <h1 class="text-lg mt-5">กรุณาคลิกเพื่อเข้าสู่ระบบ</h1>
            <router-link class-active="active" to="/"><button type="button"
                    class="w-[10%] h-[50px] mt-5 rounded-md bg-sky-500 duration-500 hover:text-black"><i
                        class="fa-solid fa-right-to-bracket mr-3"></i>เข้าสู่ระบบ</button></router-link>
        </div>
    </div>
</template>
 
<script>
import POST from "../components/POST/POST.vue";
import VIEWEDIT from "../components/ViewEdit/ViewEdit.vue";
import USERMANUAL from "../components/UserManual/UserManual.vue";
export default {
    name: "dashboard",
    components: {
        POST,
        VIEWEDIT,
        USERMANUAL
    },
    data() {
        return {
            sidebaropen: false,
            authtoken: '',
            activeBtn: 'btn1',
            page: {
                Post: true,
                ViewEdit: false,
                UserManual: false
            }
        };
    },
    methods: {
        toggle() {
            this.open = !this.open;
        },
        showPagePost() {
            this.activeBtn = 'btn1'
            this.page.UserManual = false
            this.page.Post = true
            this.page.ViewEdit = false
        },
        showPageViewEdit() {
            this.activeBtn = 'btn2'
            this.page.Post = false
            this.page.UserManual = false
            this.page.ViewEdit = true
            this.$refs.ViewEdit.refresh()
        },
        showPageUserManual() {
            this.activeBtn = 'btn3'
            this.page.Post = false
            this.page.ViewEdit = false
            this.page.UserManual = true
        },
        tokentimeout(){
            this.$router.push({path: '/'})
        },
    },
    created() {
        this.authtoken = localStorage.getItem('authtoken')
    }
};
</script>
 
<style >
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease-out;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.logo {
    background-image: url("../assets/logo.png");
    height: 100px;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.active {
    background-color: #318CE7;
}
</style>