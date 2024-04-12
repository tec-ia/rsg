class FormError {

    constructor(errors) {
        this.errors = errors
    }

    add = (field, message) => {

        let tem = []

        if (this.errors) {
            tem = [...this.errors]
            tem.push({ field, message })
        } else {
            tem.push({ field, message })
        }

        this.errors = [...tem]

    }

    getAll = () => {
        return this.errors
    }

    zod = (obj) => {

        let res = []

        if (this.errors) {
            res = [...this.errors]
        }

        obj.forEach(error => {
            res.push({
                field: error.path[0],
                message: error.message
            })
        })

        this.errors = [...res]

    }

}

module.exports = FormError