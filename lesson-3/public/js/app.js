var Book = Backbone.Model.extend({
  urlRoot: '/books',
  idAttribute: '_id'
});

var output = $('#output');

book = new Book({ _id: 1 });

book.on('change:title', updateView);

// when we called fetch, it caused the 'change:title' event to fire
// the updateView() method

book.fetch();

function updateView () {
  output.text(book.get('title'));
}
