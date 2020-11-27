const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'codehouse_restaurant'
});

connection.connect(
    error => {
        if(error) {
            throw error;
        } else {
            console.log('DB Connection success');
        }
    }
);

module.exports = connection;