<template>
  <div class="container">
    <fixed-bar currPage="Details" />

    <div class="room-details" v-if="roomInfo.name">
      <h1 class="room-title">{{ roomInfo.name }}</h1>
      <div class="img-wrap">
        <img class="main-img" :src="roomInfo.imageUrl[currImageIdx]" :alt="roomInfo.name">
        <div class="price-des">weekday price</div>
      </div>

      <ul class="photo-list">
        <li v-for="(img, idx) in roomInfo.imageUrl" :key="img" @click.prevent="setCurrImg(idx)">
          <img :src="img" :alt="roomInfo.name" class="sub-img">
        </li>
      </ul>

      <section class="room-description">
        <h3 class="description-title">description</h3>
        <p>
          {{ guests }} Guest・{{ roomInfo.descriptionShort.Bed.length }} 
          Bed ({{ roomInfo.descriptionShort.Bed[0] }})・{{ roomInfo.descriptionShort['Private-Bath'] }}
          Private Bath・{{ roomInfo.descriptionShort.Footage }} m²
        </p>
        <p>{{ roomInfo.description }}</p>
        <p>
          Check-in is from {{ roomInfo.checkInAndOut.checkInEarly }} to {{ roomInfo.checkInAndOut.checkInLate }} 
          Check-out is before {{ roomInfo.checkInAndOut.checkOut }}
        </p>
      </section>

      <section class="room-description">
        <h3 class="description-title">Amenities</h3>
        <ul class="amenities-list">
          <li :class="{ 'active' : roomInfo.amenities['Wi-Fi'] }"><i class="material-icons">wifi</i> Wi-Fi</li>
          <li :class="{ 'active' : roomInfo.amenities['Television'] }"><i class="material-icons">personal_video</i> Television</li>
          <li :class="{ 'active' : roomInfo.amenities['Great-View'] }"><i class="material-icons">landscape</i> great view</li>
          <li :class="{ 'active' : roomInfo.amenities['Breakfast'] }"><i class="material-icons">restaurant</i> breakfast</li>
          <li :class="{ 'active' : roomInfo.amenities['Air-Conditioner'] }"><i class="material-icons">ac_unit</i> air conditioner</li>
          <li :class="{ 'active' : roomInfo.amenities['Smoke-Free'] }"><i class="material-icons">smoke_free</i> smoke free</li>
          <li :class="{ 'active' : roomInfo.amenities['Mini-Bar'] }"><i class="material-icons">local_bar</i> mini bar</li>
          <li :class="{ 'active' : roomInfo.amenities['Refrigerator'] }"><i class="material-icons">kitchen</i> refrigerator</li>
          <li :class="{ 'active' : roomInfo.amenities['Child-Friendly'] }"><i class="material-icons">child_care</i> child-friendly</li>
          <li :class="{ 'active' : roomInfo.amenities['Room-Service'] }"><i class="material-icons">room_service</i> room service</li>
          <li :class="{ 'active' : roomInfo.amenities['Sofa'] }"><i class="material-icons">weekend</i> sofa</li>
          <li :class="{ 'active' : roomInfo.amenities['Pet-Friendly'] }"><i class="material-icons">pets</i> pet-friendly</li>
        </ul>
      </section>

      <!-- <section class="room-description">
        <h3 class="description-title">Availability</h3>
        <div class="date-picker-wrap">
          <i class="material-icons">date_range</i>
          <VueHotelDatepicker
            @reset="resetDate"
            @confirm="updateDate"
            :disabledDates="roomInfo.disabledDates"
            :maxDate="maxDate"
            :startDate="booking.start"
            :endDate="booking.end"
            format="YYYY-MM-DD"
            separator="-"
            placeholder="Check-in / Check-Out" />
        </div>
      </section> -->

    </div>

    <aside class="aside-reserve">
      <div class="aside-price"><em>$ {{ roomInfo.normalDayPrice | commaFormat }} NTD</em> / night</div>
      <div class="aside-holiday-price">Holiday price - $ {{ roomInfo.holidayPrice | commaFormat }} NTD / night</div>
      
      <div class="datepicker-wrap">
        <div class="datepicker">
          <i class="material-icons">date_range</i>
          <VueHotelDatepicker
            @reset="resetDate"
            @confirm="updateDate"
            :disabledDates="roomInfo.disabledDates"
            :maxDate="maxDate"
            :startDate="booking.start"
            :endDate="booking.end"
            format="YYYY-MM-DD"
            separator="-"
            mobile="mobile"
            placeholder="Check-in / Check-Out" />
        </div>

        <div class="booking-subtotal" v-show="booking.start !== '' && booking.end !== ''">
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

        <div class="action-wrap" :class="{'disabled': booking.date.length === 0 }"
          @click="reserveRoom">reserve now</div>
      </div>
    </aside>

    <Loading v-if="!roomInfo.name || isLoading" />
  </div>
</template>

<script>
import store from '@/store';
import VueHotelDatepicker from '@northwalker/vue-hotel-datepicker';

import FixedBar from '@/components/FixedNav.vue';
import Loading from '@/components/Loading.vue';

import mixins from '@/mixins';

export default {
  name: 'room',
  mixins: [mixins],
  components: {
    VueHotelDatepicker,
    FixedBar,
    Loading
  },
  computed: {
    serviceFee () {
      return store.state.serviceFee;
    },
    roomInfo () {
      return store.state.currentRoomInfo;
    },
    guests () {
      return (this.roomInfo.descriptionShort.GuestMin === this.roomInfo.descriptionShort.GuestMax)
        ? this.roomInfo.descriptionShort.GuestMin : this.roomInfo.descriptionShort.GuestMin + '-' + this.roomInfo.descriptionShort.GuestMax;
    }
  },
  data () {
    return {
      isLoading: false,
      roomId: this.$route.params.id,
      currImageIdx: 0,
    }
  },
  created () {   
    this.isLoading = true;
    // get room details.   
    store.dispatch('getRoomDetail', { roomId: this.roomId })
      .then( () => {
        setTimeout( () => {
          this.isLoading = false;
        }, 1000);
      });
  },
  methods: {
    setCurrImg (idx) {
      this.currImageIdx = idx
    },
    reserveRoom() {
      if( this.booking.date.length > 0) {
        store.dispatch('setReservationDate', { 
          roomId: this.roomId, 
          date: this.booking.date 
        })
          .then( () => {
            this.$router.push({ name: 'reservation', params: { id: this.roomId } });
          });
      }

    }
  }
}
</script>

<style scoped>
.datepicker-wrap >>> .vhd-container {
  background-color: #fff;
  width: 350px;
  cursor: pointer;
  border-bottom: 1px solid #2d3643;
}

.datepicker-wrap >>> .vhd-input {
  position: relative;
  left: 45px;
  border: none;
  cursor: pointer;
  width: 300px;
  min-width: 300px;
}

.datepicker-wrap >>> .vhd-container.mobile .vhd-picker{
  width: 350px;
  border-radius: 0;
}

.datepicker-wrap >>> .vhd-calendar .calendar-month{
  top: -25px;
}

.datepicker-wrap >>> .vhd-calendar-footer {
  top: 40px;
}
</style>

<style lang="scss" scoped>
  @import "../styles/room.scss";
</style>