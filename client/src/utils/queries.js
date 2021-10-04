import { gpl } from '@apollo/client'

export const GET_ME = gpl`
  query me {
    User {
      _id
      username
      email
      bookCount
      savedBooks {
        BookId
        authors
        description
        title
        image
        link
      }
      
    }
  }`;