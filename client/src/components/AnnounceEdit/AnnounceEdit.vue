<template>
    <div class="w-full h-full" v-if="userdata.role == 'admin' && userdata.checkLogin">
        <div class="header"><span class="text-2xl">แก้ไขประกาศ | </span>
            <router-link to="/home" class="text-sky-500">หน้าแรก</router-link>
            <span class="text-zinc-300"> > แก้ไขประกาศ</span>
        </div>
        <div class="w-full bg-[#19273a] rounded-lg mt-5">
            <div class="announce w-[90%] h-full m-auto py-5">
                <div class="announce-item flex justify-between items-center" v-for="item in announce" :key="item">
                    <div class="flex flex-wrap gap-2 w-[90%] flex-col">
                        <input type="text" v-model="item.title" class="w-auto bg-transparent text-sky-500">
                        <input type="text" v-model="item.announcelink" class="w-auto bg-transparent text-red-100">
                        <input type="text" v-model="item.detail" class="w-auto bg-transparent text-red-100">
                        <div>
                            <span class="font-bold text-red-200">ประกาศโดย </span><input type="text"
                                v-model="item.announceby" class="w-auto bg-transparent text-red-100">
                        </div>
                        <div>
                            <span class="font-bold text-violet-300">วันที่ประกาศ </span><input type="text"
                                v-model="item.announcetimes" class="w-auto bg-transparent text-red-100">
                        </div>
                    </div>
                    <!-- <div>
                        <h4><a :href="item.announcelink" target="_blank"> {{item.title}}</a> </h4>
                        <ul>
                        <li>{{item.detail}}</li>
                        <li><span class="font-bold text-red-200">ประกาศโดย </span>{{item.announceby}}</li>
                        <li><span class="font-bold text-violet-300">วันที่ประกาศ </span>{{ item.announcetimes }}</li>
                        </ul>
                    </div> -->
                    <div class="flex flex-warp gap-2">
                        <button class="p-2 bg-sky-500 rounded-md">Edit</button>
                        <button class="p-2 bg-red-500 rounded-md">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <button class="w-[70px] h-[70px] bg-[#1e3658] fixed bottom-10 right-10 rounded-full flex items-center justify-center">
            <i class="fa-solid fa-pen-to-square text-sky-400 font-bold text-2xl hover:text-white duration-300"></i>
        </button>

    </div>


    <div v-else>
        <div class="w-full h-full text-center mt-[350px]">
            <h1 class="text-4xl text-[#e72727] font-bold">คุณไม่สามารถใช้งานหน้านี้ได้ !!</h1>
            <h1 class="text-lg mt-5">กรุณาคลิกเพื่อกลับไปหน้าหลัก</h1>
            <router-link to="/home"><button type="button"
                    class="w-[10%] h-[50px] mt-5 rounded-md bg-sky-500 duration-500 hover:text-black"><i
                        class="fa-solid fa-right-to-bracket mr-3"></i>หน้าแรก</button></router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'AnnounceEdit',
    data() {
        return {
            announce: [],
            userdata: {
                checkLogin: false,
                username: null,
                role: null
            }
        }
    },
    methods: {
        getAnnounce() {
            axios.get('http://localhost:3000/api/announce')
                .then((response) => {
                    if (response) {
                        this.announce = response.data
                    }

                }).catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                    }
                })
        }
    },
    created() {
        this.getAnnounce()
        this.userdata.checkLogin = localStorage.getItem('checkLogin')
        this.userdata.username = localStorage.getItem('username')
        this.userdata.role = localStorage.getItem('role')
    }
}
</script>

<style></style>