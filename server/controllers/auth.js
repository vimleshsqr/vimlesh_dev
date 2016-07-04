var jwt = require('jwt-simple');
var connection=require('../connection');
var auth ={
	login:function(req,res){
		var username = req.body.username || '';
	    var password = req.body.password || '';

	    if (username == '' || password == '') {
	      res.status(401);
	      res.json({
	        "status": 401,
	        "message": "Invalid credentials"
	      });
	      return;
	    }
		// Fire a query to your DB and check if the credentials are valid
	    auth.validate(username, password, function(dbUserObj) {
	    	//dbUserObj=result;
	    	console.log(dbUserObj);
	    	if (!dbUserObj) { // If authentication fails, we send a 401 back
		      res.status(401);
		      res.json({
		        "status": 401,
		        "message": "Invalid credentials"
		      });
		      return;
		    }

		    if (dbUserObj) {
		    	console.log('into generate');
	 
		      // If authentication is success, we will generate a token
		      // and dispatch it to the client
		 
		      res.json(genToken(dbUserObj));
		  }
	    });

	},
		validate: function(username, password, callback) {
		var data;
		connection.acquire(function(err,con){
		 data=con.query("select concat(first_name,' ',last_name) as name, 'admin' as role, username from users where username='"+username+"' and password='"+password+"'", function(err, result){
			con.release();
			if(err){
				return;
			}else{ //success
				//console.log(result[0]);
				callback(result[0]);
			}
			//return result[0];
		 });
		});
	    // // spoofing the DB response for simplicity
	    // var dbUserObj = { // spoofing a userobject from the DB. 
	    //   name: 'Deepak Kushwaha',
	    //   role: 'admin',
	    //   username: 'deepak.kushwaha@squareyards.in'
	    // };
	     console.log(data);
	     return data;
	  },
	 
	  validateUser: function(username, callback) {
	    connection.acquire(function(err,con){
		 data=con.query("select concat(first_name,' ',last_name) as name, 'admin' as role, username from users where username='"+username+"'", function(err, result){
			con.release();
			if(err){
				return;
			}else{ //success
				//console.log(result[0]);
				callback(result[0]);
			}
			//return result[0];
		 });
		});
	  },
	  test: function(req,res){
	  	res.status(200);
	  	res.json({
	  		"status":200,
	  		"message":"Success"
	  	});
	  	return;
	  },
	}
	 
	// private method
	function genToken(user) {
	  var expires = expiresIn(7); // 7 days
	  var token = jwt.encode({
	    exp: expires
	  }, require('../config/secret')());
	 
	  return {
	    token: token,
	    expires: expires,
	    user: user
	  };
	}
	 
	function expiresIn(numDays) {
	  var dateObj = new Date();
	  return dateObj.setDate(dateObj.getDate() + numDays);
	}

 
module.exports = auth;