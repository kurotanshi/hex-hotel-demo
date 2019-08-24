const Mixins = {
  data () {
    return {
      maxDate: this.addDate(new Date(), 90),
      booking: {
        start: '',
        end: '',
        date: []
      },
      holidays: 0,
      workingdays: 0
    }
  },
  computed: {
    totalPrice () {
      return this.roomInfo
        ? this.holidays * this.roomInfo.holidayPrice + this.roomInfo.normalDayPrice * this.workingdays + this.serviceFee
        : 0;
    }
  },
  methods: {
    addDate (date, days) {
      days = days || 0
      const newDate = new Date(Number(date))
      newDate.setDate(date.getDate() + days)
      return newDate
    },
    resetDate () {
      this.booking.start = '';
      this.booking.end = '';
    },
    updateDate (date) {
      
      console.log(date);
      
      this.booking.start = new Date(date.start);
      this.booking.end = new Date(date.end);
      this.calDate();
    },
    calDate (start, end) {
      this.booking.date = [];
      let holidays = 0;
      let workingdays = 0;

      let from = start ? new Date(start) : this.booking.start,
            to = end ? new Date(end) : this.booking.end;

      while (from < to) {
        let day = from.getDay();
        if((day === 6) || (day === 0)){
          holidays++;          
        }
        else {
          workingdays++;
        }

        if(!start && !end) {
          this.booking.date.push( this.dateFormat(from) );
        }
        from.setDate(from.getDate() + 1);
      }

      this.holidays = holidays;
      this.workingdays = workingdays;
    },
    dateFormat(date){
      let y = date.getFullYear().toString(),
          m = (date.getMonth() + 1).toString(),
          d = date.getDate().toString();

      // add zero
      m = (m.length === 1) ? '0' + m : m;
      d = (d.length === 1) ? '0' + d : d;

      return y + '-' + m + '-' + d;
    },
  }
}

export default Mixins;