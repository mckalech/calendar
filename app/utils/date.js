var moment = require('moment');

module.exports = {
	daysInMonth : function(mom) {
		return mom.daysInMonth();
	},
	weeksInMonth : function(mom) {
		var count = this.daysInMonth(mom)%7>0 || this.firstDayInMonth(mom)!=0 ? 5 : 4
		if(this.daysInMonth(mom)%7 > 7-this.firstDayInMonth(mom)){
			count++
		}
		return count
	},
	firstDayInMonth : function(mom) {
		return this.getNormalDay(moment([mom.year(), mom.month(), 1]));
	},
	getNormalDay : function(mom) {
		return mom.day()>0 ? mom.day()-1 : 6
	},
	isInMonth : function(mom, monthMoment){
		var start = moment(monthMoment).startOf('month'),
		end = moment(monthMoment).endOf('month');
		mom.seconds(1);
		return mom.isBetween(start, end);
	},
	texts : {
		days 		:	['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
		months 		:	['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		monthSklon 	: 	['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
	}
}	