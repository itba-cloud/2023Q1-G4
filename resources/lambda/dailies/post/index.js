exports.handler = async (event) => {
	const { Client } = require('pg');
	const body = JSON.parse(event.body);
	
	const client = new Client({
		user: 'postgres',
		password: 'rootroot',
		host: 'nuke-cluster.cjtufiunpesz.us-east-1.rds.amazonaws.com',
		port: 5432,
		database: 'cloud_ninja',
		ssl: true
	});

	const checkQuery = {
		text: `SELECT * FROM dailies WHERE email = $1 AND _date = $2`,
		values: [body.email, body._date]
	};

	const insertQuery = {
		text: `INSERT INTO dailies (email, team_id, yesterday, today, blocker, _date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
		values: [body.email, body.team_id, body.yesterday, body.today, body.blocker, body._date]
	};
	
	await client.connect();
	const checkResult = await client.query(checkQuery);
	if (checkResult.rowCount > 0) {
		await client.end();
		return {
			statusCode: 400,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'POST'
			},
			body: JSON.stringify({ message: 'Daily already exists' })
		};
	}

	const result = await client.query(insertQuery);
	const resultString = JSON.stringify(result.rows[0]);
	await client.end();
	const response = {
		statusCode: 201,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST'
		},
		body: resultString
	};
	return response;
};