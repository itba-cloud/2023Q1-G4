exports.handler = async (event) => {
	const { Client } = require('pg');
	// https://stackoverflow.com/questions/32610213/node-postgres-named-parameters-query-nodejs
	const sql = require('yesql').pg;
	let text = `SELECT * FROM dailies WHERE true `;
	let values = {};

	if (event.queryStringParameters) {
		const queries = event.queryStringParameters;

		if (queries.role_id) {
			text += `AND email LIKE :email `;
			values['email'] = queries.email;
		}

		if (queries.team_id) {
			text += `AND team_id = :team_id `;
			values['team_id'] = queries.team_id;
		}
	}

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