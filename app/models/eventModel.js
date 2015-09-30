var Backbone = require('backbone');
var moment = require('moment');

var EventModel = Backbone.Model.extend({
	defaults:{
		date:  moment().format('D-M-YYYY'),
	    title: '',
	    description: ''
	}, 
	_to_str: function(){
		return `TITLE: ${this.get('title')}, DATE: ${this.get('date')}, DESCR: ${this.get('description')}`;
	},
	validate:function(attrs){
		if(!attrs.title.trim().length){
			return 'Заголовок должен быть заполнен';
		}
		if(!attrs.description.trim().length){
			return 'Описание должно быть заполнено';
		}
	}
});

module.exports = EventModel;

