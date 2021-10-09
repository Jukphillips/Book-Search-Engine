const {AuthenticationError} = require('apollo-server-express')
const { User } = require("../models")
const { signToken } = require("../utils/auth")

const resolvers = {

    Query: {
        me: async (parent, args, context) => {
            if(context.user){
               const foundUser = await User.findOne({
                   $or: [{_id: user ? user._id : params.id}, {username: params.username}]
               })

               if(!foundUser){
                   throw new AuthenticationError("Cannot find a user with this id!") 
               } else {
                 return foundUser
               }
            }
            throw new AuthenticationError("You need to be logged in!")
        }
    }, 
    Mutation: {
       login: async (parent, {email, username, password}) => {
           const profile = await User.findOne({
               $or: [{ username}, { email}]
           })

           if(!profile){
               throw new AuthenticationError("No profile with those crednetials is found!")
           }

           const correctPw = await profile.isCorrectPassword(password)

           if(!correctPw) {
               throw new AuthenticationError("Incorrect password!")
           }

           const userToken = signToken(profile)
           return {token: userToken, profile}
       },

        addUser: async (parent, {username, email, password }) => {
            const user = await User.create({ username, email, password});

            if(!user) {
                throw new AuthenticationError("Something went wrong!")
            }

            const token = signToken(user)
            return {token, user}
        },

        saveBook: async (parent, args, context ) => {
            if(context.user){
               const save = await User.findbyIdAndUpdate(
                {_id: context.user._id},
                {$addToSet: {savedBooks: args.input}},
                {new: true, runValidators: true});
                
                return save
                
            }
            throw new AuthenticationError("You need to be logged in!")
        },

        removeBook: async (parent, args, context) => {
            if(context.user){
                const remove = await User.findbyIdAndUpdate(
                    {_id: context.user._id},
                    {$pull: { savedBooks: {bookId: args.bookId}}},
                    {new: true}
                    )
                    if(!remove){
                        throw new AuthenticationError("Couldn't find user with those credentials!")
                    }
                    return remove
            }
            throw new AuthenticationError("You need to be logged in!")
        } 




    }



}

module.exports = resolvers