import {Client} from "pg"

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT as string),
})
client.connect()

process.on('exit', () => {
    console.log("Disconnecting from database")
    client.end()
})

export default client