import { Header } from './components/Header';
import { TodoList } from './components/TodoList';

import './App.css';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen max-w-4xl mx-auto bg-white shadow-sm min-h-screen">
            <Header />
            <TodoList />            
    </div>   
  )
}

export default App