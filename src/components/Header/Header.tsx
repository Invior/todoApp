import { useState } from "react";
import Modal from "react-modal";
import AddTodo from "../AddTodo/AddTodo";

function Header() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
    setModalIsOpen(true);
    };

    const closeModal = () => {
    setModalIsOpen(false);
    };



    return (
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Список задач</h1>
            <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center whitespace-nowrap">
                <span>Создать задачу</span>
            </button>
            <Modal className="flex items-center justify-center h-screen" isOpen={modalIsOpen} onRequestClose={closeModal}>
                <AddTodo closeModal={closeModal}/>
            </Modal>
        </div>
    )
}

export default Header