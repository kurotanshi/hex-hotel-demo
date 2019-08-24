<template>
  <div id="app">
    <router-view/>
    
    <footer-block/>
  </div>
</template>

<script>
import './styles/reset.scss'
import './styles/base.scss'
import './styles/style.scss'

import FooterBlock from './components/footer.vue'

export default {
  name: 'app',
  components: {
    FooterBlock
  }
}
</script>
