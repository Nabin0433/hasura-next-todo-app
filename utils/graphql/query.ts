import { gql } from '@apollo/client';



export const GET_TODOS = gql`
  query MyQuery {
    user_todos {
      date
      id
      isComplete
      title
    }
  }
`;

const query = {
  getUserByemailAndPassword: (username: string, password: string) => {
    return {
      operationName: "MyQuery",
      query: `query MyQuery {
        user_user(where: {email: {_eq: "admin1@gmail.com"}, password: {_eq: "Admin12345"}}) {
          email
          password
          id
          name
          pic
        }
      }`,
    }
  },
  getTodosQuery: {
    operationName: "MyQuery",
    query: `
      query MyQuery {
        user_todos {
          date
          id
          isComplete
          title
        }
      }`,
  }
}

export default query;



