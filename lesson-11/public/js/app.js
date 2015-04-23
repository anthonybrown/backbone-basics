var output = $('#main-content');

output.append('<h4>Our Backbone View.</h4>');

// Model
var Book = Backbone.Model.extend({
  defaults: {
    chapters: 5,
    current: 1
  },

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

books.add({ author: 'H.G.Wells', title: 'The Time Machine.' });
books.add({ author: 'Arthur C. Doyle', title: 'Sign of the Four.' });
books.add({ author: 'Jules Verne', title: '20,000 Leagues under the sea.' });
books.add({ author: 'Virgina Wolf', title: 'A Room of One\'s Own.' });
books.add({ author: 'Arthur C. Doyle', title: 'His Last Bow.' });

// render model
var BookView = Backbone.View.extend({
  template: _.template($('#BookViewTmpl').html()),
  tagName: 'li',
  render: function () {
    this.el.innerHTML = this.template(this.model.toJSON());
    return this;
  }
});

// render collection
var BooksView = Backbone.View.extend({
  template: _.template($('#BooksViewTmpl').html()),
  render: function () {
    this.el.innerHTML = this.template(this.collection);
    var ul = this.$('ul');

    this.collection.each(function (model) {
      var bookView = new BookView({ model: model });
      ul.append(bookView.render().el);
    });

    return this;
  }
});

/* THIS RENDERS OUR COLLECTIONS */

var booksView = new BooksView({ collection: books });
$('#main-content').append(booksView.render().el);

/* THIS RENDERS OUR MODELS */

//var bookView = new BookView({ model: books.at(4) });
//$('#main-content').append(bookView.render().el);

// Example Views
//var BookView = Backbone.View.extend({
//  tagName: 'li',
//  className: 'book-item',
//  attributes: function () {
//    return {
//      'data-client-id': this.model.cid
//    };
//  }
//});
//
//var MainView = Backbone.View.extend({
//  el: '#output'
//});


//books.on('add', function (model) {
//  model.view = $('<h3>').text(model.get('title') + ' (' + model.get('author') + ')');
//  output.append(model.view);
//});

//books.on('remove', function (model) {
//  model.view.remove();
//});

// Events

/**
* add
* remove
* reset
* sort
* request
* sync
* error
**/
