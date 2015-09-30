var $ = require('jquery-untouched');
var Backbone = require('backbone');
var dateUtils = require('../utils/date');
var moment = require('moment');
Backbone.$ = $;
var headerTemplate = require('../templates/header.html');

var HeaderView = Backbone.View.extend({
	el : $('.b-header'),
	template : headerTemplate,
	events : {
		'click .b-header__nav_prev' : 'prevMonth',
		'click .b-header__nav_next' : 'nextMonth',
		'click .b-header__today-btn' : 'todayMonth'
	},
	initialize:function(options){
		var that = this;
		this.currentDate = options.currentDate;
		this.render();
		this.currentDate.on('change',function(){
			that.render();
		});
	},
	render : function() {
		var that = this;
		this.$el.html(this.template({
			date: this.currentDate.get('date').format('MMMM YYYY')
		}));
	},
	prevMonth: function(){
		this.currentDate.prevMonth()
	},
	nextMonth: function(){
		this.currentDate.nextMonth()
	},
	todayMonth: function(){
		this.currentDate.todayMonth()
	}
});

module.exports = HeaderView;