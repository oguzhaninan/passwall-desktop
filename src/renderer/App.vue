<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'passwall-desktop'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

#loader,
[v-cloak] > * {
  display: none;
}

#app[v-cloak] #loader {
  display: flex !important;
}

.wrapper {
  background: white;
  height: 100vh;
  padding: 10px 15px;
  width: 100vw;
}

header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.table-wrapper {
  width: 100%;
  margin-top: 5px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo h2,
#logo {
  margin: 0 10px 0 0;
}

main {
  display: flex;
  justify-content: space-between;
}

hr {
  border: 0;
  border-top: 1px solid #dedede;
}

.ant-table-body {
  margin: 0 !important;
}

#loader {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.438);
  display: flex;
  justify-content: center;
  align-items: center;
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
