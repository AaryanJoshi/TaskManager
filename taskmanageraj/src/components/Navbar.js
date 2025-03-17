// import React, { useState } from 'react';
// import { CgMenuGridR } from "react-icons/cg";
// import { FaList } from 'react-icons/fa';
// import { FaHome } from "react-icons/fa";
// import { IoMdAddCircle } from "react-icons/io";
// import TaskList from './TaskList';
// import TaskList2 from './TaskList2';
// import '../styles/Navbar.css';
// import AddTask from './AddTask';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isTaskList, setIsTaskList] = useState(true);
//   const [isAll, setIsAll] = useState(false);
//   const [isAdd, setIsAdd] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const toggleHome = () => {
//     setIsTaskList(!isTaskList);
//   };
//   const toggleAll = () => {
//     setIsAll(!isAll);
//   };
//   const toggleAdd = () => {
//     setIsAdd(!isAdd);
//   };

//   return (
//     <div>
//       <ul className={isMenuOpen ? 'menu-open' : 'menu-closed'}>
//         <li className='firstmenu' onClick={toggleMenu}>
//           <CgMenuGridR className="menuicon" />
//           <span className={isMenuOpen ? 'show-text' : 'hide-text'}>Menu</span>
//         </li>
//         <li className='home' onClick={toggleHome}>
//           <FaHome className="homeicon" />
//           <span className={isMenuOpen ? 'show-text' : 'hide-text'}>Home</span>
//         </li>
//           <li onClick={() => { toggleAll();}} >
//             <FaList className="tasklist" />
//             <span className={isMenuOpen ? 'show-text' : 'hide-text'}>Task List</span>
//           </li>
//           <li onClick={() => { toggleAdd();}}>
//             <IoMdAddCircle className="Add-task" />
//             <span className={isMenuOpen ? 'show-text' : 'hide-text'}>Add Task</span>
//             </li>
//       </ul>
//       {isTaskList?<TaskList/>:null}
//       {isAdd ? <AddTask/>:null}
//       {isAll ? <TaskList2/>:null}
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import { CgMenuGridR } from "react-icons/cg";
import { FaList } from 'react-icons/fa';
import { FaHome } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import '../styles/Navbar.css';

const Navbar = ({children}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (route) => {
    navigate(route); // Navigate to the passed route
  };

  return (
    <div>
      <ul className={isMenuOpen ? 'menu-open' : 'menu-closed'}>
        <li className='firstmenu' onClick={toggleMenu}>
          <CgMenuGridR className="menuicon" />
          <span className={isMenuOpen ? 'show-text' : 'hide-text'}>Menu</span>
        </li>
        <li className='home' onClick={() => handleNavigation("/")}>
          <FaHome className="homeicon" />
          <span className={isMenuOpen ? 'show-text' : 'hide-text'}>Home</span>
        </li>
        <li onClick={() => handleNavigation("/task-list")}>
          <FaList className="tasklist" />
          <span className={isMenuOpen ? 'show-text' : 'hide-text'}>Task List</span>
        </li>
        <li onClick={() => handleNavigation("/add-task")}>
          <IoMdAddCircle className="Add-task" />
          <span className={isMenuOpen ? 'show-text' : 'hide-text'}>Add Task</span>
        </li>
      </ul>
      <main>{children}</main>
    </div>
  );
};

export default Navbar;

