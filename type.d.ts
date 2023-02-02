interface User {
    id: string,
    name: string,
    email: string,
    pic: string,
}

interface Todo {
    id?: number,
    title: string,
    date: number,
    isComplete: boolean,
}