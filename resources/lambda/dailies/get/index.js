exports.handler = async (event) => {
	const roles = {
		pm: 0,
		dev: 1 
	}
	const { Client } = require('pg');
	// https://stackoverflow.com/questions/32610213/node-postgres-named-parameters-query-nodejs

	// CHECK
	if (!event.queryStringParameters || !event.queryStringParameters.role_id || !event.queryStringParameters.team_id) {
		return {
			statusCode: 400,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'POST'
			},
			body: JSON.stringify({ message: 'You need to send role and team' })
		};
	}

	if (roles.pm !== parseInt(event.queryStringParameters.role_id)) {
		return {
			statusCode: 401,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'POST'
			},
			body: JSON.stringify({ message: 'You are not a PM' })
		};
	}
	//FINALIZE CHECK

	const sql = require('yesql').pg;
	let text = `SELECT * FROM dailies WHERE team_id = :team_id `;
	let values = {
		team_id: event.queryStringParameters.team_id
	};

    text += `ORDER BY _date`;

	const query = sql(text)(values);

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