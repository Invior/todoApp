import {format} from 'date-fns/format';

function TodoItem({text, date}: any) {
    return (
        <div className="task-card bg-white border border-gray-100 rounded-lg p-4 shadow-sm flex items-start">
            <label className="checkbox-container mt-1 mr-3 flex-shrink-0">
                <input type="checkbox" className="custom-checkbox" />
                <span className="checkmark"></span>
            </label>
            <div className="flex-grow">
                <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">{text}</h3>
                    <div className="flex items-center task-actions">
                        <button className="p-1 text-gray-400 hover:text-gray-600 whitespace-nowrap">
                            <div className="w-6 h-6 flex items-center justify-center">
                                Изменить
                            </div>
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-500 whitespace-nowrap">
                            <div className="w-6 h-6 flex items-center justify-center">
                                Удалить
                            </div>
                        </button>
                    </div>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                        <i className="ri-calendar-line"></i>
                    </div>
                    <span>{format(date, 'dd.MM.yyyy')}</span>
                </div>
            </div>
        </div>
    )
}

export default TodoItem