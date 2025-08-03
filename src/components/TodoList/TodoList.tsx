import TodoItem from "../TodoItem/TodoItem";
import { fetchTodos, deleteTodo } from "../../api/todos.ts";
import { useEffect, useState } from "react";

interface TodoType {
    id: number;
    text: string;
    completed: boolean;
    createdAt: string;
}

function TodoList() {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    function handleDeleteTodo(id: number) {
        deleteTodo(id)
            .then(() => {
                setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id)); // Фильтруем удалённую задачу
            })
            .catch(error => console.error("Error deleting todo:", error));
    }

    useEffect(() => {
        fetchTodos()
            .then(response => {
                if (response) {
                    setTodos(response.data);
                }
            })
            .catch(error => console.error("Error fetching todos:", error))
            .finally(() => {
                setIsLoaded(true);
            });
    }, []);

    return (
        <>
            {isLoaded ? (
                <div id="task-list" className="px-6 py-4 space-y-3">
                    {todos.length > 0 && todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            id={todo.id}
                            text={todo.text}
                            date={todo.createdAt}
                            deleteTask={handleDeleteTodo}
                        />
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}

export default TodoList;