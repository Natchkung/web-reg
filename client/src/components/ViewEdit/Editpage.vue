<template>
    <div class="w-full h-full mt-7">
        <div class="w-[80%] h-[700px] bg-[#213550] rounded-lg overflow-hidden m-auto">
            <div class="w-full h-[70px] bg-sky-500 text-xl font-bold flex justify-start items-center"><i
                    class="fas fa-address-card text-3xl ml-5 mr-3"></i><span>แก้ไขข้อมูลส่วนตัว</span></div>
            <form class="flex flex-col mt-10" @submit.enter.prevent="UpdateData()" method="post"
                enctype="multipart/form-data">
                <div class="flex justify-center items-center lg:ml-[300px] md:ml-[100px]">
                    <div class="w-[120px] h-[120px] overflow-hidden rounded-full">
                        <img :src="`http://localhost/upload_image/${member.photo}`" class="w-full h-full object-cover"
                            :alt="`${member.photo}`">
                    </div>
                    <div class="w-[70%] ml-10">
                        <label class="mr-5">เลขประจำตัวประชาชน</label>
                        <input type="Number" v-model="member.personalID"
                            class="w-[30%] p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                            placeholder="110xxxxxxx001" min="1000000000000" max="9999999999999" />

                    </div>
                </div>
                <div class="w-[70%] h-full m-auto flex">
                    <div class="box w-[50%]">
                        <div class="mt-5">
                            <label class="mr-5">ชื่อ</label>
                            <input type="text" v-model="member.fname"
                                class="w-[60%] p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent " />
                        </div>
                        <div class="mt-5">
                            <label class="mr-5">อายุ</label>
                            <input type="Number" v-model="member.old"
                                class="w-[60%] p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent " />
                        </div>
                        <div class="mt-5">
                            <label class="mr-5">ส่วนสูง</label>
                            <input type="Number" v-model="member.height"
                                class="w-[60%] p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                                step="0.01" />
                        </div>
                        <div class="mt-5">
                            <label class="mr-5">SYS/mmHg</label>
                            <input type="Number" v-model="member.SYSmmHg"
                                class="w-[60%] p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                                step="0.01" />
                        </div>
                        <div class="mt-5">
                            <label class="mr-5">PUL/min</label>
                            <input type="Number" v-model="member.PULmin"
                                class="w-[60%] p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                                step="0.01" />
                        </div>
                    </div>
                    <div class="box w-[50%">
                        <div class="mt-5">
                            <label class="mr-5">นามสกุล</label>
                            <input type="text" v-model="member.lname"
                                class="w-[60%] p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent " />
                        </div>
                        <div class="mt-9">
                            <label class="mr-5">เพศ</label>
                            <input type="radio" name="sex" id="sex1" value="ชาย" v-model="member.sex" />
                            <label for="sex1">&nbsp;ชาย&nbsp;</label>
                            <input type="radio" name="sex" id="sex2" value="หญิง" v-model="member.sex" />
                            <label for="sex2">&nbsp;หญิง&nbsp;</label>
                        </div>
                        <div class="mt-8">
                            <label class="mr-5">น้ำหนัก</label>
                            <input type="Number" v-model="member.weight"
                                class="w-[60%] p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                                step="0.01" />
                        </div>
                        <div class="mt-5">
                            <label class="mr-5">DIA/mmhg</label>
                            <input type="Number" v-model="member.DIAmmhg"
                                class="w-[60%] p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                                step="0.01" />
                        </div>
                        <div class="mt-8">
                            <label class="mr-5">รูปภาพ</label>
                            <input type="file" ref="photo" class="w-[60%] p-1 rounded-[5px] bg-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0" />
                        </div>
                    </div>
                </div>
                <button type="submit"
                    class="w-[100px] m-auto mt-10 p-2 bg-sky-500 rounded-lg hover:shadow-lg duration-500 hover:shadow-sky-500/50">บันทึกข้อมูล</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Editpage",
    props: {
        members: [],
    },
    data() {
        return {
            member: [],
            beforepersonalID: null,
            beforephoto: null
        }
    },
    created() {
        this.beforephoto = this.members.photo
        this.beforepersonalID = this.members.personalID
        this.member = this.members
    },
    methods: {
        UpdateData() {

            if (this.$refs.photo.files[0]) {
                this.member.photo = this.$refs.photo.files[0]
            } else {
                if (this.member.personalID != this.beforepersonalID) {
                    this.member.photo = 'noimage.jpg'
                } else {
                    this.member.photo = this.beforephoto
                }

            }


            const formWithImageData = new FormData()

            for (const key in this.member) {
                formWithImageData.append(key, this.member[key])
            }

            axios
                .put(`http://localhost:3000/api/members/${this.beforepersonalID}`, formWithImageData, {
                    headers: {
                        'authtoken': localStorage.getItem('authtoken')
                    },
                })
                .then((response) => {
                    if (response) {
                        alert("อัพเดตข้อมูลเสร็จสิ้น!!")
                        location.reload();
                    }
                }).catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        alert("มีเลขประจำตัวประชาชนนี้แล้ว!!")
                    }
                })

        },
    }
}
</script>

<style></style>