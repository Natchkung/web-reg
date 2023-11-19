<template>
	<div class="app">
		<router-view />
	</div>
</template>

<script>
export default {
    name: "App",
    components: {
    },
    data() {
        return {
        };
    },
    methods: {
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Itim&family=Mitr:wght@300&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;
*{
   font-family: 'Itim', cursive;
  font-family: 'Mitr', sans-serif;
}


body {
  --sb-track-color: #5a5a5a;
  --sb-thumb-color: #0661a9;
  --sb-size: 8px;

  scrollbar-color: var(--sb-thumb-color) 
                   var(--sb-track-color);
}

body::-webkit-scrollbar {
  width: var(--sb-size) 
}

body::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 1px;
}

body::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 1px;
  
  }

</style>