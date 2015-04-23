var Book = Backbone.Model.extend({
  urlRoot: '/books',
  idAttribute: '_id'
});

// API for backend -->
// create:  POST   /books
// read:    GET    /books/:id
// update:  PUT    /books/:id
// destroy: DELETE /books/:id
