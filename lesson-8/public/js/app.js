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


  //var title = books.pluck('title');
  //var author = books.pluck('author');

  output.innerHTML += '<h3>I have created some books with a title and an author, like this:</h3>';
  output.innerHTML += '<code>books.create({ id: 1, author: "H.G.Wells", title: "The Time Machine" });</code><br />';
  output.innerHTML += '<code>books.create({ id: 2, author: "Arthur C.Doyle", title: "Sign of the Four" });</code><br />';
  output.innerHTML += '<code>books.create({ id: 3, author: "Jules Verne", title: "20,000 Leagues under the sea." });</code><br />';
  output.innerHTML += '<code>books.create({ id: 4, author: "Virgina Wolf", title: "A Room of One\'s own." });</code><br /><br />';
  output.innerHTML += '<code>books.create({ id: 5, author: "Arthur C. Doyle", title: "His Last Bow" });</code><br /><br />';
  output.innerHTML += '<p>doing a books.pluck("title");get\'s us all the titles.';
  output.innerHTML += '<li>'+ books.pluck("title") + '</li>';
  output.innerHTML += '<p>doing a books.pluck("author"); get\'s us all the authors.';
  output.innerHTML += '<li>' + books.pluck("author") + '</li>';

  output.innerHTML += '<p>To get at an element, we can use <code>books.get(3)</code> which gets the model by it\'s id.</p>';
  output.innerHTML += '<p>This is books.get(3).get("title");</p>';
  output.innerHTML += '<p><b><em>' + books.get(3).get("title") + '</em></b></p>';

  output.innerHTML += '<p>Or we could use <code>books.at(3)</code> which gets the model position in the collection.(starting at zero like an Array)</p>';
  output.innerHTML += '<p>This is books.at(3).get("title"); <b><em></p>';
  output.innerHTML += '<p><em><b>' + books.at(3).get("title") + '</em></b></p>';

  output.innerHTML += '<p>Doing a books.where({ author: "Arthur C. Doyle" }); which will return a collection of arrays with the result of the lookup.<p>';
  output.innerHTML += '<p>Doing a books.findWhere({ author: "Arthur C. Doyle" }); will only return the first instance of the lookup in the collection.<p>';

//books.filter(function (model) {
//  return output.innerHTML += model.get('author') === 'H.G.Wells';
//});



