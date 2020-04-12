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

#wrapper {
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
}

.table-wrapper {
  width: 100%;
  margin-top: 5px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo h1 {
  margin: 0;
  margin-right: 10px;
}

main {
  display: flex;
  justify-content: space-between;
}

.ant-table-body {
  margin: 0 !important;
}
</style>
