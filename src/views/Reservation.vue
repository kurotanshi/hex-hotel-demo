<template>
  <div class="container">
    <fixed-bar currPage="Details" />

    <div class="form">
      <h1 class="reservation-title">Reservation information</h1>
      
      <label>
        <input type="text" v-model.trim="name" placeholder="Fill Your Name">
        <div><i class="material-icons">person</i> Name</div>
      </label>

      <label>
        <div><i class="material-icons">smartphone</i> Phone</div>
        <input type="text" v-model.trim="phone" placeholder="Fill Your Phone">
      </label>

      <div 
        :class="{ 'disabled': ( name === '' || phone === '' ) }"
        class="action-wrap" @click="reserveRoom">reserve now</div>
    </div>

    <div class="info">
      <img :src="roomInfo.imageUrl[0]" :alt="roomInfo.name" v-if="roomInfo.imageUrl">
      <div class="room-name">{{ roomInfo.name }}</div>

      <div class="room-date"> 
        <i class="material-icons">date_range</i>
        <em>Check-In</em>
        <span class="date">{{ reservationFrom }}</span>
      </div>

      <div class="room-date"> 
        <i class="material-icons">date_range</i>
        <em>Check-Out</em>
        <span class="date">{{ reservationTo }}</span>
      </div>

      <div class="room-bill">
        <div class="booking-subtotal">
          <ul>
            <li v-show="workingdays > 0">
              <!-- working days -->
              <span class="item">$ {{ roomInfo.normalDayPrice | commaFormat }} × {{ workingdays }} night (Weekdays)</span>
              <span class="booking-price">$ {{ roomInfo.normalDayPrice * workingdays | commaFormat }}</span>
            </li>
            <li v-show="holidays > 0">
              <!-- holiday days -->
              <span class="item">$ {{ roomInfo.holidayPrice | commaFormat }} × {{ holidays }} night (Holidays)</span>
              <span class="booking-price">$ {{ roomInfo.holidayPrice * holidays | commaFormat }}</span>
            </li>
            <li>
              <!-- Service Fee -->
              <span class="item">Service Fee</span>
              <span class="booking-price">$ {{ serviceFee | commaFormat }}</span>
            </li>
          </ul>
          <div class="total-price">
            <span class="summary-item">TOTAL</span>
            <span class="summary-price">$ {{ totalPrice | commaFormat }}</span>
          </div>
        </div>
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
      name: '',
      phone: ''
    }
  },
  methods: {
    reserveRoom() {
      if( this.name === '' || this.phone === '' ) {
        return;
      }

      store.dispatch('roomBooking', { 
        roomId: this.roomId,
        roomName: this.roomInfo.name,
        name: this.name,
        phone: this.phone,
        date: this.reservation.date
      })
      .then(() => {
        this.$router.push({ name: 'thanks' });
      });

    }
  },
  created () {
    store.dispatch('getRoomDetail', { roomId: this.roomId })
    .then(() => {
      this.calDate(this.reservationFrom, this.reservationTo);
    })
  }
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
}

.form, .info{
  box-sizing: border-box;
  display: block;
  width: 350px;
  height: 660px;
  // border: 1px solid #2D3643;
  margin: 40px 0 0;
}

.form {
  float: left;
  
  > label {
    display: block;
    position: relative;
    margin-top: 40px;
    padding-top: 30px;
    > div {
      position: absolute;
      top: 0;
    }
  }

  i {
    position: relative;
    top: 5px;
    margin-right: 5px;
  }

  input {
    display: block;
    width: 90%;
    height: 30px;
    line-height: 30px;
    margin-top: 16px;
    border: none;
    border-bottom: 1px solid #748290;
    outline: none;
    font-size: 16px;
    padding: 0 5px;
    
    &:focus {
      color: #569DC3;
      border-bottom: 1px solid #569DC3;
      & + div {
        color: #569DC3;
      }
    }
  }
}

.info {
  float: right;
  border: 1px solid #2D3643;

  > img {
    display: block;
    width: 348px;
    height: 204px;
    border-bottom: 1px solid #2D3643;
    object-fit: cover;
  }

  > div {
    display: block;
    min-height: 75px;
    border-bottom: 1px solid #2D3643;
    &:last-child {
      border: none;
    }
  }
  
  .room-name {
    color: #2D3643;
    font-size: 24px;
    font-weight: 900;
    line-height: 75px;
    text-align: center;
  }
  
  .room-date {
    position: relative;
    padding-left: 32px;
    padding-right: 32px;
    line-height: 75px;
    > i {
      position: relative;
      top: 5px;
    }
    em {
      margin-left: 1em;
      color: #748290;
    }
    .date {
      position: absolute;
      right: 33px;
      font-family: 'Open Sans';
      font-size: 16px;
      color: #2D3643;
    }
  }
}

.action-wrap {
  text-transform: uppercase;
  margin-top: 60px;
  font-family: 'Open Sans';
  height: 72px;
  line-height: 72px;
  cursor: pointer;
  
  &.disabled{
    background-color: #eee;
    color: #999;
    cursor: not-allowed;
  }
}

</style>