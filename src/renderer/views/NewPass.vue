<template>
  <div id="wrapper">
    <header>
      <div class="logo">
        <a-button
          shape="circle"
          size="small"
          icon="arrow-left"
          @click="clickBack"
          style="margin-right: 10px;"
        />
        <h2>New Pass</h2>
      </div>
    </header>

    <hr />

    <div class="login-wrapper">
      <!-- Error Message -->
      <a-alert
        v-if="errorMessage"
        style="margin-bottom: 10px;"
        type="error"
        :message="errorMessage"
        banner
      />
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
      errorMessage: '',
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

  methods: {
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('Username') && getFieldError('Username')
    },

    passwordError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('password') && getFieldError('password')
    },

    clickBack() {
      this.$router.push({ name: 'Home' })
    },

    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            const { data } = await this.$http.post('/auth/signin', values)
            this.$router.push({ name: 'Home' })
          } catch (err) {
            if (err.response && err.response.data.message) {
              this.errorMessage = err.response.data.message
            }
          }
        }
      })
    }
  }
}
</script>

<style>
.new-pass-wrapper {
  margin: 20px 50px;
}
</style>
