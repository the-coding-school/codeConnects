//Delete an entire row
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
    Key:{
        "email":email
    }
};

console.log("Attempt to delete a row...");
docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
});
