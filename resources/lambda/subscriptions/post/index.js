exports.handler = async (event, context) => {
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

  const subscriptionsList = await client.listSubscriptionsByTopic({ 
    TopicArn: topic.TopicArn
  }).promise();


  if (!subscriptionsList.Subscriptions) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify({ message: 'Could not retrieve subscriptions' })
    }
  }

  for (subscription of subscriptionsList.Subscriptions) {

    if (subscription.Endpoint === body.email) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST'
        },
        body: JSON.stringify({ message: 'Already subscripted' })
      }
    }
  }

  res = await client.subscribe({
    TopicArn: topic.TopicArn,
    Protocol: 'email',
    Endpoint: body.email
  }).promise();


  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST'
    },
    body: JSON.stringify(res)
  };
};
