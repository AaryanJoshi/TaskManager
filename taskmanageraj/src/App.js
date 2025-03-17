import React from 'react';
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import TaskList2 from './components/TaskList2';

// const App = () => {
//   return (
//       <div className="App">
//         <Header/>
//         <Navbar/>
//       </div>
//     );
// }

// export default App;

// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar'; // Assuming Navbar is in components folder
// import HomePage from './pages/HomePage'; // Your home page component
// import TaskList from './pages/TaskList'; // Your task list page component
// import AddTask from './pages/AddTask'; // Your add task page component

function App() {
  return (
    <Router>
      <Header/>
      <Navbar>
      <Routes>
        <Route path="/" element={<TaskList/>} />
        <Route path="/task-list" element={<TaskList2/>} />
        <Route path="/add-task" element={<AddTask/>} />
      </Routes>
      </Navbar>
    </Router>
  );
}

export default App;

