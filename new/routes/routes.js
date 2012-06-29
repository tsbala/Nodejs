
/*
 * GET home page.
 */

var TodoProvider = require('.././todoProvider').TodoProvider;
var todoProvider = new TodoProvider('localhost', 27017);


exports.index = function(req, res){
  res.render('index', { title: '8:29 to London St Pancras from Bedford' });
};

exports.todo = function(req, res) {
	todoProvider.FindAll(function(error, todos) {
		if (todos)  {
			res.render('todo', 
					 { 
					   title: 'New Todo item', 
					   todos: todos
					 });
		}
	});
};

exports.saveTodo = function(req, res) {
  var newTodo = {};
  newTodo.text = req.body['todo-text'];
  todoProvider.Save(newTodo, function(error, todoItem) {
	if (error) {
		console.log(error);
	}
	else if (todoItem) {
		res.redirect('/todo');
	}
  });
};