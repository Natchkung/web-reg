<template>
    <div class="h-full w-full">
        <div class="header"><span class="text-2xl">หน้าแรก | </span>
            <router-link to="/home" class="text-sky-500">หน้าแรก</router-link>
        </div>
        <div class="w-full bg-[#19283b] rounded-lg my-5 py-5">
            <div class="w-[90%] h-[80px] m-auto text-start flex items-center">ข่าวประกาศ</div>
            <div class="announce w-[90%] h-full m-auto">
                <div class="announce-item" v-for="item in announce.reverse()" :key="item">
                <h4><a :href="item.announcelink" target="_blank"> {{item.title}}</a> </h4>
                    <ul>
                    <li>{{item.detail}}</li>
                    <li><span class="font-bold text-red-200">ประกาศโดย </span>{{item.announceby}}</li>
                    <li><span class="font-bold text-violet-300">วันที่ประกาศ </span>{{ item.announcetimes }}</li>
                    </ul>
                </div>
          </div>

        </div>
    </div>
</template>
 
<script>
import axios from 'axios';
export default {
    name: "home",
    components: {
    },
    data() {
        return {
            announce: []
            }
        },
    methods: {
    },
    created(){
        axios.get('https://unknowkubbrother.net:3000/api/announce')
        .then((response) => {
          if (response) {
            this.announce = response.data
            // console.log(this.announce)
            // for (const item in this.announce){
            //     console.log(this.announce[item].title)
            // }
          }

        }).catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
          }
        })
    }
};
</script>
 
<style >
/*--------------------------------------------------------------
# announce
--------------------------------------------------------------*/

.announce .announce-item {
  padding: 0 0 20px 20px;
  margin-top: -2px;
  border-left: 1px solid rgba(76, 82, 85, 0.233);
  position: relative;
}

.announce .announce-item h4 {
  text-transform: uppercase;
  color: rgb(25, 209, 255);
  margin-bottom: 10px;
}
.announce .announce-item ul {
border-bottom: 1px solid rgba(76, 82, 85, 0.233);
  padding-left: 20px;
}

.announce .announce-item ul li {
  padding-bottom: 10px;
}

.announce .announce-item:last-child {
  padding-bottom: 0;
}

.announce .announce-item::before {
  content: "";
  position: absolute;
  width: 17px;
  height: 17px;
  border-radius: 50px;
  left: -9px;
  top: 0;
  background: rgb(25, 209, 255);
  border: 3px solid #0563bb;
}
</style>