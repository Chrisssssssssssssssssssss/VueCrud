<template>
    <!-- <MySpinner/> -->
    <NavBar/>
    <router-view />
</template>

<script>
import NavBar from "./components/NavBar";
// import MySpinner from './components/MySpinner.vue';
  export default{
    name:"App",
    components: { NavBar }
  }
</script>

<style>

</style>
