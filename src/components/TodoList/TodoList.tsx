import TodoItem from '../TodoItem/TodoItem';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import EditTodo from '../EditTodo/EditTodo';
import Pagination from '@mui/material/Pagination';
import { useAppSelector, useAppDispatch } from '../../redux/hooks.ts';
import { getTodos, selectTodosData, setCurrentPage, setLimit, deleteThisTodo, toggleThisTodo } from '../../redux/slices/todoSlice';
import type { TodoType } from '../../redux/slices/todoSlice.ts';

function TodoList() {
  const dispatch = useAppDispatch();
  const { data, status, page, limit, totalPages } = useAppSelector(selectTodosData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const openModal = (id: number) => {
    setSelectedId(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedId(null);
    setModalIsOpen(false);
  };

  function handleToggleTodo(id: number) {
    const todoToUpdate = data.find((todo) => todo.id === id);
    if (!todoToUpdate) return;
    dispatch(toggleThisTodo({ id: id, completed: !todoToUpdate.completed}));
  }

  function handleDeleteTodo(id: number) {
    dispatch(deleteThisTodo({ id: id }));
  }

  useEffect(() => {
    dispatch(getTodos({ page, limit }));
  }, [dispatch, page, limit]);

  return (
    <>
      {status ? (
        <div className="flex flex-col gap-[40px] items-center">
          <div className="px-6 py-4 space-y-3 w-full">
            <select
              value={limit}
              onChange={(e) => dispatch(setLimit(Number(e.target.value)))}
              className="py-2 pl-3 pr-10 leading-5 cursor-default w-full sm:text-sm sm:leading-5">
              <option value="5">5 задач на странице</option>
              <option value="10">10 задач на странице</option>
              <option value="20">20 задач на странице</option>
            </select>
            {Array.isArray(data) && data.length > 0 &&
              data.map((todo: TodoType) => (
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
              onRequestClose={closeModal}>
              <EditTodo id={selectedId} closeModal={closeModal} />
            </Modal>
          </div>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => dispatch(setCurrentPage(value))}
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
