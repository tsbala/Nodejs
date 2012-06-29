var Db = require('mongodb').Db
  , Server = require('mongodb').Server;
  
  
TodoProvider = function(host, port) {
	this.db = new Db('node-mongo-todo', new Server(host, port, {auto_reconnect: true}, {}));
	this.db.open(function(error, db) { 
					if (error) { 
						console.log(error); 
					} else { 
						console.log('db connected'); 
					}
				});
};

TodoProvider.prototype.GetTodos = function(callback) {
	this.db.collection('todos', function(error, collection) {
		if (error) { 
			callback(error, null);
		} else {
			callback(null, collection);
		}
	});			
};

TodoProvider.prototype.FindAll = function(callback) {
	this.GetTodos(function(error, collection) {
		if (error) {
			callback(error);
		} else {
			collection.find().toArray(function(error, results) {
							if (error) { 
								callback(error); 
							} else {
								callback(null, results);
							}
   					    });
		}
	});
};

TodoProvider.prototype.Save = function(newTodo, callback) {
	this.GetTodos(function(error, collection) {
		if (error) {
			callback(error);
		} else {
			collection.insert(newTodo, function () {
				callback(null, newTodo);
			});
		}
	});
};

exports.TodoProvider = TodoProvider;