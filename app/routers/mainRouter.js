var Backbone = require('backbone');
var FormView = require('../views/formView');

var MainRouter = Backbone.Router.extend({
	initialize:function(options){
		this.currentDate = options.currentDate;
		this.formView = new FormView({
			eventsCollection : options.eventsCollection,
			currentDate: options.currentDate,
			router:this
		});
	},
	routes : {
		"" : "calendar",
		"!/event/:date" : "eventPath",
		"*path": "route404"
	},
	calendar: function(){
		this.formView.hidePopup();
	},
	eventPath: function(date){
		this.formView.openForm(date);
	},
	route404: function(){
		this.goToMainPage()
	},
	goToMainPage:function(){
		this.navigate('/', {trigger: true});
	},
	goToDate:function(date){
		this.navigate('!/event/'+date, {trigger: true});
	}
});

module.exports = MainRouter;