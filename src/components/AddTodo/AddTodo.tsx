function AddTodo() {
    return (
         <div id="add-task-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Add New Task</h2>
                <button id="close-modal" className="text-gray-500 hover:text-gray-700 whitespace-nowrap">
                    <div className="w-6 h-6 flex items-center justify-center">
                        <i className="ri-close-line ri-lg"></i>
                    </div>
                </button>
            </div>
            <form id="add-task-form">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                    <input type="text" id="task-title" className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Enter task title" required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input type="date" id="task-due-date" className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <div className="flex space-x-4">
                        <label className="flex items-center">
                            <input type="radio" name="priority" value="low" className="hidden" />
                            <span className="w-4 h-4 border border-gray-300 rounded-full inline-block mr-2 flex-shrink-0"></span>
                            <span className="text-sm">Low</span>
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="priority" value="medium" className="hidden" checked />
                            <span className="w-4 h-4 border border-gray-300 rounded-full inline-block mr-2 flex-shrink-0"></span>
                            <span className="text-sm">Medium</span>
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="priority" value="high" className="hidden" />
                            <span className="w-4 h-4 border border-gray-300 rounded-full inline-block mr-2 flex-shrink-0"></span>
                            <span className="text-sm">High</span>
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                    <textarea id="task-notes" className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Add any additional notes"></textarea>
                </div>
                <div className="flex justify-end space-x-2">
                    <button type="button" id="cancel-add-task" className="px-4 py-2 border border-gray-200 rounded-button text-gray-700 hover:bg-gray-50 whitespace-nowrap">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded-button hover:bg-blue-600 whitespace-nowrap">Add Task</button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default AddTodo