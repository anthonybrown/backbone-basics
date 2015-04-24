var output = $('#main-content');
var put = $('#output ol');

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
  url: '/books',
   validate: function(attrs) {
    if (typeof attrs.published !== 'number') {
      return '`published` should be a number!';
    }
  }
});

//<!-- model view -->//
var BookView = Backbone.View.extend({
  template: _.template($('#BookViewTmpl').html()),
  tagName: 'li',
  events: {
    'click .remove' : 'removeModel'
  },

  render: function () {
    this.el.innerHTML = this.template(this.model.toJSON());
    return this;
  },

  removeModel: function (e) {
    this.model.destroy();
  }
});

//<!-- collection view -->//
var BooksView = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.collection, 'remove', this.removeBook);
    this.listenTo(this.collection, 'add', this.addBook);

    // updates our books length
    this.listenTo(this.collection, 'remove', this.updateNumber);
    this.listenTo(this.collection, 'add', this.updateNumber);
  },

  template: _.template($('#BooksViewTmpl').html()),

  children: {},

  render: function () {
    this.el.innerHTML = this.template(this.collection);
    this.collection.each(this.addBook.bind(this));

    return this;
  },

  addBook: function (model) {
    this.children[model.cid] = new BookView({ model: model });
    this.$('ol').append(this.children[model.cid].render().el);
  },

  removeBook: function (model) {
    this.children[model.cid].remove();
  },

  updateNumber: function () {
    this.$('span').text(this.collection.length);
  }
});

// view for AddBookView
var AddBookView = Backbone.View.extend({
// create validation that doesn't allow
// an empty form to be submitted
//   validate: function(attrs) {
//    if (! attrs) {
//      return 'Cannot be left blank';
//    }
//  },
  template: _.template($('#AddBookViewTmpl').html()),
  events: {
    'click .add': 'addBook'
  },

  render: function () {
    this.el.innerHTML = this.template();
    return this;
  },

  addBook: function (e) {
    this.collection.create({
      title: this.$('#title').val(),
      author: this.$('#author').val()
    });
  }
});

// we could have the template generate our template
// on the server side with a templating engine.
//var books = new Books([ <%= models.toJSON() %> ]);


// Create our Router
var BookRouter = Backbone.Router.extend({
  initialize: function (opts) {
    this.books = opts.books;
  },

  routes: {
    '': 'list',
    'add': 'add'
  },

  list: function () {
    var booksView = new BooksView({ collection: this.books });
    $('#main-content').append(booksView.render().el);
  },

  add: function (id) {
    var addBookView = new AddBookView({ collection: this.books });
    $('#main-content').append(addBookView.render().el);
  }

});

var books = new Books();
// use the promise that fetch gives us.
books.fetch().then(function () {
  var router = new BookRouter({
    books: books
  });

  Backbone.history.start({ pushState: true });
});




/* THIS RENDERS OUR MODELS */
//var bookView = new BookView({ model: books.at(2) });
//$('#main-content').append('<p>this is from the model: <code>var bookView = new BookView({ model: books.at(2) });</code></p>');
//$('#main-content').append('<p>The <code>books.at(2);</code> acts like an array, so it\'s actually getting the 3rd book in the collection.</p>');
//$('#main-content').append(bookView.render().el);

