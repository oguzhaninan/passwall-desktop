<template>
  <div id="wrapper">
    <header>
      <div class="logo">
        <h1>PassWall</h1>
        <a-button shape="circle" size="small" icon="reload" />
      </div>

      <a-button type="primary" shape="round" size="small" icon="plus">New Pass</a-button>
    </header>
    <main>
      <div class="table-wrapper">
        <a-input-search size="small" placeholder="Search URL or Username" style="margin-bottom: 10px;" @search="onSearch" />
        <a-table
          size="small"
          :columns="columns"
          :dataSource="data"
          :pagination="{ pageSize: 10000, hideOnSinglePage: true }"
          :scroll="{ y: 255 }"
          rowKey="ID"
        >
          <template slot="Password" slot-scope="text, record">
            <PasswordField :password="record.Password" />
          </template>
        </a-table>
      </div>
    </main>
  </div>
</template>

<script>
import PasswordField from '../components/PasswordField'

const data = [
  {
    ID: '1',
    URL: 'google.com',
    Username: 'John Brown',
    Password: 'parolam'
  },
  {
    ID: '1',
    URL: 'google.com',
    Username: 'John Brown',
    Password: 'parolam'
  },
  {
    ID: '1',
    URL: 'google.com',
    Username: 'John Brown',
    Password: 'parolam'
  },
  {
    ID: '1',
    URL: 'google.com',
    Username: 'John Brown',
    Password: 'parolam'
  },
  {
    ID: '1',
    URL: 'google.com',
    Username: 'John Brown',
    Password: 'parolam'
  },
  {
    ID: '1',
    URL: 'google.com',
    Username: 'John Brown',
    Password: 'parolam'
  },
  {
    ID: '1',
    URL: 'google.com',
    Username: 'John Brown',
    Password: 'parolam'
  },
  {
    ID: '1',
    URL: 'google.com',
    Username: 'John Brown',
    Password: 'parolam'
  },
  {
    ID: '1',
    URL: 'google.com',
    Username: 'John Brown',
    Password: 'parolam'
  },
  {
    ID: '1',
    URL: 'google.com',
    Username: 'John Brown',
    Password: 'parolam'
  },
  {
    ID: '1',
    URL: 'google.com',
    Username: 'John Brown',
    Password: 'parolam'
  },
  {
    ID: '1',
    URL: 'google.com',
    Username: 'John Brown',
    Password: 'parolam'
  },
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
  }
}
</script>

<style>
</style>
