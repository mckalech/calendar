var $ = require('jquery-untouched');
var Backbone = require('backbone');
var dateUtils = require('../utils/date');
var moment = require('moment');
Backbone.$ = $;
var monthTemplate = require('../templates/month.html');

var EventsView = Backbone.View.extend({
	el : $('.b-table'),
	template : monthTemplate,
	events : {
		'click .b-cell': 'openForm'
	},
	initialize:function(options){
		var that = this;
		this.currentDate = options.currentDate;
		this.router = options.router;
		
		this.collection.fetch();
		this.render();

		this.collection.on('change',function(){
			that.render();
		});
		this.currentDate.on('change',function(){
			that.render();
		});
	},
	render : function() {

		this.renderTable(this.currentDate.get('date'));
		this.renderData(this.currentDate.get('date'));
	},
	renderTable:function(now){
		this.$el.html(this.template({
			weeksInMonth : dateUtils.weeksInMonth(now),
			firstDayInMonth : dateUtils.firstDayInMonth(now),
			daysInMonth : dateUtils.daysInMonth(now),
			texts: dateUtils.texts
		}));
	},
	renderData:function(now){
		var that = this;
		this.collection.filterByMonth(now).forEach(function(evnt){
			var date = moment(evnt.get('date'), 'D-M-YYYY').date(),
			$cell = that.$(`[data-date="${date}"]`);
			$cell.find('.title').text(evnt.get('title'));
			$cell.find('.description').text(evnt.get('description'));
			$cell.addClass('b-cell_full');
		});
	},
	openForm:function(e){
		var date = this.currentDate.get('date'),
		day = $(e.currentTarget).data('date');
		date = date.date(day).format('D-M-YYYY');
		this.router.goToDate(date);
	}
});

module.exports = EventsView;