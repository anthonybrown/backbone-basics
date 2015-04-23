// Creating Backbone Model Classes

var Book = Backbone.Model.extend({
  validate: function(attrs, opts) {
    if (attrs.published && typeof attrs.published !== 'number') {
      return 'Published should be a number!';
    }
  }
});

// defaults with an object literal
//var Book = Backbone.Model.extend({
//  defaults: {
//    title: 'xxx'
//  }
//});

// defaults using a function
//var Book = Backbone.Model.extend({
//  defaults: function() {
//    return {
//      time: new Date()
//    };
//  }
//
//});
