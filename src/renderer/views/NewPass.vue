<template>
  <div class="wrapper">
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

    <div class="new-pass-wrapper">
      <!-- Form -->
      <a-form layout="vertical" :form="form" @submit="handleSubmit">
        <!-- URL -->
        <a-form-item
          label="URL"
          :validate-status="checkError('URL') ? 'error' : ''"
          :help="checkError('URL') || ''"
        >
          <a-input v-decorator="urlDecorator" placeholder="URL">
            <a-icon slot="prefix" type="global" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <!-- Username -->
        <a-form-item
          label="Username"
          :validate-status="checkError('Username') ? 'error' : ''"
          :help="checkError('Username') || ''"
        >
          <a-input v-decorator="usernameDecorator" placeholder="Username">
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <!-- Password -->
        <a-form-item
          label="Password"
          :validate-status="checkError('Password') ? 'error' : ''"
          :help="checkError('Password') || ''"
        >
          <a-input-password v-decorator="passwordDecorator" placeholder="Password">
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            <a-button slot="addonAfter" icon="lock" @click="generatePass" />
          </a-input-password>
        </a-form-item>
        <!-- Login -->
        <a-form-item style="text-align: right;">
          <a-button type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())">
            Create
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
      urlDecorator: ['URL', { rules: [{ required: true, message: 'Please input your URL!' }] }],
      passwordDecorator: [
        'Password',
        { rules: [{ required: true, message: 'Please input your Password!' }] }
      ],
      usernameDecorator: [
        'Username',
        { rules: [{ required: true, message: 'Please input your Username!' }] }
      ],
      hasErrors,
      form: this.$form.createForm(this, { name: 'new_form' })
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.form.validateFields()
    })
  },

  methods: {
    checkError(field) {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched(field) && getFieldError(field)
    },

    clickBack() {
      this.$router.push({ name: 'Home' })
    },

    async generatePass() {
      try {
        const { data } = await this.$http.post('/logins/generate-password')
        this.form.setFieldsValue({
          Password: data.Message
        })
      } catch (err) {
        if (err.response && err.response.data.message) {
          this.$message.error(err.response.data.message)
        }
      }
    },

    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            const { data } = await this.$http.post('/logins/', values)
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
.new-pass-wrapper {
  margin: 20px 50px;
}

.ant-input-group-addon {
  background-color: transparent;
  border: 0;
  padding-right: 0;
}
</style>
