// Authors should contain the following information:

//     name
//     surname
//     ID (Unique and server-generated)
//     email
//     date of birth
//     avatar (e.g. https://ui-avatars.com/api/?name=John+Doe)



// The backend should include the following routes:

//     GET /authors => returns the list of authors
//     GET /authors/123 => returns a single author
//     POST /authors => create a new author
//     PUT /authors/123 => edit the author with the given id
//     DELETE /authors/123 => delete the author with the given id



import Express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid"

const authorsRouter = Express.Router()

// console.log("CURRENT FILE URL:", import.meta.url)
// console.log("CURRENT FILE PATH:", fileURLToPath(import.meta.url))
// console.log("PARENT FOLDER'S PATH:", dirname(fileURLToPath(import.meta.url)))
// console.log("TARGET:", join(dirname(fileURLToPath(import.meta.url))),"authors.json")

const authorsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "authors.json")
// console.log("TARGET:", join(dirname(fileURLToPath(import.meta.url))), "uthors.json")

authorsRouter.post("/", (req, res) => {
    const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))//read the content of the file, obtaining an array
    if (authorsArray.some((a) => a.email === req.body.email)) {
        console.log("includes")
        res.status(400).send("Email already exist!")
    } else {
        console.log("Does not include, author can be added!")
        const newAuthor = { ...req.body, createdAt: new Date(), updatedAt: new Date(), id: uniqid() } //added some server generated info
        authorsArray.push(newAuthor)
        fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray)) // we cannot pass an array here, it needs to be converted into a string
        res.status(201).send({ message: newAuthor.id })
    }

})

authorsRouter.get("/", (req, res) => {
    const fileContentAsBuffer = fs.readFileSync(authorsJSONPath)
    const authorsArray = JSON.parse(fileContentAsBuffer)
    res.send(authorsArray)
})

authorsRouter.get("/:authorID", (req, res) => { //dd82z1lfcleobbkne sample id
    const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
    const author = authorsArray.find(author => author.id === req.params.authorID)
    res.status(200).send(author)
})

authorsRouter.put("/:authorID", (req, res) => {
    const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
    const index = authorsArray.findIndex(author => author.id === req.params.authorID)
    const oldAuthor = authorsArray[index]
    const updatedAuthor = { ...oldAuthor, ...req.body, updatedAt: new Date() }
    authorsArray[index] = updatedAuthor
    fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray))
    res.send(updatedAuthor)
})

authorsRouter.delete("/:authorID", (req, res) => {
    const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
    const remainingAuthors = authorsArray.filter(author => author.id !== req.params.authorID)
    fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors))
    res.status(204).send()
})

export default authorsRouter