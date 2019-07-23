<template>
  <div class="home">
    <Timer :durationInMilliseconds="1000"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Timer from '@/components/Timer.vue'

export default {
  name: 'home',
  components: {
    Timer
  }
}
</script>
