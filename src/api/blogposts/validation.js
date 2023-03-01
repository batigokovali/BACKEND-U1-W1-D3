import { checkSchema, validationResult } from "express-validator"
import createHttpError from "http-errors"

const blogpostsSchema = {
    category: {
        in: ["body"],
        isString: {
            errorMessage: "Category is a mandatory field and needs to be a string!"
        }
    },
    title: {
        in: ["body"],
        isString: {
            errorMessage: "Title is a mandatory field and needs to be a string!"
        }
    },
    cover: {
        in: ["body"],
        isString: {
            errorMessage: "Cover is a mandatory field and needs to be a string!"
        }
    },

}