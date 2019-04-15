import gql from 'graphql-tag'

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query getUser {
          me {
            id
            username
            role
          }
        }
      `
    })
    .then(({ data }) => {
      // console.log("checkLoggedIn = " + JSON.stringify(data))
      return { loggedInUser: data }
    })
    .catch((error) => {
      // console.log("checkLoggedIn catch()= " + JSON.stringify(error))
      // Fail gracefully
      return { loggedInUser: {} }
    })
