import './App.css'
import Header from "./components/Header/Header.tsx"
import TodoList from "./components/TodoList/TodoList.tsx"

function App() {
  return (
    <div className="bg-gray-50 min-h-screen max-w-4xl mx-auto bg-white shadow-sm min-h-screen">
            <Header />
            <TodoList />            
    </div>   
  )
}

export default App