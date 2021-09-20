const graphql = require('graphql')
const _ = require('lodash')
const { 
    GraphQLSchema, 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID,
} = graphql

//dummydata
var books=[
    {name:'Name of the Wind',genre:'Fantasy',id:'1'},
    {name:'The Final Empire',genre:'Fantasy',id:'2'},
    {name:'the Long Earth',genre:'Sci-Fi',id:'3'},
]

var authors=[
    {name:"Patrick Rothfuss" ,age:44, id:"1"},
    {name:"Brandon Sanderson" ,age:34, id:"2"},
    {name:"Terry Paratchett" ,age:23, id:"3"},
]


const BookType= new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString}
    })
})


const RootQuery= new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(books,{id:args.id})
            }
        }
    }
})

module.exports=new GraphQLSchema({
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