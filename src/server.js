import Express from "Express" //added "type" : "module" to the JSON file
import listEndpoints from "express-list-endpoints"
import authorsRouter from "./api/authors/index.js"
import cors from 'cors'

const server = Express()
const port = 3001
server.use(cors())
server.use(Express.json()) //added this to get rid of undefined bodies in request
server.use("/authors", authorsRouter)
server.listen(port, () => {
    console.table(listEndpoints(server))
    console.log(`Server is running on port ${port}`)
})