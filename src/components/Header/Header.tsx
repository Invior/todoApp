function Header() {
    return (
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Список задач</h1>
            <button id="add-task-btn" className="bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center whitespace-nowrap">
                <span>Создать задачу</span>
            </button>
        </div>
    )
}

export default Header