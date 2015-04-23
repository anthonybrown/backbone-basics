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

var output = document.getElementById('output');

var books = new Books();
var book = new Book({
  author: 'Arthur C. Doyle',
  title: 'Sign of the Four'
});
books.add(book);

output.innerHTML += "<code>books.add(book);</code><br>";
output.innerHTML += "<code>books.length;<code><br>";
output.innerHTML += '<p>' + books.length + '</p>';

books.add({
  author: 'Jonathan Swift',
  title: "Gulliver's Travels"
});

output.innerHTML += "<code>books.add(book);</code><br>";
output.innerHTML += "<code>books.length;<code><br>";
output.innerHTML += '<p>'+ books.length + '</p>';

books.remove(book);

output.innerHTML += "<code>books.remove(book);</code><br>";
output.innerHTML += "<code>books.length;<code><br>";
output.innerHTML += '<p>' + books.length + '</p>';

books;

output.innerHTML += 'One of my favorite books is ' + books.pluck('title')+ '<br />';
//output.html('<li>' + books.pluck('author') + '<li>');

books.add(book);

books.add({
  author: 'H.G.Wells',
  title: 'The Time Machine'
});

books.add({
  author: 'Jules Verne',
  title: 'Around the World in 80 Days'
});

books.add({
  author: 'Arhur C. Clark',
  title: 'The Sentinal'
});

books.add({
  author: 'Ridley Scott',
  title: 'Falling Angel'
});

output.innerHTML += '<h3>List of books</h3>';
output.innerHTML += '<li>' + books.pluck('title') + '</li>';
output.innerHTML += '<h3>List of authors</h3>';
output.innerHTML += '<li>' + books.pluck('author') + '</li>';

// also the collection acts like an array,
output.innerHTML += '<h2>Collections behave like Array\'s in Backbone.'
output.innerHTML += '<code>books.push({ author: "Stephen King", title: "Cudjo" })</code>';
books.push({
  author: 'Stephen King',
  title:  'Cudjo'
});

output.innerHTML += '<li>' + books.pluck('title') + '</li>';

// Clone a collection

output.innerHTML += '<p>We can also <code>clone</code> a collection:</p>';
output.innerHTML += "<code>books2 = books.clone();</code><br />";
output.innerHTML += "<code>books2.pluck('title');</code><br />";

books2 = books.clone();

output.innerHTML += '<li> This is books2: ' + books2.pluck('title') + '</li>';

output.innerHTML += '<li>This is books: ' + books.pluck('title') + '</li>';

output.innerHTML += '<p>If we do a <code>books2.push({ author: "Stephen King", title: "The Shinning" })';
books2.push({
  author: 'Stephen King',
  title:  'The Shinning'
});
output.innerHTML += '<li> This is books2: ' + books2.pluck('title') + '</li><br />';

output.innerHTML += '<li>This is books: ' + books.pluck('title') + '</li><br />';
output.innerHTML += "<p>books2.pop();</code><br /></p>";
books2.pop();
output.innerHTML += '<li>This is books2 now after the pop()<br /> '+ books2.pluck('title') + '</li>';







