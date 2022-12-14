const query = {
  getUserDetailsQuery: {
    operationName: "MyQuery",
    query: `
        query MyQuery {
          user_user {
            id
            email
          }
        }`,
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