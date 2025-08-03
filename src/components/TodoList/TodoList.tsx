import TodoItem from "../TodoItem/TodoItem";
import { fetchTodos, deleteTodo, toggleTodo } from "../../api/todos.ts";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import EditTodo from "../EditTodo/EditTodo";

interface TodoType {
    id: number;
    text: string;
    completed: boolean;
    createdAt: string;
}

function TodoList() {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const openModal = (id: number) => {
        setSelectedId(id);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedId(null); // Очищаем ID при закрытии модала
        setModalIsOpen(false);
    };

    

    function handleToggleTodo(id: number) {
        const todoToUpdate = todos.find(todo => todo.id === id);
        if (!todoToUpdate) return;
        
        toggleTodo(id, !todoToUpdate.completed)
            .then(() => {
                setTodos(prevTodos =>
                    prevTodos.map(todo => {
                        if (todo.id === id) {
                            return { ...todo, completed: !todo.completed }; // Инвертируем статус завершения
                        }
                        return todo;
                    })
                );
            })
            .catch(error => console.error("Error updating todo:", error));
    }

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
                            completed={todo.completed}
                            toggleTask={handleToggleTodo}
                            openChangeModal={openModal}
                        />
                    ))}
                    <Modal className="flex items-center justify-center h-screen" isOpen={modalIsOpen} onRequestClose={closeModal} >
                        <EditTodo id={selectedId} closeModal={closeModal} />
                    </Modal>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}

export default TodoList;