// Backbone Models

var Model1 = Backbone.Model.extend({
  initialize: function(attrs, opts) {
    console.log('created an instance of Model1');
  }
});

var m1 = new Model1({ name: 'm1' });
console.log('Name: ', m1.get('name'));

var Model2 = Backbone.Model.extend({
  constructor: function(atts, opt) {
    console.log('created an instance of Model2 (with a constructor method)');
  }
});

var Model3 = Model2.extend({
  initialize: function(attrs, opts) {
    Model3.__super__.initialize.apply(this, arguments);
    console.log('created an  instance of Model3');
  }
});

var m3 = new Model3({ name: 'm3' });
console.log('name: ', m3.get('name'));

//var m2 = new Model2({ name: 'm2' });
//console.log('name: ', m2.get('name'));

//var Book = Backbone.Model.extend({});
//
//var BookView = Backbone.View.extend({
//  initialize: function() {
//    this.listenTo(this.model, 'change:title', this.renderTitle);
//    this.listenTo(this.model, 'change:author', this.renderAuthor);
//  },
//
//  events: {
//    'keypress #title': 'updateTitle'
//  },
//
//  render: function() {
//    var html = '<h1>' + this.model.get('title') + '</h1>';
//    html += '<h2>' + this.model.get('author') + '</h2>';
//
//    this.el.innerHTML = html;
//    return this;
//  },
//
//  renderTitle: function() {
//    this.$('h1').text(this.model.get('title'));
//  },
//
//  renderAuthor: function() {
//    this.$('h2').text(this.model.get('author'));
//  }
//});
//
