var Backbone = require('backbone');
var moment = require('moment');
require('moment/locale/ru');


var CurrentDateModel = Backbone.Model.extend({
	defaults:{
		date:  moment(),
	},
	nextMonth:function(){
		this.get('date').add(1, 'months');
		this.trigger('change');
	},
	prevMonth:function(){
		this.get('date').add(-1, 'months');
		this.trigger('change');
	},
	todayMonth:function(){
		this.set({date:moment()});
		this.trigger('change');
	},
	goToDate:function(date){
		this.set({date:moment(date,'D-M-YYYY')});
		this.trigger('change');
	}
});

module.exports = CurrentDateModel;

