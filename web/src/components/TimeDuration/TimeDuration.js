const ONESECOND = 1000;
// const LANGUAGE = 'en-GB';
export default {
	name: 'TimeDuration',
	props: ['timeIn', 'timeOut', "dateServer"],
	data() {
		return {
			interval: null,
			time: null,
			date: null,
			count: 0,
		};
	},
	beforeDestroy() {
		// prevent memory leak
		clearInterval(this.interval);
	},
	created() {
		// const date = new Date(this.dateServer);
		// update the time every second
		this.interval = setInterval(() => {
			const newDate = new Date(this.dateServer)
			this.count++
			newDate.setSeconds(newDate.getSeconds() + this.count)
			// Concise way to format time according to system locale.
			// In my case this returns "3:48:00 am"
			this.time = newDate.toLocaleTimeString()
			this.date = newDate.toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric"
			})
			// this.date = Intl.DateTimeFormat(LANGUAGE, {
			// 	dateStyle: 'long',
			// }).format();
		}, ONESECOND);
	},
};
