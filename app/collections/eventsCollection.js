var Backbone = require('backbone');
Backbone.LocalStorage = require("backbone.localstorage");
var EventModel = require('../models/eventModel');
var dateUtils = require('../utils/date');
var moment = require('moment');


var EventsCollection = Backbone.Collection.extend({
	model: EventModel,
	localStorage: new Backbone.LocalStorage("EventsCollection"),
	url: '/events',
	initialize: function(){
	},
	filterByMonth:function(monthMoment) {
		return this.filter(function(evnt){
			return dateUtils.isInMonth(moment(evnt.get('date'),'D-M-YYYY'), monthMoment);
		});
	},
	filterByQuery: function(query){
		return new Backbone.Collection(this.filter(function(evnt){
			var title = evnt.get('title').toLowerCase(),
			descr = evnt.get('description').toLowerCase();
			query = query.toLowerCase();
			if(title.indexOf(query) > -1 || descr.indexOf(query) > -1){
				return true;
			}
			
		})).sortBy(function(evnt){
			return moment(evnt.get('date'),'D-M-YYYY').unix();
		});	
	},
	findByDate: function(date){
		return this.find(function(evnt){
			return evnt.get('date') == date;
		});
	}

});

module.exports = EventsCollection;




