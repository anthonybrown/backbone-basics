var output = $('#output');

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

books.on('add', function (model) {
  model.view = $('<h3>').text(model.get('title') + ' (' + model.get('author') + ')');
  output.append(model.view);
});

books.on('remove', function (model) {
  model.view.remove();
});

output.append('<h4>This is a cheap and dirty way to display a view, don\'t do this in a real application.</h4>');
output.append('<h4>let\'s display the books collection, titles.</h4>');
output.append('<p>.</p>');
output.append("<p><code>books.on('add', function (model) {<br>&nbsp; model.view = $('h3').text(model.get('title') + '(' + model.get('author') + ')');<br> });</p>");

output.append('<h4>let\'s remove a title from the collection.</h4>');
output.append("<p><code>books.on('remove', function (model) {<br>&nbsp; model.view.remove();<br> });</p>");

output.append('<h4>Type this in the console.</h4>');
output.append('<p><code>wolf = books.at(3);</code></p>');
output.append('<p><code>books.remove(wolf);</code></p>');



books.add({ id: 1, author: 'H.G.Wells', title: 'The Time Machine.' });
books.add({ id: 2, author: 'Arthur C. Doyle', title: 'Sign of the Four.' });
books.add({ id: 3, author: 'Jules Verne', title: '20,000 Leagues under the sea.' });
books.add({ id: 4, author: 'Virgina Wolf', title: 'A Room of One\'s Own.' });
books.add({ id: 5, author: 'Arthur C. Doyle', title: 'His Last Bow.' });

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


output.append('<h3>Time to listen for Events.</h3>');
output.append('<li>add</li>');

output.append('<li>remove</li>');
output.append('<li>reset</li>');
output.append('<li>sort</li>');
output.append('<li>request</li>');
output.append('<li>sync</li>');
output.append('<li>error</li>');
output.innerHTML += '';

output.innerHTML += '';
output.innerHTML += '';
output.innerHTML += '';

output.innerHTML += '';
output.innerHTML += '';

output.innerHTML += '';
output.innerHTML += '';
output.innerHTML += '';

output.innerHTML += '';
output.innerHTML += '';




