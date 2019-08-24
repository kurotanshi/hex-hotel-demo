<template>
  <div>
    <fixed-bar currPage="Home" />

    <div class="container">
      <div class="main-banner">
        <h1 class="main-title">HexHotel</h1>
      </div>
      <nav class="main-menu">

      </nav>
    </div>

    <section class="container mt1e">
      <h2 class="section-title">Recommend</h2>
      <div class="section-sub-title">You may be interested in our popular rooms</div>

      <ul class="room-list full">
        <li v-for="r in recommends" :key="r.id" class="room-info">
          <a href="#" @click.prevent="onRoomClick(r.id)">
            <img class="room-thumb-img" :src="r.imageUrl" :alt="r.name">
            <h3 class="room-title">{{ r.name }}</h3>
            <div class="room-price">${{ r.holidayPrice | commaFormat }} NTD / night</div>
          </a>
        </li>
      </ul>
    </section>

    <section class="full-container sub-banner">
      <div class="container">
        <h2 class="banner-title">Reserve the best service</h2>
        <div class="banner-sub-title">over 50,000 commendations from our guests</div>
      </div>
    </section>

    <room-intro title="One person" sub="Enjoy the one and only service" :rooms="single"></room-intro>
    <room-intro title="Two people" sub="The perfect choice for both of you" :rooms="double"></room-intro>
    <room-intro title="Family" sub="Wanna a big room? there you are" :rooms="twins"></room-intro>
  
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store'
import FixedBar from '@/components/FixedNav.vue';
import RoomIntro from '@/components/RoomIntro.vue';
import VueHotelDatepicker from '@northwalker/vue-hotel-datepicker';

import mixins from '@/mixins';

export default {
  name: 'home',
  mixins: [mixins],
  components: {
    FixedBar,
    RoomIntro,
    VueHotelDatepicker
  },
  computed: {
    rooms () {
      return store.state.rooms
    },
    recommends () {
      const rooms = [...this.rooms]
      return rooms.sort(() => Math.random() - 0.5).splice(0, 3)
      // return rooms.sort((a, b) => b.holidayPrice - a.holidayPrice).splice(0, 3)
    },
    single () {
      return this.rooms.filter(d => d.name.indexOf('Single Room') > -1)
    },
    double () {
      return this.rooms.filter(d => d.name.indexOf('Double Room') > -1)
    },
    twins () {
      return this.rooms.filter(d => d.name.indexOf('Twin Room') > -1)
    }
  },
  methods: {
    onRoomClick(roomId) {
      this.$router.push({ name: 'room', params: { id: roomId } });
    }
  },
  created () {
    // this.getAllRooms()
    store.dispatch('getRoomsInfo')
  }
}
</script>
