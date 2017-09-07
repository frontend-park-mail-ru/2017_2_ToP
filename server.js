const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('src'));

app.get('*', (req, res) => {
	res.send('404');
})

app.listen(process.env.PORT || '8080', () => {
	console.log('start');
});