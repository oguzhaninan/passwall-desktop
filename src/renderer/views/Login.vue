<template>
  <div id="wrapper">
    <header>
      <div class="logo">
        <h1>PassWall</h1>
      </div>
    </header>
    <div>
      <a-form layout="vertical" :form="form" @submit="handleSubmit">
        <a-form-item
          :validate-status="userNameError() ? 'error' : ''"
          :help="userNameError() || ''"
        >
          <a-input
            v-decorator="[
              'userName',
              { rules: [{ required: true, message: 'Please input your username!' }] }
            ]"
            placeholder="Username"
          >
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item
          :validate-status="passwordError() ? 'error' : ''"
          :help="passwordError() || ''"
        >
          <a-input-password
            v-decorator="[
              'password',
              { rules: [{ required: true, message: 'Please input your Password!' }] }
            ]"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input-password>
        </a-form-item>
        <a-form-item>
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
      hasErrors,
      form: this.$form.createForm(this, { name: 'horizontal_login' })
    }
  },

  methods: {
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('userName') && getFieldError('userName')
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('password') && getFieldError('password')
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>

<style></style>
