<script>
import axios from "axios";
export default {
  name: "Post",
  props: {
    auth: Boolean,
  },
  data() {
    return {
      postData: {
        personalID: null,
        fname: null,
        lname: null,
        old: null,
        sex: null,
        height: null,
        weight: null,
        SYSmmHg: null,
        DIAmmhg: null,
        PULmin: null,
        photo: null
      }
    };
  },
  methods: {
    SaveData() {
      this.postData.personalID = this.$refs.personalID.value
      this.postData.fname = this.$refs.fname.value
      this.postData.lname = this.$refs.lname.value
      this.postData.old = this.$refs.old.value
      this.postData.height = this.$refs.height.value
      this.postData.weight = this.$refs.weight.value
      this.postData.SYSmmHg = this.$refs.SYSmmHg.value
      this.postData.DIAmmhg = this.$refs.DIAmmhg.value
      this.postData.PULmin = this.$refs.PULmin.value
      this.postData.photo = this.$refs.photo.files[0]

      const formWithImageData = new FormData()

      for (const key in this.postData) {
        formWithImageData.append(key, this.postData[key])
      }


      let loop = 0

      for (let data in this.postData) {
        if (this.postData[data] != null) {
          loop++
          if (loop === 11) {
            axios
              .post("http://localhost:3000/api/members/", formWithImageData, {
                headers: {
                  'authtoken': localStorage.getItem('authtoken')
                },
              })
              .then((response) => {
                if (response.data == "Token Invalid" || response.data == 'No token!') {
                  alert("หมดเวลาการใช้งานกรุณา Login ใหม่")
                  this.$emit('token-timeout');
                }
                else if (response.data == "Already have user data!") {
                  alert("มีข้อมูลอยู่ในระบบแล้ว!!")
                } else {
                  alert("บันทึกข้อมูลเสร็จสิ้น")
                  location.reload();
                }
              }).catch(function (error) {
                if (error.response) {
                  console.log(error.response.data);
                  // alert("หกฟหกฟก")
                }
              })
          }
        } else {
          alert("กรุณากรอกข้อมูลให้ครบ")
          break
        }
      }
    },
  },
};
</script>

<template>
  <div class="w-full h-full mt-10">
    <div class="container w-[80%] h-[700px] bg-[#213550] rounded-lg overflow-hidden m-auto" v-if="auth">
      <div class="w-full h-[70px] bg-sky-500 text-center text-xl font-bold flex justify-start items-center"><i
          class="fas fa-address-card text-3xl ml-5 mr-3"></i><span>แบบฟอร์มกรอกข้อมูลส่วนตัว</span></div>
      <form class="flex flex-col mt-[70px]" @submit.enter.prevent="SaveData()" method="post"
        enctype="multipart/form-data">
        <div class="flex justify-center items-center ">
          <label class="mr-5">เลขประจำตัวประชาชน</label>
          <input type="Number" ref="personalID"
            class="w-[30%] p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
            required placeholder="110xxxxxxx001" min="1000000000000" max="9999999999999" />
        </div>
        <div class="w-[70%] h-full m-auto flex">
          <div class="box w-[50%]">
            <div class="mt-5">
              <label class="mr-5">ชื่อ</label>
              <input type="text" ref="fname"
                class="w-[60%] p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                required />
            </div>
            <div class="mt-5">
              <label class="mr-5">อายุ</label>
              <input type="Number" ref="old"
                class="w-[60%] p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                required />
            </div>
            <div class="mt-5">
              <label class="mr-5">ส่วนสูง</label>
              <input type="Number" ref="height"
                class="w-[60%] p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                required step="0.01" />
            </div>
            <div class="mt-5">
              <label class="mr-5">SYS/mmHg</label>
              <input type="Number" ref="SYSmmHg"
                class="w-[60%] p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                required step="0.01" />
            </div>
            <div class="mt-5">
              <label class="mr-5">PUL/min</label>
              <input type="Number" ref="PULmin"
                class="w-[60%] p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                required step="0.01" />
            </div>
          </div>
          <div class="box w-[50%]">
            <div class="mt-5">
              <label class="mr-5">นามสกุล</label>
              <input type="text" ref="lname"
                class="w-[60%] p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                required />
            </div>
            <div class="mt-9">
              <label class="mr-5">เพศ</label>
              <input type="radio" name="sex" id="sex1" value="ชาย" v-model="postData.sex" required />
              <label for="sex1">&nbsp;ชาย&nbsp;</label>
              <input type="radio" name="sex" id="sex2" value="หญิง" v-model="postData.sex" required />
              <label for="sex2">&nbsp;หญิง&nbsp;</label>
            </div>
            <div class="mt-8">
              <label class="mr-5">น้ำหนัก</label>
              <input type="Number" ref="weight"
                class="w-[60%] p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                required step="0.01" />
            </div>
            <div class="mt-5">
              <label class="mr-5">DIA/mmhg</label>
              <input type="Number" ref="DIAmmhg"
                class="w-[60%] p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent "
                required step="0.01" />
            </div>
            <div class="mt-8">
              <label class="mr-5">รูปภาพ</label>
              <input type="file" class="w-[60%] p-1 rounded-[5px] bg-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0" ref="photo" required />
            </div>
          </div>
        </div>
        <button type="submit"
          class="w-[100px] m-auto mt-10 p-2 bg-sky-500 rounded-lg hover:shadow-lg duration-500 hover:shadow-sky-500/50">บันทึกข้อมูล</button>
      </form>
    </div>
  </div>
</template>

<style></style>