// Model
var Book = Backbone.Model.extend({
  defaults: {
    chapters: 5,
    current: 1
  },

  urlRoot: '/books',
  validate: function(attrs) {
    if (typeof attrs.published !== 'number') {
      return '`published` should be a number!';
    }
  },

  read: function() {
    var curr = this.get('current');
    if (curr < this.get('chapters')) {
      this.set('current', curr + 1);
    }
  },

  isFinished: function() {
    return this.get('chapters') === this.get('current');
  }
});

// Collection is the Pluarl of the Model
var Books = Backbone.Collection.extend({
  model: Book
});

var books = new Books();








