import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'Bearer So8gvO9dez0CjdjBVN11XIDrDlyLioNXs2S6AMUlXIHVrsB2FC0nujBeQLI5'
}

const SERVICE_FEE = 1200;

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    serviceFee: SERVICE_FEE,
    rooms: [],
    currentRoomInfo: {
      disabledDates: []
    },
    reservation: {
      roomName: '',
      roomId: '',
      name: '',
      tel: '',
      date: []
    }
  },
  mutations: {
    setRoomsInfo (state, val) {
      state.rooms = val;
    },
    setCurrRoomInfo (state, val) {
      // console.log(obj);
      state.currentRoomInfo = val;
    },
    setReservationDate(state, val) {
      console.log('setReservationDate', val);
      
      if (val.roomId) state.reservation.roomId = val.roomId;
      if (val.roomName) state.reservation.roomName = val.roomName;
      if (val.date && val.date.length > 1) state.reservation.date = val.date;
      if (val.name) state.reservation.name = val.name;
      if (val.phone) state.reservation.phone = val.phone;
    },
    resetReservation(state) {
      // reset
      state.reservation = {
        roomId: '',
        name: '',
        phone: '',
        date: []
      };
    }
  },
  actions: {
    getRoomsInfo ({ commit, state }) {
      // 取得所有房型簡介
      Axios.get('https://challenge.thef2e.com/api/thef2e2019/stage6/rooms', { headers })
        .then(res => {
          if (res.data.success) {
            commit('setRoomsInfo', res.data.items);
          }
        })
    },
    getRoomDetail ({ commit, state }, obj) {
      // 取得單一房型資訊
      Axios.get('https://challenge.thef2e.com/api/thef2e2019/stage6/room/' + obj.roomId, { headers })
        .then(res => {
          if (res.data.success) {
            console.log(res.data);

            const room = res.data.room[0];
            if( res.data.booking.length > 0 ) {
              room.disabledDates = res.data.booking.map( d => d.date );
            }
            commit('setCurrRoomInfo', room);
          }
        })
    },
    roomBooking ({ commit, state }, obj) {
      const vm = this;
      // 預約房型
      Axios.request({
          url: `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${obj.roomId}`,
          method: 'post',
          headers: headers, 
          data: {
            name: obj.name,
            tel: obj.phone,
            date: obj.date
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.success) {        
            commit('setReservationDate', obj);
          }
        }).catch(error => {
          if(error.response){
            alert(error.response.data.message);
          }
        });
    },
    setReservationDate({ commit, state }, obj) {
      // 儲存訂房日期
      commit('setReservationDate', obj);
    }
  }
})
