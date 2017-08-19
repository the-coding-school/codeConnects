var supertest = require("supertest");
var should = require("should");
//This agent refers to the PORT where the program is running
var server = supertest.agent("http://localhost:3000");
//start unit testing
describe("Unit test for correct ports", function(done)
{
	it("should return home page",function(done)
	{
		// calling home page api
    		server
    		.get("/")
    		.expect("Content-type",/json/)
    		.expect(200) // THis is HTTP response
 		.end(function(err,res)
		{
      		// HTTP status should be 200
      		res.status.should.equal(200);
      		// Error key should be false.
      		//res.body.error.should.equal(false);
      		done();
		});
    	});
		
	it("Error should return 404",function(done)
	{
    		server
    		.get("/random")
    		.expect(404)
    		.end(function(err,res)
		{
      		res.status.should.equal(404);
      		done();
		});
    	});
});
