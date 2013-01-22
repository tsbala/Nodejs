
/*
 * GET home page.
 */

var TodoProvider = require('.././todoProvider').TodoProvider;
var todoProvider = new TodoProvider('localhost', 27017);


exports.index = function(req, res){
  res.render('index', { title: 'Node js sample app' });
};

exports.todoAll = function(req, res) {
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

exports.todoId = function (req, res) {
    todoProvider.FindById(req.params.id, function (error, todo) {
        if (todo) {
            res.render('todoById', {
                title: 'Todo by id',
                todo: todo
            });
        }
    });
}

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

exports.update = function (req, res) {
  var todo = {id:req.params.id, text: req.body['todo-text']};
  todoProvider.Update(todo, function(error, todoItem) {
	if (error) {
		console.log(error);
	}
	else if (todoItem) {
		res.redirect('/todo/' + todo.id);
	}
  });
};