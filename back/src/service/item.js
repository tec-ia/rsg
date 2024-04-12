const ItemStore = require("../store/item")
const jwt = require("jsonwebtoken")

const {
    STATUS_RESPONSE_SUCCESS,
    STATUS_RESPONSE_FAILED,
    STATUS_RESPONSE_NOTFOUND,
    STATUS_RESPONSE_INVALIDSCHEMA
} = require("../utils/constants")

const ItemService = {

    all: async (req, res) => {

        try {

            const result = await ItemStore.all()

            return res.json({
                status: STATUS_RESPONSE_SUCCESS,
                data: result,
                message: "Se ha obtenido la información"
            })

        } catch (error) {

            console.log(error)

            return res.json({
                status: STATUS_RESPONSE_FAILED,
                data: null,
                message: "Ha ocurrido un error"
            })

        }

    },

    byId: async (req, res) => {

        try {

            const result = await ItemStore.byId(req.params.id)

            if (!result) return res.json({
                status: STATUS_RESPONSE_NOTFOUND,
                data: result,
                message: "No existe el registro"
            })

            return res.json({
                status: STATUS_RESPONSE_SUCCESS,
                data: result,
                message: "Se ha obtenido la información"
            })

        } catch (error) {

            console.log(error)

            return res.json({
                status: STATUS_RESPONSE_FAILED,
                data: null,
                message: "Ha ocurrido un error"
            })

        }

    },

    byUsername: async (req, res) => {

        try {

            const result = await ItemStore.byUsername(req.params.username)

            if (!result) return res.json({
                status: STATUS_RESPONSE_NOTFOUND,
                data: result,
                message: "No existe el registro"
            })

            return res.json({
                status: STATUS_RESPONSE_SUCCESS,
                data: result,
                message: "Se ha obtenido la información"
            })

        } catch (error) {

            console.log(error)

            return res.json({
                status: STATUS_RESPONSE_FAILED,
                data: null,
                message: "Ha ocurrido un error"
            })

        }

    },

    create: async (req, res) => {

        try {

            const schema = await ItemStore.schema(req.body)

            if (!schema.success) return res.json({
                status: STATUS_RESPONSE_INVALIDSCHEMA,
                errors: schema.errors,
                message: "La información no cumple el esquema"
            })

            const result = await ItemStore.create(req.body)

            return res.json({
                status: STATUS_RESPONSE_SUCCESS,
                data: result,
                message: "Se ha agregado la información"
            })

        } catch (error) {

            console.log(error)

            return res.json({
                status: STATUS_RESPONSE_FAILED,
                data: null,
                message: "Ha ocurrido un error"
            })

        }

    },

    update: async (req, res) => {

        try {

            const schema = await ItemStore.schema(req.body, req.body.id ?? 0)

            if (!schema.success) return res.json({
                status: STATUS_RESPONSE_INVALIDSCHEMA,
                errors: schema.errors,
                message: "La información no cumple el esquema"
            })

            const result = await ItemStore.update(req.body)

            return res.json({
                status: STATUS_RESPONSE_SUCCESS,
                data: result,
                message: "Se ha actualizado la información"
            })

        } catch (error) {

            console.log(error)

            return res.json({
                status: STATUS_RESPONSE_FAILED,
                data: null,
                message: "Ha ocurrido un error"
            })

        }

    },

    delete: async (req, res) => {

        try {

            const result = await ItemStore.delete(req.body.id ?? 0)

            return res.json({
                status: STATUS_RESPONSE_SUCCESS,
                data: result,
                message: "Se ha eliminado la información"
            })

        } catch (error) {

            console.log(error)

            return res.json({
                status: STATUS_RESPONSE_FAILED,
                data: null,
                message: "Ha ocurrido un error"
            })

        }

    },

    login: async (req, res) => {

        try {

            const { success, item } = await ItemStore.login(req.body)

            if (!success) return res.json({
                status: STATUS_RESPONSE_NOTFOUND,
                data: item,
                message: "Las credenciales son incorrectas",
            })

            const token = jwt.sign({ id: item.id, username: item.username }, process.env.APP_SECRET, { expiresIn: "1h" });

            return res.json({
                status: STATUS_RESPONSE_SUCCESS,
                data: token,
                message: "Se ha obtenido la información"
            })

        } catch (error) {

            console.log(error)

            return res.json({
                status: STATUS_RESPONSE_FAILED,
                data: null,
                message: "Ha ocurrido un error"
            })

        }

    },

}

module.exports = ItemService