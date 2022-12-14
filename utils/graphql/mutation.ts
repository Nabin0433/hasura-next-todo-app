const mutation = {
  postTodoMutation: ({ date, isComplete, title }: Todo) => {
    return {
      operationName: "MyMutation",
      query: `mutation MyMutation {
        insert_user_todos_one(object: {date: ${date}, isComplete: ${isComplete}, title: ${title}}) {
          isComplete
          title
          date
          id
        }
      }`,
    }
  },
  deleteTodoMutation: (id: number) => {
    return {
      operationName: "MyMutation",
      query: `mutation MyMutation {
        delete_user_todos_by_pk(id: ${id}) {
          id
        }
      }`,
    }
  }
}

export default mutation;