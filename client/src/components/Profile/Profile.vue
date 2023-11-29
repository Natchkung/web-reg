<template>
    <div class="w-full m-auto mt-7">
        <div class="w-full h-[650px] flex flex-wrap lg:gap-7">
            <div class="w-[30%] bg-[#102e49] rounded-lg flex flex-col items-center">
                <div class="w-[150px] h-[150px] bg-sky-50 rounded-full overflow-hidden mt-5">
                    <img :src="`http://localhost/upload_image/${members.photo}`" :alt="members.photo" class="w-full h-full object-cover">
                </div>
                <div class="text-xl mt-3 flex flex-wrap gap-2">
                    <span>{{ members.fname }}</span><span>{{ members.lname }}</span>
                </div>
                <span class="text-xl mt-5 block"><i class="fa-solid fa-signal text-[#47b200]"></i> STATUS</span>
                <div class="lg:w-[80%] h-[55%] bg-[#113454] mt-3 flex items-center justify-center">
                    <div class="lg:w-[80%] h-[90%] text-center flex flex-col">
                        <div class="title-status">
                            <span class="text-lg block">SYS (ค่าความดันขณะหัวใจบีบตัว)</span>
                            <div class="text-lg mt-2"><span class="status">สถานะ :</span><span class="sys-status text-[#47b200]">ปกติ</span></div>
                        </div>
                        <div class="title-status">
                            <span class="text-lg block">DIA (ค่าความดันขณะหัวใจคลายตัว)</span>
                            <div class="text-lg mt-2"><span class="status">สถานะ :</span><span class="dia-status text-[#47b200]">ปกติ</span></div>
                        </div>
                        <div class="title-status">
                            <span class="text-lg block">PUL (ชีพจรหรืออัตราการเต้นของหัวใจ)</span>
                            <div class="text-lg mt-2"><span class="status">สถานะ :</span><span class="pul-status text-[#47b200]">ปกติ</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-[68%] bg-[#102e49] rounded-lg flex items-center justify-center">
                <div class="w-[90%] h-[90%] flex">
                    <div class="w-[25%] h-full flex flex-col">
                        <div>
                            <i class="fas fa-regular fa-address-card"></i><span class="mt-5">เลขบัตรประจำตัวประชาชน</span>
                        </div>
                        <div class="tite-detail">
                            <i class="fas fa-solid fa-user"></i><span>ชื่อ-นามสกุล</span>
                        </div>
                        <div class="tite-detail">
                            <i class="fas fa-solid fa-person-cane"></i><span>อายุ</span>
                        </div>
                        <div class="tite-detail">
                            <i class="fas fa-solid fa-venus-mars"></i><span>เพศ</span>
                        </div>
                        <div class="tite-detail">
                            <i class="fas fa-solid fa-person"></i><span>ส่วนสูง</span>
                        </div>
                        <div class="tite-detail">
                            <i class="fas fa-solid fa-person-circle-plus"></i><span>น้ำหนัก</span>
                        </div>
                        <div class="tite-detail">
                            <i class="fas fa-solid fa-heart-circle-plus"></i><span>SYS/mmHg</span>
                        </div>
                        <div class="tite-detail">
                            <i class="fas fa-solid fa-heart-circle-minus"></i><span>DIA/mmhg</span>
                        </div>
                        <div class="tite-detail">
                            <i class="fas fa-solid fa-heart-pulse"></i><span>PUL/min</span>
                        </div>
                        <div class="tite-detail">
                            <i class="fas fa-solid fa-upload"></i><span>วันเวลาที่อัพโหลด</span>
                        </div>
                    </div>
                    <div class="w-[75%] h-full flex flex-col">
                        <div>
                            <span class="mt-5">{{ members.personalID }}</span>
                        </div>
                        <div class="tite-detail">
                            <span>{{ members.fname+" "+members.lname }}</span>
                        </div>
                        <div class="tite-detail">
                            <span>{{ members.old }}</span>
                        </div>
                        <div class="tite-detail">
                            <span>{{ members.sex }}</span>
                        </div>
                        <div class="tite-detail">
                            <span>{{ members.height }}</span>
                        </div>
                        <div class="tite-detail">
                            <span>{{ members.weight }}</span>
                        </div>
                        <div class="tite-detail">
                            <span>{{ members.SYSmmHg }}</span>
                        </div>
                        <div class="tite-detail">
                            <span>{{ members.DIAmmhg }}</span>
                        </div>
                        <div class="tite-detail">
                            <span>{{ members.PULmin }}</span>
                        </div>
                        <div class="tite-detail">
                            <span>{{ members.time }}</span>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        <div class="w-full bg-[#102e49] rounded-lg mt-5 mb-7">
           <h1 class="text-center text-3xl pt-5">คำแนะนำ</h1>
           <div class="w-[90%] m-auto mt-5 p-5">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui vel impedit temporibus tempora nobis, itaque repellat harum veniam amet ullam cupiditate minima sapiente deleniti rem natus ipsum quo asperiores sequi quasi alias, est hic! Dignissimos, quam delectus qui corrupti magni voluptatibus, harum doloremque blanditiis nemo laudantium natus? Temporibus, vitae. Suscipit vel asperiores, temporibus omnis quod itaque quae accusantium ipsa corrupti facilis rem, quibusdam nihil nesciunt veniam iusto consequatur nemo, provident aspernatur modi accusamus? Vitae, iusto nulla sed reprehenderit voluptates delectus error sint, repellat magnam ipsum accusantium repudiandae. Deserunt quaerat veniam earum molestiae. Velit, accusamus maiores delectus tempora explicabo inventore fuga pariatur nihil, officia eum sint suscipit possimus quos facere reprehenderit aperiam consectetur perspiciatis maxime quod repellat dolores neque quisquam nam molestias. Debitis quod possimus architecto ipsam sed perspiciatis nihil necessitatibus quis iure quos. Nam suscipit veniam id hic, facilis repellat. Nobis facere quas, exercitationem asperiores praesentium unde inventore sapiente odio earum similique voluptates, sit deserunt ullam nemo et qui rerum saepe aperiam, fugit modi quam! Aliquid voluptas deleniti quod? Maiores officiis exercitationem, voluptas delectus ut minima sequi distinctio maxime praesentium? Illum aspernatur quibusdam vero autem aut. Repellendus debitis laboriosam fuga adipisci eius rem suscipit qui soluta minima officiis amet asperiores totam pariatur blanditiis sapiente voluptate iusto laborum inventore, facilis nostrum ab ducimus? Quae quisquam nisi tenetur aspernatur! Harum perspiciatis reiciendis, itaque atque inventore cumque ipsum rerum qui expedita odio modi laborum non cupiditate, possimus iste consectetur illum accusantium ut eum sed. Quas iusto molestias consequuntur perferendis voluptatibus expedita laborum assumenda.</p>
           </div>
        </div>
    </div>
  
</template>

<script>
import axios from 'axios'
export default {
    name: 'Profile',
    data(){
        return{
            members: [],
        }

    },
    created(){
         axios.get(`http://localhost:3000/api/members/${this.$route.query.personalID}`, {
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
            this.members = response.data.user
          }

        }).catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
          }
        })
    },
}
</script>


<style>
.status{
    margin-right: 5px;
}
.title-status{
    margin-top: 2rem;
}
.tite-detail{
    margin-top: 2rem;
}
.data-detail{
    margin-top: 2rem;
}
.fas{
    margin-right: 1.5rem;
}

</style>