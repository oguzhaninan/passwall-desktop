<template>
  <div id="wrapper">
    <header>
      <div class="logo">
        <h1>GPass</h1>
        <a-button shape="circle" size="small" icon="reload" />
      </div>

      <a-button type="primary" shape="round" icon="plus">New Pass</a-button>
    </header>
    <main>
      <div class="table-wrapper">
        <a-table size="small" :columns="columns" :dataSource="data" rowKey="ID">
          <template slot="Password" slot-scope="text, record">
            <PasswordField :password="record.Password" />
          </template>
        </a-table>
      </div>
    </main>
  </div>
</template>

<script>
import PasswordField from './PasswordField'

const data = [
  {
    ID: '1',
    URL: 'google.com',
    Username: 'John Brown',
    Password: 'parolam'
  }
]

export default {
  components: {
    PasswordField
  },

  data() {
    return {
      showPassword: false,
      data,
      columns: [
        {
          title: 'URL',
          dataIndex: 'URL',
          ellipsis: true,
          sortDirections: ['descend', 'ascend'],
          onFilter: (value, record) => record.URL.indexOf(value) === 0,
          sorter: (a, b) => a.URL.localeCompare(b.URL.length)
        },
        {
          title: 'Username',
          dataIndex: 'Username',
          sortDirections: ['descend', 'ascend'],
          onFilter: (value, record) => record.Username.indexOf(value) === 0,
          sorter: (a, b) => a.URL.localeCompare(b.URL.length)
        },
        {
          title: 'Password',
          dataIndex: 'Password',
          scopedSlots: { customRender: 'Password' }
        }
      ]
    }
  },

  methods: {
    open(link) {
      require('electron').shell.openExternal(link)
    }
  }
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
  padding: 20px;
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
  margin-top: 10px;
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
</style>
