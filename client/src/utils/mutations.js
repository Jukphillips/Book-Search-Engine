import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!){
    login(email: $email, password: $password){
        token
        user {
            _id
            username
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!){
    addUser(username: $username, email: $email, password: $password ){
     token 
     user {
         _id
        username
     }   
    }
}`;

export const SAVE_BOOK = gql`
mutation saveBook($bookData: BookInput!){
    saveBook(bookData: $bookData){
        token 
        user {
        _id
        username
        email
        savedBooks {
            title
            bookId
            authors
            image
            link
            description
            title
            }
        }
    }
}

`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookID: ID!){
    removeBook(bookId: $bookId) {
        _id
       username
       email
       saveBooks {
           bookId
           authors           
           title
           description
           image
           link
       } 
    }
}

`


