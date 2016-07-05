testvar mysql = require('mysql');
function Connection(){
this.pool=null;

	this.init = function(){
		this.pool=mysql.createPool({
			connectionLimit:100,
			host:'127.0.0.1',
			user:'root',
			password:'1',
			database:'lms_db'
		});
	};

	this.acquire = function(callback){
		this.pool.getConnection(function(err,connection){
			callback(err,connection);
		});
	};
	
}
module.exports = new Connection();