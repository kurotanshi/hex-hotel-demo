<template>
  <section class="container mt1e room-intro">
    <h2 class="room-intro-title">{{ title }}</h2>
    <div class="room-intro-sub">{{ sub }}</div>
    <ul class="room-list">
      <li class="room-info" v-for="r in rooms" :key="r.id">
        <a href="#" @click.prevent="onRoomClick(r.id)">
          <img class="room-thumb-img" :src="r.imageUrl" :alt="r.name">
          <h3 class="room-title">{{ r.name }}</h3>
          <div class="room-price">${{ r.holidayPrice | commaFormat }} NTD / night</div>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
    sub: String,
    rooms: Array
  },
  methods: {
    onRoomClick(roomId) {
      this.$router.push({ name: 'room', params: { id: roomId } });
    }
  }
}
</script>

<style lang="scss" scoped>
.room-intro {
  position: relative;
  height: 294px;
  margin-bottom: 3em;

  &-title{
    display: block;
    font: Bold 36px/54px 'Open Sans';
    color: #748290;
  }

  &-sub {
    display: block;
    font: Regular 16px/24px 'Open Sans';
    color: #748290;
  }

  .room-list {
    position: absolute;
    top: 0;
    right: 0;

  }
}

</style>
