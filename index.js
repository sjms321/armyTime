const sequelize = require("./databases");
const User = require("./models/user");
const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    users: [User]
    user(id:Int):User
  }
  type User {
    id: Int
    userId:String
    userPw:String
  }
  type Mutation{
      insertUser(
          userId:String
          userPw:String
      ):User
      deleteUser(
          userId:String
      ):User
      updateUser(
        id: Int
        userId:String
        userPw:String
      ):User
  }
`
const resolvers = {
    Query: {
        users: async () => User.findAll(),
        user: async (obj, args, context, info) => User.findByPk(args.id),
    },
    Mutation: {
        insertUser: async (_,{userId,userPw}) => {
            const newUser = await User.create({
                userId,
                userPw
            }).then(_ => console.log("계정생성완료"));
            
            const user = await User.findOne( { where: { userId: userId } });
            return user;
        },
        deleteUser:async(obj, args, context, info)=>{

            const user = await User.findOne( { where: { userId: args.userId } });
            User.destroy({where:{userId:args.userId}}).then(_ => console.log("계정삭제완료"));      
            return user;

        },

        updateUser:async(obj, args, context, info)=>{
            User.update({userId : args.userId,userPw : args.userPw},{where:{id:args.id}})
            const user = await User.findOne( { where: { id: args.id } });
            return user;
        }
    }
}
const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})




