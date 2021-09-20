const graphql = require('graphql')
const _ = require('lodash')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLID,
    GraphQLInt
} = graphql

//dummydata
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Color of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light of Tomas', genre: 'Sci-Fi', id: '5', authorId: '3' },

]

var authors = [
    { name: "Patrick Rothfuss", age: 44, id: "1" },
    { name: "Brandon Sanderson", age: 34, id: "2" },
    { name: "Terry Paratchett", age: 23, id: "3" },
]


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: {
            type: AuthorType,
            resolve(parent, args) {
                //console.log(parent)
                return _.find(authors, { id: parent.authorId })
            }
        }
    })
})


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id })
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id })
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})





/* const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            hello: {
                type: GraphQLString,
                resolve() {
                    return 'Hello world'
                },

            },
        },
    }),
})

module.exports = schema */