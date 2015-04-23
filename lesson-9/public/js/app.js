var output = document.getElementById('output');

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

books.create({ id: 1, author: 'H.G.Wells', title: 'The Time Machine.' });
books.create({ id: 2, author: 'Arthur C. Doyle', title: 'Sign of the Four.' });
books.create({ id: 3, author: 'Jules Verne', title: '20,000 Leagues under the sea.' });
books.create({ id: 4, author: 'Virgina Wolf', title: 'A Room of One\'s Own.' });
books.create({ id: 5, author: 'Arthur C. Doyle', title: 'His Last Bow.' });

output.innerHTML += '<h3>Time to sort some Backbone Collections.';
output.innerHTML += '<p>Right now we can see the order of books by title</p>';
output.innerHTML += '<p><code>books.pluck("title")</code></p>';
output.innerHTML += '<li>' + books.pluck('title') + '</li>';
output.innerHTML += '<p>We can use a comparator function to sort the models in a collection.</p>';
output.innerHTML += '<p><code>books.comparator = "title";</code></p>';
books.comparator = 'title';
books.sort();
output.innerHTML += '<p>' + books.pluck('title') + '</p>';
output.innerHTML += '<p>We can also use a function in our comparator function.</p>';
output.innerHTML += '<p><code>books.comparator = function (model) { return model.get("author") };</code></p>';

output.innerHTML += '<p>We run <code>books.pluck("author")</code></p>';
output.innerHTML += '<p>'+ books.pluck('author') + '</p>';

books.comparator = function (model) {
  return model.get('author');
}

books.sort();
output.innerHTML += '<p>We can then run <code>books.sort();</code></p>';
output.innerHTML += '<p>Then we do a <code>books.pluck("author")</code> which will give us a sorted collection.</p>';

output.innerHTML += '<p>'+ books.pluck('author') + '</p>';

output.innerHTML += '';
output.innerHTML += '';
output.innerHTML += '';

output.innerHTML += '';
output.innerHTML += '';
output.innerHTML += '';

output.innerHTML += '';
output.innerHTML += '';




