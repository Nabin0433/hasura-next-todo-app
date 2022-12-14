import axios from '../utils/asiox'
import React from 'react'
import { toast } from 'react-hot-toast'
import mutation from '../utils/graphql/mutation'
import { useRecoilState } from 'recoil'
import { todosAtom } from '../atom/todoAtom'
// @ts-ignore
import Fade from 'react-reveal/Fade';

interface Props {
    todo: Todo
}

const TodoCard = ({ todo }: Props) => {
    const date = new Date(todo?.date).toDateString()
    const [myTodos, setMytodos] = useRecoilState(todosAtom)

    const deleteTodo = () => {
        if (todo.id) {
            const notification = toast.loading('loading....')
            axios.post('', mutation.deleteTodoMutation(todo.id)).then(res => {
                toast.success('Successfully delete your todo', { id: notification })
                const newtodo = myTodos.filter(item => item.id !== todo.id);
                setMytodos(newtodo)
            }).catch(err => {
                toast.error('Error on delete todo', { id: notification })
            })
        } else {
            toast.error('something went wrong')
        }
    }
    return (
        <Fade bottom>
            <div className='bg-gray-200 text-black w-[350px] h-14 p-2 rounded-sm relative my-2 shadow shadow-gray-600'>
                <p className='text-sm w-[75%] h-[99%] overflow-clip break-words text-gray-700'>{todo.title}</p>
                <p className='text-[10px] absolute bottom-1 right-1 text-gray-600'>{date}</p>
                <button className='text-sm text-red-800 font-bold hover:text-red-600 cursor-pointer absolute top-0 right-1 p-1' onClick={deleteTodo}>X</button>
            </div>
        </Fade>

    )
}

export default TodoCard