const Database = require("../utils/database")
const FormError = require("../utils/error")

const zod = require("zod").z

const QUERY_ALL = "SELECT * FROM item ORDER BY id DESC"
const QUERY_BY_ID = "SELECT * FROM item WHERE id = $1 LIMIT 1"
const QUERY_BY_USERNAME = "SELECT * FROM item WHERE username = $1 LIMIT 1"
const QUERY_CREATE = "INSERT INTO item (username, password) VALUES ($1, $2) RETURNING *"
const QUERY_UPDATE = "UPDATE item SET username = $1, password = $2 WHERE id = $3 RETURNING *"
const QUERY_DELETE = "DELETE FROM item WHERE id = $1"

const QUERY_USERNAME = "SELECT COUNT(*) AS total FROM item WHERE LOWER(username) = LOWER($1)"
const QUERY_USERNAME_UPDATE = "SELECT COUNT(*) AS total FROM item WHERE LOWER(username) = LOWER($1) AND id != $2"

const QUERY_LOGIN = "SELECT * FROM item WHERE username = $1 AND password = $2 LIMIT 1"

const ItemStore = {

    all: async () => {
        const conn = Database.get()
        const result = await conn.query(QUERY_ALL)
        return result.rows
    },

    byId: async (filter) => {
        const conn = Database.get()
        const result = await conn.query(QUERY_BY_ID, [filter])
        return result.rows[0]
    },

    byUsername: async (filter) => {
        const conn = Database.get()
        const result = await conn.query(QUERY_BY_USERNAME, [filter])
        return result.rows[0]
    },

    create: async (data) => {
        const conn = Database.get()
        const { username, password } = data
        const values = [username, password]
        const result = await conn.query(QUERY_CREATE, values)
        return result.rows[0]
    },

    update: async (data) => {
        const conn = Database.get()
        const { username, password, id } = data
        const values = [username, password, id]
        const result = await conn.query(QUERY_UPDATE, values)
        return result.rowCount
    },

    delete: async (filter) => {
        const conn = Database.get()
        const result = await conn.query(QUERY_DELETE, [filter])
        return result.rowCount
    },

    existsUsername: async (data, identifier) => {
        const conn = Database.get()
        const { username } = data
        const result = identifier ? await conn.query(QUERY_USERNAME_UPDATE, [username, identifier]) : await conn.query(QUERY_USERNAME, [username])
        return { exists: result.rows[0].total > 0, field: "username" }
    },

    schema: async (data, identifier) => {
        const error = new FormError()
        const schema = ZOD_SCHEMA.safeParse(data)
        const username = await ItemStore.existsUsername(data, identifier)

        if (!schema.success) error.zod(schema.error.errors)
        if (username.exists) error.add(username.field, "Este valor ya existe")

        return {
            success: error.getAll() ? false : true,
            errors: error.getAll()
        }
    },

    login: async (data) => {
        const conn = Database.get()
        const { username, password } = data
        const result = await conn.query(QUERY_LOGIN, [username, password])
        return { success: result.rows.length > 0, item: result.rows[0] }
    },

}

const ZOD_SCHEMA = zod.object({
    username: zod.string()
        .min(8, "Requerido: mínimo 8 carácteres")
        .max(20, "Requerido: menos de 50 carácteres"),
    password: zod.string()
        .min(8, "Requerido: mínimo 8 carácteres")
        .max(20, "Requerido: menos de 30 carácteres"),
})

module.exports = ItemStore