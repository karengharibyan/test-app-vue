<template>
  <div class="home">
    <div v-if="$auth.check()">
      {{userName}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  mounted(){
  },
  computed: {
    userName: function(){
      if(this.$auth.check()){
        return `Hello ${this.$auth.user().first_name} ${this.$auth.user().last_name}`
      }
      return ""
    }
  }
}
</script>
