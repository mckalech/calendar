var Backbone = require('backbone');
var $ = require('jquery-untouched');

var EventsView = require('./views/eventsView');
var EventsCollection = require('./collections/eventsCollection');
var CurrentDateModel = require('./models/currentDateModel');
var HeaderView = require('./views/headerView');
var SGView = require('./views/suggestView');
var MainRouter = require('./routers/mainRouter');

$(function(){
	var eventsCollection = new EventsCollection();
	var currentDate = new CurrentDateModel();

	var mainRouter = new MainRouter({eventsCollection, currentDate});
	var eventsView = new EventsView({collection:eventsCollection, currentDate, router: mainRouter});
	var headerView = new HeaderView({currentDate});
	var sgView = new SGView({collection:eventsCollection, router: mainRouter});

	Backbone.history.start();
});
 


