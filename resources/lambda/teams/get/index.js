exports.handler = async (event) => {
	const { Client } = require('pg');
	const query = {
		text: `SELECT * FROM teams`
	};
	const client = new Client({
		user: 'postgres',
		password: 'rootroot',
		host: 'nuke-cluster.cjtufiunpesz.us-east-1.rds.amazonaws.com',
		port: 5432,
		database: 'cloud_ninja',
		ssl: true
	});
	await client.connect();
	const result = await client.query(query);
	const resultString = JSON.stringify(result.rows);
	await client.end();
	const response = {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET'
		},
		body: resultString
	};
	return response;
};