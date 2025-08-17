import TodoItem from "../TodoItem/TodoItem";
import { fetchTodos, deleteTodo, toggleTodo } from "../../api/todos.ts";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import EditTodo from "../EditTodo/EditTodo";
import Pagination from "@mui/material/Pagination";

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
    const [pages, setPages] = useState(); // Количество страниц
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница
    const [limit, setLimit] = useState(5); // Ограничение задач на странице

    const openModal = (id: number) => {
        setSelectedId(id);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedId(null);
        setModalIsOpen(false);
    };

    function handleToggleTodo(id: number) {
        const todoToUpdate = todos.find((todo) => todo.id === id);
        if (!todoToUpdate) return;

        toggleTodo(id, !todoToUpdate.completed)
            .then(() => {
                setTodos(
                    prevTodos =>
                        prevTodos.map((todo) =>
                            todo.id === id
                                ? { ...todo, completed: !todo.completed }
                                : todo
                        ),
                );
            })
            .catch((error) => console.error("Error updating todo:", error));
    }

    function handleDeleteTodo(id: number) {
        deleteTodo(id)
            .then(() => {
                setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
            })
            .catch((error) => console.error("Error deleting todo:", error));
    }

    useEffect(() => {
        fetchTodos(currentPage, limit) // Добавляем параметр limit
            .then((response) => {
                if (response) {
                    setTodos(response.data);
                    setPages(response.totalPages);
                }
            })
            .catch((error) => console.error("Error fetching todos:", error))
            .finally(() => {
                setIsLoaded(true);
            });
    }, [currentPage, limit]); // Включаем зависимость от limit

    return (
        <>
            {isLoaded ? (
                <div className="flex flex-col gap-[40px] items-center">
                    <div className="px-6 py-4 space-y-3 w-full">
                        <select
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            className="py-2 pl-3 pr-10 leading-5 cursor-default w-full sm:text-sm sm:leading-5"
                        >
                            <option value="5">5 задач на странице</option>
                            <option value="10">10 задач на странице</option>
                            <option value="20">20 задач на странице</option>
                        </select>
                        {todos.length > 0 &&
                            todos.map((todo) => (
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
                        <Modal
                            className="flex items-center justify-center h-screen"
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                        >
                            <EditTodo id={selectedId} closeModal={closeModal} />
                        </Modal>
                    </div>
                    <Pagination
                        count={pages}
                        page={currentPage}
                        onChange={(_, value) => setCurrentPage(value)}
                        color="primary"
                    />
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}

export default TodoList;