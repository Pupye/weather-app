import dotenv from 'dotenv'

const envFound = dotenv.config()
if (envFound.error) {
    throw new Error("cound not find the .env file")
}

export default {
    inteface: process.env.INTERFACE,
    port: parseInt(process.env.PORT_NUMBER, 10),
    db: {
        pgConnectionString: process.env.PG_CONNECTION_STRING,
    }

}

