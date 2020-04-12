<template>
  <div>
    <a-button type="link" size="small" icon="lock" @click="showPassword = !showPassword" />
    <a-tooltip placement="top" title="Copy">
      <a-button type="link" size="small" icon="copy" v-clipboard:copy="password" />
    </a-tooltip>
    {{ showPassword ? password : '• • • • •' }}
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
