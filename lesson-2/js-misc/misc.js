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
