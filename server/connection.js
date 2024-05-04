//Currently not being used
const { Connection, Request } = require('tedious');

class SqlServerConnection {
    constructor(serverConfig) {
        try {
            // Instantiate a new Connection within a try-catch block
            this.connection = new Connection(serverConfig);
        } catch (error) {
            console.error('Error creating connection:', error.message);
        }
    }
      
    connect() {
        this.connection.on('connect', (err) => {
            if (err) {
                console.error('Error:', err.message);
            } else {
                console.log('Connected to the database');
            }
        });

        // Initiate the connection only if the Connection was successfully created
        if (this.connection) {
            this.connection.connect();
        } else {
            console.error('Connection was not created successfully.');
        }
    }

    close(callback) {
        // Close the connection and handle errors
        this.connection.close((err) => {
            if (err) {
                console.error('Error closing the connection:', err.message);
            } else {
                console.log('Connection closed');
            }
            // Invoke the callback function, if provided
            if (callback) {
                callback(err);
            }
        });
    }

}
module.exports = SqlServerConnection;
