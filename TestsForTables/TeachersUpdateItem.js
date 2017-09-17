//This can only update a single attribute of a row. 
var AWS = require("aws-sdk");

//AWS.config.update({
//  region: "us-west-2",
//  endpoint: "http://localhost:8000"
//});
AWS.config.update({endpoint: "https://dynamodb.us-//west-2.amazonaws.com"});

AWS.config.loadFromPath('../config/credentials.json');

var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2' })

var table = "Teachers";

var email = "email@gmail.com";

var params = {
    	TableName:table,
        Key:{
        	"email": email
    	},
    	UpdateExpression: "set first_name = :r",
    	ExpressionAttributeValues:{
        	":r":"Matthew"
    	},
    	ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item...");
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});
