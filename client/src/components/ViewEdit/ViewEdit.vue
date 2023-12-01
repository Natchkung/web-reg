<template>
  <div class="w-full h-full" v-if="userdata.role == 'admin' && userdata.checkLogin">
    <div class="header"><span class="text-2xl">แก้ไขข้อมูลสมาชิก | </span>
            <router-link to="/home" class="text-sky-500">หน้าแรก</router-link>
            <span class="text-zinc-300"> > แก้ไขข้อมูลสมาชิก</span>
        </div>
    <div v-show="!PageEdit">
      <div class="w-full h-full flex items-center justify-center overflow-auto ">
        <div class="w-full pt-7 pb-5 m-auto">
          <TreeTable :value="member" :paginator="true" :rows="6" :rowsPerPageOptions="[6, 12, 18, 64, 128]"
            :filters="filters">
            <template #header>
              <div class="flex items-center justify-between">
                <div class="text-xl font-bold text-sky-300">ตารางข้อมูลประวัติทั้งหมด</div>
                <div class="text-right">
                  <div class="p-input-icon-left">
                    <InputText v-model="filters['global']" placeholder=" Search" class="p-1" />
                  </div>
                </div>
              </div>
            </template>
            <Column field="personalID" header="เลขบัตรประจำตัวประชาชน" sortable headerStyle="width:150px"></Column>
            <Column field="fname" header="ชื่อ" headerStyle="width: 120px" sortable class="text-center"></Column>
            <Column field="lname" header="นามสกุล" headerStyle="width: 120px" sortable class="text-center"></Column>
            <Column field="old" header="อายุ" sortable class="text-center" headerStyle="width: 70px"></Column>
            <Column field="sex" header="เพศ" sortable class="text-center" headerStyle="width: 70px"></Column>
            <Column field="height" header="ส่วนสูง" sortable class="text-center" headerStyle="width: 70px"></Column>
            <Column field="weight" header="น้ำหนัก" sortable class="text-center" headerStyle="width: 70px"></Column>
            <Column field="SYSmmHg" header="SYSmmHg" sortable class="text-center" headerStyle="width: 70px"></Column>
            <Column field="DIAmmhg" header="DIAmmhg" sortable class="text-center" headerStyle="width: 70px"></Column>
            <Column field="PULmin" header="PULmin" sortable class="text-center" headerStyle="width: 70px"></Column>
            <Column header="รูปภาพ" class="text-center" headerStyle="width: 90px">
              <template #body="slotProps">
                <img :src="`http://localhost/upload_image/${slotProps.node.data.photo}`" :alt="slotProps.node.data.photo"
                  class="w-6rem h-[3.3rem] shadow-2 border-round rounded-lg object-cover" />
              </template>
            </Column>
            <Column headerStyle="width: 10rem">
              <template #body="slotProps">
                <div class="flex flex-wrap gap-2 scale-90">
                  <Button type="button" icon="pi pi-trash" rounded class="text-[#fd6a6a] bg-[#363636]" severity="danger"
                    @click="deletedata(slotProps.node.data)" />
                  <Button type="button" icon="pi pi-pencil" rounded severity="warning" class="text-[#f1caba] bg-[#363636]"
                    @click="editdata(slotProps.node.data)" />
                  <Button type="button" icon="pi pi-eye" rounded severity="success" class="text-[#98e9ce] bg-[#363636]"
                    @click="Profiledata(slotProps.node.data)" />
                </div>
              </template>
            </Column>
            <template #footer>
              <div class="flex justify-between items-center">
                <Button icon="pi pi-refresh" label="Reload" severity="warning" class="text-[#f1caba]"
                  @click="refresh()" />
                <button class="p-2 bg-sky-500 rounded-lg duration-500 hover:text-slate-700"
                  @click="ExportToExcel()">Export to Excel</button>
              </div>
            </template>
          </TreeTable>
        </div>
      </div>
    </div>
    <!-- @showEdit -->
    <div v-if="PageEdit">
      <EDITPROFILE :members="member" />
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
import EDITPROFILE from './EditProfile.vue'
import axios from 'axios';
export default {
  name: 'ViewEdit',
  components: {
    EDITPROFILE,
  },
  props: {
    auth: Boolean,
    dataUser: []
  },
  data() {
    return {
      member: [],
      filters: {},
      PageEdit: false,
      userdata: {
        checkLogin: false,
        username: null,
        role: null
      }
    }
  },
  created() {
    this.refresh()
    this.userdata.checkLogin = localStorage.getItem('checkLogin')
    this.userdata.username = localStorage.getItem('username')
    this.userdata.role = localStorage.getItem('role')
  },
  methods: {
    refresh() {
      this.member = []
      this.PageEdit = false
      axios.get("http://localhost:3000/api/members/", {
        headers: {
          'authtoken': localStorage.getItem('authtoken')
        },
      })
        .then((response) => {
          if (response.data == "Token Invalid" || response.data == 'No token!') {
            alert("หมดเวลาการใช้งานกรุณา Login ใหม่")
            localStorage.clear()
            location.replace('/login')
          } else {
            for (let key in response.data) {
              let innerObj = {};
              innerObj['data'] = response.data[key]
              this.member.push(innerObj)
            }
          }

        }).catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
          }
        })
    },
    deletedata(event) {
      const agree = confirm("คุณต้องการลบข้อมูลหรือไม่");
      if (agree) {
        axios.delete(`http://localhost:3000/api/members/${event.personalID}`, {
          headers: {
            'authtoken': localStorage.getItem('authtoken')
          },
        })
          .then((response) => {
            if (response) {
              alert("ลบข้อมูลแล้ว")
              this.refresh()
            }

          }).catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
            }
          })
      }
    },
    editdata(event) {
      axios.get(`http://localhost:3000/api/members/${event.personalID}`, {
        headers: {
          'authtoken': localStorage.getItem('authtoken')
        },
      })
        .then((response) => {
          if (response.data == "Token Invalid" || response.data == 'No token!') {
            alert("หมดเวลาการใช้งานกรุณา Login ใหม่")
            localStorage.clear()
            location.replace('/login')
          } else {
            this.member = response.data.user
            this.PageEdit = true
          }

        }).catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
          }
        })
    },
    Profiledata(event) {
      this.$router.push({ name: "Profile" ,query: {personalID: event.personalID} })
    },
    ExportToExcel() {
      // axios
      //   .get("http://localhost:3000/api/members/", {
      //     responseType: "blob",
      //     headers: {
      //       'authtoken': localStorage.getItem('authtoken')
      //     },
      //   })
      //   .then(response => {
      //     let blob = new Blob([response.data], {
      //       type:
      //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      //     }),
      //       url = window.URL.createObjectURL(blob);
      //     window.open(url);
      //   });
      alert("กำลังปรับปรุงระบบ")
    }
  }
}
</script>

<style></style>