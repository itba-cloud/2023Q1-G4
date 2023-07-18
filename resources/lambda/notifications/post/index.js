exports.lambdaHandler = async (event, context) => {
    const { Client } = require('pg');
    const AWS = require('aws-sdk');
    const body = JSON.parse(event.body);
  
    const conn = new Client({
        database: 'cloud_ninja',
        host: 'nuke-cluster.cjtufiunpesz.us-east-1.rds.amazonaws.com', // TODO: change host
        user: 'postgres',
        password: 'rootroot',
        port: 5432,
        ssl: true
      });
  
    const client = new AWS.SNS();
    await conn.connect();
    const query = {
      text: `SELECT * FROM teams WHERE id = $1`,
      values: [body.id]
    };
  
    const result = await conn.query(query);
    await conn.end();
  
    team = result.rows[0]
  
    const topic = await client.createTopic({ Name: team.name }).promise();
    res = await client.publish({
      TopicArn: topic.TopicArn,
      Message: body.message,
      Subject: body.subject
    }).promise();
  
  
    return {
      statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST'
        },
      body: json.dump(res)
    };
  };