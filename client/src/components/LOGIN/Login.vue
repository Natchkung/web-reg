<template>
  <div id="Login">
    <div class="header"><span class="text-2xl">เข้าสู่ระบบ | </span>
      <router-link to="/home" class="text-sky-500">หน้าแรก</router-link>
      <span class="text-zinc-300"> > เข้าสู่ระบบ</span>
    </div>

    <div class="w-full h-full flex align-center justify-center overflow-hidden">
      <div class="w-[60%] h-[500px] bg-[#213550] rounded-lg mt-10">
        <div class="w-full h-[70px] bg-sky-500 m-0 rounded-t-lg mb-10">
          <div class="pt-5 pl-5">
            <i class="fas fa-right-to-bracket text-xl"></i>
            <span class="ml-2 text-lg">กรุณาป้อน Account และรหัสผ่าน</span>
          </div>
        </div>
        <div class="w-[90%] m-auto">
          <div class="flex flex-col w-[60%] m-auto">
            <div class="username w-full">
              <label>Username account</label>
              <input type="text" id="Username" v-model="LoginData.username"
                class="w-[90%] p-1 rounded-[5px] bg-transparent border-2 border-slate-500 mt-3 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent " />
            </div>
            <div class="password w-full mt-5">
              <label class="mt-2">Password</label>
              <div class="flex h-[50px]">
                <input v-if="showPassword" type="text" v-model="LoginData.password"
                  class="w-[90%] p-1 rounded-[5px] bg-transparent mt-3 border-2 border-slate-500 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent"
                  placeholder="******" />
                <input v-else type="password" v-model="LoginData.password"
                  class="w-[90%] p-1 rounded-[5px] bg-transparent mt-3 border-2 border-slate-500 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 focus:bg-transparent"
                  placeholder="******" />
                <button @click="toggleShow" class="mt-3">
                  <span class="ml-[-60px]">
                    <span>|</span>&nbsp;&nbsp;<i class="fas" :class="{
                      'fa-eye-slash': showPassword,
                      'fa-eye': !showPassword,
                    }"></i>
                  </span>
                </button>
              </div>
            </div>
            <button @click.enter="Login"
              class="bg-sky-500 p-2 rounded-md w-[100px] mt-7 hover:shadow-lg duration-500 hover:shadow-sky-500/50">
              เข้าสู่ระบบ
            </button>
          </div>
          <div class="list w-[60%] m-auto mt-5">
            <ul  class="text-sky-300">
              <li><a href="" class="duration-500 hover:text-sky-500">ลืมรหัสผ่าน account</a></li>
              <li><a href="" class="duration-500 hover:text-sky-500">คู่มือการใช้งาน</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      showPassword: false,
      LoginData: {
        username: null,
        password: null
      },
    };
  },
  computed: {
    buttonLabel() {
      return this.showPassword ? "Hide" : "Show";
    },
  },
  methods: {
     async Login() {
      if (
        this.LoginData.username &&
        this.LoginData.password
      ) {
        const api = "https://unknowkubbrother.net:3000/api/login"
        await axios.post(api, this.LoginData).then((response)=>{
           if (response){
            alert("Login Success");
            // this.$router.push({path: '/home'})
            localStorage.setItem("authtoken", response.data.token)
            localStorage.setItem('checkLogin' , true)
            localStorage.setItem('username' , response.data.payload.user.username)
            localStorage.setItem('role' , response.data.payload.user.role)
            location.replace('/home')     
          }
        }
        ).catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            alert("Login Fail")
          }})
              
      } else {
        alert("กรุณากรอกข้อมูลให้ครบ");
      }
    },
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
  },
  created(){
    localStorage.clear()
  }
};
</script>

<style>

body {
  color: #fff;
  background-color: #051829;
}

.list ul {
  list-style-type: circle;
}

#Login {
  color: #fff;
  background-color: #051829;
}
</style>