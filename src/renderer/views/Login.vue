<template>
  <div class="wrapper">
    <header>
      <div class="logo">
        <img src="../assets/Logo.png" height="30px" id="logo" />
      </div>
      <!-- Quit -->
      <a-button size="small" shape="round" @click="quitApp">Quit</a-button>
    </header>

    <hr />

    <div class="login-wrapper">
      <!-- Form -->
      <a-form layout="vertical" :form="form" @submit="handleSubmit">
        <!-- Base URL -->
        <a-form-item label="BaseURL">
          <a-input v-model="baseURL" placeholder="Base URL">
            <a-icon slot="prefix" type="global" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <!-- Username -->
        <a-form-item
          label="Username"
          :validate-status="userNameError() ? 'error' : ''"
          :help="userNameError() || ''"
        >
          <a-input v-decorator="usernameDecorator" placeholder="Username">
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <!-- Password -->
        <a-form-item
          label="Password"
          :validate-status="passwordError() ? 'error' : ''"
          :help="passwordError() || ''"
        >
          <a-input-password v-decorator="passwordDecorator" placeholder="Password">
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input-password>
        </a-form-item>
        <!-- Login -->
        <a-form-item style="text-align: right;">
          <a-button type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())">
            Log in
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
const app = require('electron').remote.app

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

export default {
  data() {
    return {
      baseURL: 'http://localhost:3625/',
      passwordDecorator: [
        'password',
        { rules: [{ required: true, message: 'Please input your Password!' }] }
      ],
      usernameDecorator: [
        'username',
        { rules: [{ required: true, message: 'Please input your Username!' }] }
      ],
      hasErrors,
      form: this.$form.createForm(this, { name: 'login_form' })
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.form.validateFields()
    })
  },

  methods: {
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('username') && getFieldError('username')
    },

    passwordError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('password') && getFieldError('password')
    },

    quitApp() {
      app.exit(0)
    },

    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            if (this.baseURL) {
              this.$http.defaults.baseURL = this.baseURL
              localStorage.setItem('baseUrl', this.baseURL)
            }

            const { data } = await this.$http.post('/auth/signin', values)
            this.$http.defaults.headers.common.Authorization = `Bearer ${data.access_token}`

            localStorage.setItem('token', data.access_token)
            this.$router.push({ name: 'Home' })
          } catch (error) {
            if (!error.response) {
              this.$message.error(error.message)
            } else if (error.response.data.message) {
              this.$message.error(error.response.data.message)
            }
          }
        }
      })
    }
  }
}
</script>

<style>
.login-wrapper {
  margin: 20px 50px;
}

.ant-form-item {
  margin-bottom: 10px !important;
}
</style>
