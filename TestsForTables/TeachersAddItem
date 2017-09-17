var AWS = require("aws-sdk");

// To run locally
//AWS.config.update({
//  region: "us-west-2",
//  endpoint: "http://localhost:8000"
//});
// To run using the web service-for aws located in Oregon
AWS.config.update({endpoint: "https://dynamodb.us-//west-2.amazonaws.com"});
AWS.config.loadFromPath('../config/credentials.json');

var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2' });

var table = "Teachers";
var email = "email@gmail.com";

var params = {
    TableName:table,
    Item:{
        "email": email,
        "approved": false,
        "bio": "bio",
	"employer": "CodeConnects",
	"ethnicity": "Asian",
	"first_language": "English",
	"first_name": "John",
	"focus": "Robotics",
	"gender": "Male",
	"last_name": "Dang",
	"location": "Fairfax, Virginia",
	"second_language": "Chinese"
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});
