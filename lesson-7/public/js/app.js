// Model
var Book = Backbone.Model.extend({
  defaults: {
    chapters: 5,
    current: 1
  },

  //urlRoot: '/books',
  validate: function(attrs) {
    if (attrs.published && typeof attrs.published !== 'number') {
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

// Backbone Collection => Usually the pluarl of the Model's Name

var Books = Backbone.Collection.extend({
  model: Book,
  url: '/books'
});

var books = new Books();

var book = new Book({
  author: 'Arthur C. Doyle',
  title : 'Sign of the Four'
});

books.add(book);

books.add({
  author: 'H.G.Wells',
  title: 'The Time Machine'
});
books.add({
  author: 'Jules Verne',
  title: '20,000 Leagues under the Sea'
});
books.add({
  author: 'H.G.Wells',
  title: 'War of the Worlds'
});
books.add({
  author: 'Jules Verne',
  title: 'Around the World in 80 Days'
});

output.innerHTML += books.pluck('title')+'<br />';
output.innerHTML += books.pluck('author')+'<br />';




