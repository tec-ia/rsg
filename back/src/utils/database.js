const Pool = require("pg").Pool

class Database {

    static #db = undefined

    static get() {

        if (this.#db) return this.#db

        this.#db = new Pool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_SKEY,
        })

        return this.#db

    }

    static close() {

        if (!this.#db) return

        this.#db.end().then(() => console.log("Pool has been closed"))

    }

}

module.exports = Database