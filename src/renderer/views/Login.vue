<template>
  <div class="wrapper">
    <header>
      <div class="logo">
        <h2>PassWall</h2>
      </div>
    </header>

    <hr />

    <div class="login-wrapper">
      <!-- Form -->
      <a-form layout="vertical" :form="form" @submit="handleSubmit">
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
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}
export default {
  data() {
    return {
      passwordDecorator: [
        'Password',
        { rules: [{ required: true, message: 'Please input your Password!' }] }
      ],
      usernameDecorator: [
        'Username',
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
      return isFieldTouched('Username') && getFieldError('Username')
    },

    passwordError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('password') && getFieldError('password')
    },

    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            const { data } = await this.$http.post('/auth/signin', values)
            this.$http.defaults.headers.common.Authorization = `Bearer ${data.token}`
            localStorage.setItem('token', data.token)
            this.$router.push({ name: 'Home' })
          } catch (err) {
            if (err.response && err.response.data.message) {
              this.$message.error(err.response.data.message)
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
