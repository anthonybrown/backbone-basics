var output = $('#main-content');
var put = $('#output ol');
output.append('<h4>Our Backbone Views.</h4>');

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
    this.model.collection.remove(this.model);
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
    console.log(model.get('title') + ' was removed');
    put.append('<li>' + model.get('title') + '</li>');
    this.children[model.cid].remove();
  },

  updateNumber: function () {
    this.$('span').text(this.collection.length);
  }
});

// view for AddBookView
var AddBookView = Backbone.View.extend({
  template: _.template($('#AddBookViewTmpl').html()),
  events: {
    'click .add': 'addBook'
  },

  render: function () {
    this.el.innerHTML = this.template();
    return this;
  },

  addBook: function (e) {
    this.collection.add({
      title: this.$('#title').val(),
      author: this.$('#author').val()
    });
  }
});


var booksView = new BooksView({ collection: books });
var addBookView = new AddBookView({ collection: books });
$('#main-content').append(addBookView.render().el);
$('#main-content').append('<p>This is our collection view.</p>');
$('#main-content').append(booksView.render().el);




/* THIS RENDERS OUR MODELS */
//var bookView = new BookView({ model: books.at(2) });
//$('#main-content').append('<p>this is from the model: <code>var bookView = new BookView({ model: books.at(2) });</code></p>');
//$('#main-content').append('<p>The <code>books.at(2);</code> acts like an array, so it\'s actually getting the 3rd book in the collection.</p>');
//$('#main-content').append(bookView.render().el);

