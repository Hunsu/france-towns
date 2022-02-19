const nodeFetch = require("node-fetch")
const {Client} = require('pg')
const dotenv = require('dotenv')

const isDev = !(process.env.NODE_ENV === 'production');

const result = dotenv.config({
    path: isDev ? '.env.development' : '.env.production'
})

if (result.error) {
    throw result.error
}

const TOWNS_SOURCE_URL = "https://unpkg.com/codes-postaux@3.5.0/codes-postaux.json";

interface Town {
    codePostal: string,
    codeCommune: string,
    nomCommune: string
}

(async () => {
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
    const result = await client.query("SELECT count(*) FROM town");

    if (result.rows[0].count === '0') {

        const data = await nodeFetch(TOWNS_SOURCE_URL)
        const towns: Town[] = await data.json()
        const query = 'INSERT INTO town (postal_code, town_code, name) VALUES ($1, $2, $3);'

        const promises = []
        for (let town of towns) {
            promises.push(client.query(query, [town.codePostal, town.codeCommune, town.nomCommune]))
        }
        await Promise.all(promises)
            .catch(e => {
                throw e
            })
    } else {
        console.log("DB already initialized")
    }
    process.exit(0)
})()