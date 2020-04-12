<template>
  <div>
    {{ showPassword ? password : '• • • • • • • •' }}
    <a-button type="link" icon="lock" @click="showPassword = !showPassword" />
    <a-tooltip placement="top" title="Copy">
      <a-button type="link" icon="copy" v-clipboard:copy="password" />
    </a-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    password: String
  },

  data() {
    return {
      showPassword: false
    }
  }
}
</script>
