<template>
  <div class="container">
    <fixed-bar currPage="Details" />
    <h1 class="reservation-title">Reservation received!</h1>
    
    <div class="section">
      <div class="wrap">
        <div class="title">GUEST</div>
        <div class="val">{{ reservation.name }}</div>
      </div>
      <div class="wrap">
        <div class="title">PHONE</div>
        <div class="val">{{ reservation.phone }}</div>
      </div>
    </div>

    <div class="section">
      <div class="wrap">
        <div class="title">ROOM</div>
        <div class="val">{{ reservation.roomName }}</div>
      </div>
    </div>

    <div class="section">
      <div class="wrap">
        <div class="title">CHENK-IN</div>
        <div class="val">{{ reservationFrom }}</div>
      </div>
      <div class="wrap">
        <div class="title">CHENK-OUT</div>
        <div class="val">{{ reservationTo }}</div>
      </div>
    </div>


  </div>
</template>

<script>
import mixins from '@/mixins';
import store from '@/store';
import FixedBar from '@/components/FixedNav.vue';

export default {
  name: 'reservation',
  mixins: [mixins],
  components: {
    FixedBar,
  },
  computed: {
    serviceFee () {
      return store.state.serviceFee;
    },
    roomInfo () {
      return store.state.currentRoomInfo;
    },
    reservation () {
      return store.state.reservation;
    },
    user () {
      return store.state.user;
    },
    reservationFrom () {
      return this.reservation.date[0];
    },
    reservationTo () {
      let d = new Date(this.reservation.date[ this.reservation.date.length - 1 ]);
      return this.dateFormat( this.addDate(d, 1) );
    },
  },
  data () {
    return {
      roomId: this.$route.params.id,
    }
  },
  methods: { },
  // created () { }
}
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden;
  width: 730px;
  padding-top: 115px;
}

.reservation-title {
  display: block;
  width: 350px;
  font-weight: 900;
  font-size: 36px;
  color: #2D3643;
  text-transform: capitalize;
  line-height: 1.7;
  margin-bottom: 48px;
}

.section {
  padding: 12px 0;
  border-top: 1px solid #E3E6E9;

  &:last-child {
    border-bottom: 1px solid #E3E6E9;
  }

  .wrap {
    display: block;
    overflow: hidden;
    height: 40px;
    line-height: 40px;
    color: #2D3643;
  }

  .title {
    position: absolute;
    left: 0;
    text-transform: capitalize; 
    font-weight: 900;
  }

  .val {
    position: absolute;
    left: 160px;
    font-weight: 300;
  }
}
</style>