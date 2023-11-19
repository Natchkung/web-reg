<template>
  <div class="w-full h-full">
    <div class="header"><span class="text-2xl">คู่มือการใช้งาน | </span>
      <router-link to="/home" class="text-sky-500">หน้าแรก</router-link>
      <span class="text-zinc-300"> > คู่มือการใช้งาน</span>
    </div>
    <div class="pdf w-[60%] h-full m-auto text-center my-10">
      <h1 class="text-2xl mb-5">คู่มือการใช้งาน</h1>
      <object data="/test.pdf" type="application/pdf" width="100%" height="900px" class="rounded-md">
        <a href="/test.pdf">test.pdf</a>
      </object>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserManual',
  props: {
    auth: Boolean,
  },

}
</script>

<style></style>