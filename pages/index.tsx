import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import TodoCard from "../components/TodoCard";
import axios from "../utils/asiox";
import query, { GET_TODOS } from '../utils/graphql/query'
import mutation from '../utils/graphql/mutation'
import { useRecoilState, useRecoilValue } from "recoil";
import { todosAtom } from '../atom/todoAtom'
import { authAtom } from "../atom/authAtom";
import { useQuery } from "@apollo/client";
interface Props {
  todos: Todo[]
}

const Home = ({ todos }: Props) => {
  const [myTodos, setMytodos] = useRecoilState(todosAtom)
  const [newTodo, setNewTodo] = useState<string>('')

  const user = useRecoilValue(authAtom)


  const { data, loading, error } = useQuery(GET_TODOS);


  useEffect(() => {
    if (todos[0]) {
      setMytodos(todos)
    }
  }, [todos])

  const submitTodo = (e: FormEvent<HTMLFormElement>) => {
    if (newTodo) {
      setNewTodo('')
      const notification = toast.loading('loading....')
      e.preventDefault()
      axios.post('', mutation.postTodoMutation({
        date: Date.now(),
        title: newTodo,
        isComplete: false,
      })).then(res => {
        toast.success('Successfully created your todo', { id: notification })
        setMytodos(old => ([...old, res?.data?.data?.insert_user_todos_one]))
      }).catch(err => {
        toast.error('Error on create todo', { id: notification })
      })
    } else {
      toast.error('Plase enter your todo')
    }
  }

  return (
    <>
      {/* backgroun effect */}
      <div className="bganimation">
        <div className="night">
          {new Array(20).fill('_').map((_, index) => <div key={index + 'shooting_star'} className="shooting_star" />)}
        </div>
      </div>
      {/*  */}
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-xl mb-4 text-center">Hasura Todo App</h2>
        <br />
        <form onSubmit={submitTodo}>
          <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Enter Your Todo" className="pl-4 rounded text-sm h-10 w-60 mb-8 outline-none placeholder:text-gray-500 text-gray-800" />
        </form>
        <h4 className="border-b-[0.4px] pb-4 w-1/2 border-gray-300 mb-4 text-center text-lg">Your Todo List</h4>
        <div className="h-[600px] overflow-scroll pb-12">
          {myTodos?.map((item => item && <TodoCard key={item.id} todo={item} />))}
        </div>
      </div>
    </>
  )
}

export default Home;

export async function getServerSideProps(context: any) {
  const res = await (await axios.post('', query.getTodosQuery)).data;
  return {
    props: {
      todos: res?.data?.user_todos ?? []
    },
  }
}