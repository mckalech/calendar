var $ = require('jquery-untouched');
var Backbone = require('backbone');
var dateUtils = require('../utils/date');
var moment = require('moment');
Backbone.$ = $;
var sgTemplate = require('../templates/sg.html');


var SGView = Backbone.View.extend({
	el : $('.b-search'),
	template : sgTemplate,
	initialize : function(options) {	
		this.$searchQ 	= 	$('.b-search__input');
		this.$searchSug	= 	$('.b-search__sg');
		this.router = options.router;
		this.items = [];
		this.render();
		this.bindDocumentEvent();
	},
	render : function() {
		if(this.items.length){				
			this.$searchSug.html(this.template({
				foundEvents: this.items || []
			}));
			this.$searchSug.show();
		}else{
			this.hide();
		}
	}, 
	events : {
		'keyup .b-search__input' : 'keyPress',
		'click .b-search__sg li' : 'goToSuggestedCell'
	},
	keyPress: function(e){
		var query = $(e.currentTarget).val(), 
		isWords = false;
		this.items = [];
		if(query.length>2){
			this.items = this.collection.filterByQuery(query).map(function(evnt){
				return {
					title: evnt.get('title'),
					description: evnt.get('description'),
					date: evnt.get('date'),
					dateString: moment(evnt.get('date'), 'D-M-YYYY').format('D MMMM')
				}
			});
		}
		this.render();
	},
	goToSuggestedCell : function(e) {
		var $cell = $(e.currentTarget),
		date = $cell.data('date');
		this.router.goToDate(date);
		this.$searchQ.val('');
		this.hide();
	},
	hide : function(){
		this.$searchSug.html('').hide();
	},
	bindDocumentEvent:function(){
		var $el,
		that = this;
		$(document).on('click', function(e){
			$el = $(e.target);
			if(!$el.parents('.b-search__sg').length){
				that.hide();
			}
		})
	}
});

module.exports = SGView;