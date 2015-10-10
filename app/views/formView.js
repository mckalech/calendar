var $ = require('jquery-untouched');
var Backbone = require('backbone');
var moment = require('moment');
var EventModel = require('../models/eventModel');
Backbone.$ = $;
var formTemplate = require('../templates/form.html');

var FormView = Backbone.View.extend({
	el : $('.b-popup'),
	template : formTemplate,
	events : {
		'click' : 'overlayClick',
		'click .b-popup__close' : 'closeClick',
		'submit form': 'submitForm',
		'click .b-popup__btn_delete' : 'deleteClick',
		'click .b-popup__btn_save' : 'submitForm'
	},
	initialize: function(options){
		this.evnts = options.eventsCollection;
		this.router = options.router;
		this.currentDate = options.currentDate;
		this.hidePopup();
		this.bindHandlers();
		this.render();
	},
	render : function() {
		this.$el.html(this.template({
		}))
	},
	openForm: function(date){
		this.evnt = this.evnts.findByDate(date);
		if(this.evnt){
			this.openWithData(date);
		}else{
			if(moment(date, 'D-M-YYYY', true).isValid()) {
				this.evnt = new EventModel({date:date});
				this.openEmpty(date);
			}
			else{
				this.router.route404();
			}
		}
	},
	openWithData: function(date){
		this.setDateText(date);
		this.setInputsValues(this.evnt.get('title'), this.evnt.get('description'));
		this.currentDate.goToDate(date);
		this.showPopup()
	},
	openEmpty: function(date){
		this.setDateText(date);
		this.currentDate.goToDate(date);
		this.clearInputs();
		this.showPopup()
	},
	overlayClick: function(e) {
		if($(e.target).hasClass('b-popup')) {
			this.router.goToMainPage();
		}
	},
	closeClick:function(){
		this.router.goToMainPage();
	},
	bindHandlers: function(){
		var that = this;
		$(document).keydown(function(e){
			if(e.keyCode==27){
				that.router.goToMainPage();
			}
		});
	},
	showPopup:function(){
		$('body').addClass('body-block');
		this.$el.addClass('active');
	},
	hidePopup:function(){
		this.$el.removeClass('active');
		$('body').removeClass('body-block');
	},
	clearInputs: function(){
		this.setInputsValues('', '');
	},
	setInputsValues: function(title, description){
		this.$('.b-popup__title input').val(title);
		this.$('.b-popup__description textarea').val(description);
	},
	setDateText:function(date){
		var text = moment(date, 'D-M-YYYY').format('D MMMM YYYY');
		this.$('.b-popup__date').data('date',date).text(text);
	},
	submitForm: function(e){
		e.preventDefault();
		var isValid = this.evnt.set({
			title: this.$('[name="title"]').val(),
			description: this.$('[name="description"]').val(),
			date: this.$('.b-popup__date').data('date')
		}, {validate:true});
		if(isValid){
			this.evnts.add(this.evnt,{merge:true});
			this.evnt.save();
			this.evnts.trigger('change');
			this.router.goToMainPage();
		}else{
			alert(this.evnt.validationError);
		}

	},
	deleteClick:function(){
		this.evnt.destroy();
		this.evnts.trigger('change');
		this.router.goToMainPage();
	}
});

module.exports = FormView;