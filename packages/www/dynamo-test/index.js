require("dotenv").config({ path: `.env` });
const AWS = require("aws-sdk");
const uuid = require("uuid/v4");

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const table = "todos";

const docClient = new AWS.DynamoDB.DocumentClient();

async function run() {
  // const params = {
  //   TableName: table,
  //   Item: {
  //     pk: "user#1",
  //     sk: `todo#${uuid()}`,
  //     data: {
  //       createdAt: Date.now(),
  //       updatedAt: Date.now(),
  //       done: false,
  //     },
  //   },
  // };

  // const result = await docClient.put(params).promise();
  // console.log("result", result);
  // const params = {
  //   TableName: table,
  //   Key: {
  //     pk: "user#1",
  //     sk: "todo#005e37c8-ee64-4ac7-9fd9-0c0e9d18f15b",
  //   },
  //   UpdateExpression: "set #data.#done = :newdone",
  //   ExpressionAttributeNames: {
  //     "#data": "data",
  //     "#done": "done",
  //   },
  //   ExpressionAttributeValues: {
  //     ":newdone": true,
  //   },
  // };

  // const result = await docClient.update(params).promise();

  const params = {
    TableName: table,
    KeyConditionExpression: "pk = :userid and begins_with(sk, :todokey)",
    ExpressionAttributeValues: {
      ":userid": "user#1",
      ":todokey": "todo#",
    },
  };

  const result = await docClient.query(params).promise();
  console.log(result);
}

run();
