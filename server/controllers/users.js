var connection = require('../connection');
//testing by vimlesh rajput
var users = {
getAll: function(req, res) {
	connection.acquire(function(err,con){
		 con.query("Select * from users", function(err, result){
			con.release();
			res.json(result);			
			});
		});
},
getOne: function(req, res) {
	req.checkParams("id", "Enter a valid user Id.").notEmpty().isInt();
	// check for valid input
	// var errors = req.validationErrors();
	//   if (errors) {
	//     res.send(errors, 400);
	//     return;
	//   }

	connection.acquire(function(err,con){
		 con.query("Select * from users where username", function(err, result){
			con.release();
			res.json(result);			
			});
		});
	res.json(user);
},
create: function(req, res) {
	var newuser = req.body;
	data.push(newuser); // Spoof a DB call
	res.json(newuser);
},
update: function(req, res) {
	var updateuser = req.body;
	var id = req.params.id;
	data[id] = updateuser // Spoof a DB call
	res.json(updateuser);
},
delete: function(req, res) {
	var id = req.params.id;
	data.splice(id, 1) // Spoof a DB call
	res.json(true);
}
};
var data = [{
	name: 'user 1',
	id: '1'
	}, {
	name: 'user 2',
	id: '2'
	}, {
	name: 'user 3',
	id: '3'
}];
module.exports = users;