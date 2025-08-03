import { useState } from "react";
import { changeTodoText } from "../../api/todos";

function changeTodo({ closeModal, id }: any) {
    const [task, setTask] = useState<string>("");

    // Функция обработки отправки формы
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {
            await changeTodoText(id, task);
            setTask("");
            closeModal();
        } catch (err) {
            console.error("Ошибка при создании задачи:", err);
        }
    }

    return (
    <>
        <div className="flex items-center justify-center z-50 border border-solid border-black">
            <div className="bg-white rounded-lg p-6 w-[400px] h-[400px] flex justify-center flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Изменить задачу</h2>
                    <button className="text-gray-500 hover:text-gray-700 whitespace-nowrap" onClick={closeModal}>
                        <div className="w-6 h-6 flex items-center justify-center">
                            <i className="ri-close-line ri-lg"></i>
                        </div>
                    </button>
                </div>
                <form id="add-task-form" onSubmit={handleSubmit}> 
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                        <input
                            type="text"
                            value={task} 
                            onChange={(event) => setTask(event.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Введите текст задачи"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={closeModal} className="px-4 py-2 border border-gray-200 rounded-button text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                            Отмена
                        </button>
                        <button type="submit" className="px-4 py-2 text-white rounded-button bg-blue-600 whitespace-nowrap">
                            Изменить задачу
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
    );
}

export default changeTodo;