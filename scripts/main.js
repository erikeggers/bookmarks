(function(){

// -------------
// Models
// -------------

var BookmarkItemModel = Backbone.Model.extend({
  idAttribute: "objectId"
});

// -------------
// Collections
// -------------

var BookmarkItemsCollection = Backbone.Collection.extend({
  model: BookmarkItemModel,

  url: "https://api.parse.com/1/classes/bookmarks",

parse: function(response){
  console.log(response);
  return response.results;
  }
});

// -------------
// Views
// -------------

var BookmarksView = Backbone.View.extend({
  className: 'js-items',
  el: '#bookmark-container',

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function(){
    var self = this;
    this.$el.empty();

    this.collection.each(function(BookmarkItemModel){
      var itemView = new ItemView({model: BookmarkItemModel});
      itemView.render();
      self.$el.append(itemView.el);
    });
  }
});


var ItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'item',
  template: _.template( $('#bookmarks-template').text() ),

  render: function(){
    this.$el.html( this.template(this.model.toJSON() ) );
    return this;
  }

});

var TagListView = Backbone.View.extend({
});

var TagView = Backbone.View.extend({
  tagName: 'li',
  className: 'item',
  template: _.template( $('#tags-template').text() ),

  render: function(){
    this.$el.html(this.template());
    return this;
  }
});

var CountView = Backbone.View.extend({
  // template: _.template( $('#bookmarks-template').text() )
});


// -------------
// Router
// -------------
var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'tag/:tag' : 'tag'
  },

  initialize: function(){

    this.items = new BookmarkItemsCollection();
    this.itemsList = new BookmarksView({
      collection: this.items
    });
    this.items.fetch();

    // this.itemsList = new ItemView();
    // this.itemsList.render();

    this.tagsList = new TagView();
    $('#tags-container').html(this.tagsList.el);
    this.tagsList.render();


  },

  index: function(){



    this.itemsList.render();



    // var tagsTemplate = _.template( $('#tags-template').text() );
    // $('#tags-container').html(tagsTemplate);

    console.log('cool');
  },

  tag: function(){

    this.tagsList = new TagView();
    $('#tags-container').html(this.tagsList.el);
    this.tagsList.render();
  }

});

// -------------
// Configuration
// -------------
$.ajaxSetup({
headers: {
 "X-Parse-Application-Id": "TSSFSRfphmNpYAjduOjuFCxYYAtAKRFUBDvf43qr",
 "X-Parse-REST-API-Key": "A0Qj6clMGZkKETbYJs3pFmaanuMKpVZBgWneRkPO"
  }
});

// -------------
// Glue Code
// -------------

$(document).ready(function() {
  window.router = new AppRouter();
  Backbone.history.start();
});

})();
