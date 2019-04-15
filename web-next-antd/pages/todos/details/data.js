import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import { basicOptions } from '../../../data/detailsCommon'

export const todoBasic = gql`
  query TodoBasic($id: String!) {
    getTodoById(id: $id) {
      id
      title
    }
  }
`;

export const todoFull = gql`
  query TodoFull($id: String!) {
    getTodoById(id: $id) {
      id
      title
	    description
      isCompleted
      comments {
          id
          text
          writtenBy {
              id
              username
          }
      }

    }
  }
`;

export default compose(
	graphql(todoBasic, basicOptions),
	graphql(todoFull, basicOptions)
)