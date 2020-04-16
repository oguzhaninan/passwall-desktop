<template>
  <div class="wrapper">
    <header>
      <div class="logo">
        <img src="../assets/Logo.png" height="30px" id="logo" />
        <a-tooltip placement="top" title="Reload">
          <a-button shape="circle" size="small" icon="reload" @click="fetch" />
        </a-tooltip>
      </div>

      <div class="header-right">
        <!-- new -->
        <a-button
          type="primary"
          shape="round"
          size="small"
          icon="plus"
          style="margin-right: 5px;"
          @click="clickNewPass"
        >
          New
        </a-button>
        <!-- menu -->

        <a-dropdown>
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="export"><a-icon type="vertical-align-bottom" />Export</a-menu-item>
            <a-menu-item key="logout"><a-icon type="logout" />Logout</a-menu-item>
            <a-menu-item key="quit"><a-icon type="close" />Quit</a-menu-item>
          </a-menu>
          <a-button size="small">
            <a-icon type="small-dash" />
          </a-button>
        </a-dropdown>
      </div>
    </header>
    <main>
      <div class="table-wrapper">
        <a-input-search
          size="small"
          placeholder="Search URL or Username"
          style="margin-bottom: 10px;"
          v-model="searchText"
        />
        <a-table
          size="small"
          :columns="columns"
          :dataSource="filteredData"
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
import FileSaver from 'file-saver'
import PasswordField from '../components/PasswordField'
const app = require('electron').remote.app

export default {
  components: {
    PasswordField
  },

  data() {
    return {
      searchText: '',
      showPassword: false,
      uploadAction: `${this.$http.defaults.baseURL}import`,
      uploadHeaders: this.$http.defaults.headers.common,
      data: [],
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
          ellipsis: true,
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

  created() {
    this.fetch()
  },

  computed: {
    filteredData() {
      const searchText = this.searchText.toLocaleLowerCase()

      return this.data.filter(item => {
        return ['Username', 'URL'].some(key => {
          return item[key]
            .toString()
            .toLocaleLowerCase()
            .includes(searchText)
        })
      })
    }
  },

  methods: {
    handleChangeUpload(info) {
      console.log(info.file, info.fileList)
    },

    async fetch() {
      try {
        const { data } = await this.$http.get('/logins/')
        this.data = data
      } catch (err) {
        if (err.response && err.response.data.message) {
          this.$message.error(err.response.data.message)
        }
      }
    },

    clickNewPass() {
      this.$router.push({ name: 'NewPass' })
    },

    clickLogout() {
      localStorage.removeItem('token')
      this.$router.push({ name: 'Login' })
    },

    handleMenuClick({ key }) {
      switch (key) {
        case 'export':
          this.exportLogins()
          break
        case 'logout':
          this.clickLogout()
          break
        case 'quit':
          app.exit(0)
          break
      }
    },

    async exportLogins() {
      try {
        const { data } = await this.$http.post('/logins/export')
        const blob = new Blob([data], { type: 'text/csv' })
        FileSaver.saveAs(blob, 'PassWall.csv')
      } catch (err) {
        if (err.response && err.response.data.message) {
          this.$message.error(err.response.data.message)
        }
      }
    }
  }
}
</script>

<style>
.header-right {
  display: flex;
}
</style>
