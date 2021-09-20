const express = require('express')
const {graphqlHTTP} = require('express-graphql')

const app = express()
const port = 5000
const schema= require('./Schema/Schema')

app.use('/graphql',graphqlHTTP({
    schema: schema,
    graphiql: true
}))


app.listen(port, () => {
    console.log(`Listening to the port ${port}`)
})

