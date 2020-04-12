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

.logo h2 {
  margin: 0 12px 0 0;
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
</style>
