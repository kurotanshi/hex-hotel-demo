<template>
<transition name="slide">
  <div class="fixed-navbar" v-show="isFixedBarShow">
    <div class="container">
      <a @click.prevent="onHomeClick" href="#" class="navbar-brand"><i class="logo"></i></a>
    </div>
  </div>
</transition>
</template>

<script>
function scrollToY (scrollTargetY, speed, easing) {
  // scrollTargetY: the target scrollY property of the window
  // speed: time in pixels per second
  // easing: easing equation to use

  var scrollY = window.scrollY || document.documentElement.scrollTop
  var currentTime = 0
  scrollTargetY = scrollTargetY || 0
  speed = speed || 2000
  easing = easing || 'easeOutSine'

  // min time .1, max time .8 seconds
  var time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8))

  // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
  var easingEquations = {
    easeOutSine: function (pos) {
      return Math.sin(pos * (Math.PI / 2))
    },
    easeInOutSine: function (pos) {
      return (-0.5 * (Math.cos(Math.PI * pos) - 1))
    },
    easeInOutQuint: function (pos) {
      if ((pos /= 0.5) < 1) {
        return 0.5 * Math.pow(pos, 5)
      }
      return 0.5 * (Math.pow((pos - 2), 5) + 2)
    }
  }

  // add animation loop
  function tick () {
    currentTime += 1 / 60

    var p = currentTime / time
    var t = easingEquations[easing](p)

    if (p < 1) {
      window.requestAnimFrame(tick)
      window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t))
    } else {
      // console.log('scroll done');
      window.scrollTo(0, scrollTargetY)
    }
  }

  // call it once to get started
  tick()
}

export default {
  name: 'FixedNavbar',
  props: {
    currPage: {
      type: String,
      default: 'Home'
    }
  },
  data () {
    return {
      isFixedBarShow: false
    }
  },
  methods: {
    scrollTo (target) {
      const el = this.$el.querySelector('.fixed-navbar');
      // 72 => height of fixbar.
      scrollToY(el.offsetTop - 72, 1000, 'easeInOutQuint');
    },
    setScrollBarFixed () {
      if( this.currPage === 'Home' ) {
        const scrollTopPos = 80;

        window.addEventListener('scroll', () => {
          if (window.pageYOffset > scrollTopPos) {
            this.isFixedBarShow = true;
          } else {
            this.isFixedBarShow = false;
          }
        })
      }
      else {
        this.isFixedBarShow = true;
      }

    },
    onHomeClick() {
      if( this.currPage !== 'Home' )
        this.$router.push({ name: 'home' });
    }
  },
  mounted () {
    this.setScrollBarFixed();
  }
}
</script>

<style scoped lang="scss">
// slide
.slide-enter-active, .slide-leave-active {
  transform: scaleY(1);
}

.slide-enter, .slide-leave-to {
  transform: scaleY(0);
}

.fixed-navbar {
  top: 0;
  left: 0;
  display: block;
  position: fixed;
  width: 100%;
  height: 72px;
  background-color: #fff;
  box-shadow: 0 2px 7px #ccc;
  z-index: 100;

  // transform
  transform-origin: top;
  transition: transform 2s ease;
}

.navbar-brand {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 80px;
  height: 72px;
  line-height: 72PX;
  background-color:#2D3643;
  color: #fff;
  text-align: center;

  > i {
    font-family: "Helvetica Neue";
    font-size: 48px;
    font-weight: bold;
    font-style: italic;

    &:before, &:after {
      left: 12px;
      position: absolute;
      content: 'H';
    }
    &:after{
      left: 32px;
    }
  }
}

.date-picker-wrap,
.room-picker-wrap,
.action-wrap {
  position: relative;
  display: block;
  box-sizing: border-box;
  float: left;
  width: 26.3%;
  height: 72px;
  line-height: 72px;
  text-transform: uppercase;
  padding-left: 30px;
  color: #748290;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }

  &:after {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #2D3643;
    top: 50%;
    margin-top: -5px;
    right: 32px;
  }

  .material-icons {
    position: relative;
    top:4px;
    margin-right: 16px;
    color: #2D3643;
  }
}

.date-picker-wrap {
  margin-left: 82px;
  width: 40%;
}

.action-wrap{
  background-color: #569DC3;
  color: #fff;
  text-align: center;
  padding-left: 0;

  &:hover {
    background-color: #569DC3;
  }
  &:after {
    display: none;
  }
}

</style>
