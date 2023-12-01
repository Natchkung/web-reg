<template>
    <div class="w-full h-full" v-if="userdata.role == 'admin' && userdata.checkLogin">
        <div class="header"><span class="text-2xl">แก้ไขประกาศ | </span>
            <router-link to="/home" class="text-sky-500">หน้าแรก</router-link>
            <span class="text-zinc-300"> > แก้ไขประกาศ</span>
        </div>
        <div class="w-full bg-[#19273a] rounded-lg mt-5">
            <div class="announce w-[90%] h-full m-auto py-5">
                <div class="announce-item flex justify-between items-center" v-for="item in announce" :key="item">
                    <div>
                        <h4><a :href="item.announcelink" target="_blank"> {{item.title}}</a> </h4>
                        <ul>
                        <li>{{item.detail}}</li>
                        <li><span class="font-bold text-red-200">ประกาศโดย </span>{{item.announceby}}</li>
                        <li><span class="font-bold text-violet-300">วันที่ประกาศ </span>{{ item.announcetimes }}</li>
                        </ul>
                    </div>
                    <div class="flex flex-warp gap-2">
                        <button class="p-2 bg-sky-500 rounded-md" @click="Showeditannounce(item._id)">Edit</button>
                        <button class="p-2 bg-red-500 rounded-md" @click="DeleteAnnounce(item)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <button class="w-[70px] h-[70px] bg-[#1e3658] fixed bottom-10 right-10 rounded-full flex items-center justify-center" @click="showcreateannounce = !showcreateannounce">
            <i class="fa-solid fa-pen-to-square text-sky-400 font-bold text-2xl hover:text-white duration-300"></i>
        </button>

        <div class="w-[50%] bg-[#1e3658] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden z-50" v-show="showcreateannounce">
            <div class="w-full bg-sky-500 h-[10%] text-bold text-white text-lg flex items-center gap-3 p-4 pl-5">
                <i class="fa-solid fa-bullhorn text-xl"></i>สร้างประกาศสาธารณะ
            </div>
        <form class="w-full flex justify-center items-center flex-col gap-3 mt-7 p-5" @submit.prevent="createAnnounce">
                <div class="w-[40%]">
                    <label class="mr-5">หัวข้อประกาศ</label>
                    <input type="text" ref="personalID"
                        class="w-full p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                        required v-model="postannounce.title"/>
                </div>
                <div class="w-[40%]">
                    <label class="mr-5">รายละเอียดประกาศ</label>
                    <input type="text" ref="personalID"
                        class="w-full p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                        required v-model="postannounce.detail"/>
                </div>
                <div class="w-[40%]">
                    <label class="mr-5">ลิงค์ประกาศ</label>
                    <input type="text" ref="personalID"
                        class="w-full p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                        required v-model="postannounce.announcelink"/>
                </div>
                <div class="w-[40%]">
                    <label class="mr-5">ประกาศโดย</label>
                    <input type="text" ref="personalID"
                        class="w-full p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                        required v-model="postannounce.announceby"/>
                </div>
                <div class="w-[40%]">
                    <label class="mr-5">วันที่ประกาศ</label>
                    <input type="text" ref="personalID"
                        class="w-full p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                        required v-model="postannounce.announcetimes"/>
                </div>
                <button type="submit"
            class="w-[100px] m-auto mt-5 p-2 bg-sky-500 rounded-lg hover:shadow-lg duration-500 hover:shadow-sky-500/50">บันทึกข้อมูล</button>
        </form>

        </div>

        <div class="w-[50%] bg-[#1e3658] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden z-50" v-show="showeditannounce">
            <div class="w-full bg-sky-500 h-[10%] text-bold text-white text-lg flex items-center p-4 pl-5 justify-between">
                <div class="flex gap-3">
                    <i class="fa-solid fa-bullhorn text-xl"></i>แก้ไขประกาศสาธารณะ
                </div>
                <button @click="showeditannounce = false">
                    <i class="fa-solid fa-xmark pr-5 text-xl hover:text-rose-500 duration-300"></i>
                </button>
            </div>
        <form class="w-full flex justify-center items-center flex-col gap-3 mt-7 p-5" @submit.prevent="Editannounce(editannounce)">
                <div class="w-[40%]">
                    <label class="mr-5">หัวข้อประกาศ</label>
                    <input type="text" ref="personalID"
                        class="w-full p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                        required v-model="editannounce.title"/>
                </div>
                <div class="w-[40%]">
                    <label class="mr-5">รายละเอียดประกาศ</label>
                    <input type="text" ref="personalID"
                        class="w-full p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                        required v-model="editannounce.detail"/>
                </div>
                <div class="w-[40%]">
                    <label class="mr-5">ลิงค์ประกาศ</label>
                    <input type="text" ref="personalID"
                        class="w-full p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                        required v-model="editannounce.announcelink"/>
                </div>
                <div class="w-[40%]">
                    <label class="mr-5">ประกาศโดย</label>
                    <input type="text" ref="personalID"
                        class="w-full p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                        required v-model="editannounce.announceby"/>
                </div>
                <div class="w-[40%]">
                    <label class="mr-5">วันที่ประกาศ</label>
                    <input type="text" ref="personalID"
                        class="w-full p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                        required v-model="editannounce.announcetimes"/>
                </div>
                <button type="submit"
            class="w-[100px] m-auto mt-5 p-2 bg-sky-500 rounded-lg hover:shadow-lg duration-500 hover:shadow-sky-500/50">แก้ไขข้อมูล</button>
        </form>

        </div>

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
            showeditannounce: false,
            showcreateannounce: false,
            postannounce: {
                title: null,
                detail: null,
                announcelink: null,
                announceby: null,
                announcetimes: null
            },
            editannounce: [],
            userdata: {
                checkLogin: false,
                username: null,
                role: null
            }
        }
    },
    methods: {
        getAnnounce() {
            axios.get('https://unknowkubbrother.net:3000/api/announce')
                .then((response) => {
                    if (response) {
                        this.announce = response.data
                    }

                }).catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                    }
                })
        },
        createAnnounce() {
            axios.post("https://unknowkubbrother.net:3000/api/announce/", this.postannounce, {
                headers: {
                  'authtoken': localStorage.getItem('authtoken')
                },
              })
                .then((response) => {
                       if(response.data)
                       {
                        alert("สร้างประกาศสำเร็จ")
                        location.reload()
                       }

                }).catch(function (error) {
                    if (error.response.data == 'This announcement already has a name.') {
                        alert("ประกาศนี้มีชื่ออยู่แล้ว")
                    }else{
                        console.log(error.response.data);
                    }
                })
        },
        DeleteAnnounce(e){
            const agree = confirm("คุณต้องการลบข้อมูลหรือไม่");
            if (agree) {
                axios.delete(`https://unknowkubbrother.net:3000/api/announce/${e._id}`, {
                    headers: {
                    'authtoken': localStorage.getItem('authtoken')
                    },
                })
                    .then((response) => {
                        if(response.data)
                        {
                            alert("ระบบได้ทำการลบประกาศแล้ว")
                            location.reload()
                        }

                    }).catch(function (error) {
                            console.log(error.response.data);
                    })
                }
        },
        Showeditannounce(event){
            this.showeditannounce = true
            axios.get(`https://unknowkubbrother.net:3000/api/announce/${event}`, {
                    headers: {
                    'authtoken': localStorage.getItem('authtoken')
                    },
                })
                .then((response) => {
                    if (response) {
                        this.editannounce = response.data
                    }

                }).catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                    }
                })
        },
        Editannounce(e){
            const agree = confirm("คุณต้องการแก้ไขข้อมูลหรือไม่");
            if (agree) {
                axios.put(`https://unknowkubbrother.net:3000/api/announce/${e._id}`, e,{
                    headers: {
                    'authtoken': localStorage.getItem('authtoken')
                    },
                })
                    .then((response) => {
                        if(response.data)
                        {
                            alert("ระบบได้ทำการแก้ไขข้อมูลประกาศแล้ว")
                            location.reload()    
                        }

                    }).catch(function (error) {
                            console.log(error.response.data);
                    })
                }
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