var Db = require('mongodb').Db
  , Server = require('mongodb').Server
  , BSON = require('mongodb').BSONPure;
  
  
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

TodoProvider.prototype.FindById = function(id, callback) {
    this.GetTodos(function (error, collection) {
        if (error) {
            callback(error);
        } else {
            collection.findOne({ '_id': new BSON.ObjectID(id) }, function (err, item) {
                if (err) {
                    callback(error);
                } else {
                    callback(null, item);
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

TodoProvider.prototype.Update = function (todoToUpdate, callback) {
    this.GetTodos(function (error, collection) {
        if (error) {
            callback(error);
        } else {
            collection.update({ '_id': new BSON.ObjectID(todoToUpdate.id) }, todoToUpdate, { safe: true }, function (error) {
                if (error) {
                    callback(error);
                }
                else {
                    callback(null, todoToUpdate);
                }
            });
            callback(null);
        }
    });
};

exports.TodoProvider = TodoProvider;