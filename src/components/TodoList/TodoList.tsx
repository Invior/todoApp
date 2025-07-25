import TodoItem from "../TodoItem/TodoItem"
import { fetchTodos } from "../../api/todos.ts"
import { useEffect, useState } from "react"

interface TodoType {
    id: number;
    text: string;
    completed: boolean;
    createdAt: string;
}

function TodoList() {
    const [todos, setTodos] = useState<TodoType[]>([])
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
    fetchTodos()
    .then(function(response) {
        if (response) {
            setTodos(response.data);
            console.log(response.data);
        }
    })
    .catch(error => console.error('Error fetching todos:', error))
    .finally(() => {
        setIsLoaded(true);
    });
}, []);

    return (
        <>
       {isLoaded ? (
         <div id="task-list" className="px-6 py-4 space-y-3">
            {todos.length > 0 && todos.map((todo) => (
                <TodoItem key={todo.id} text={todo.text} date={todo.createdAt}/>
            ))}
        </div>
       ) : (
            <div>Loading...</div>
       )}
       </>
    )
}

export default TodoList