import React from 'react';
import '../styles/Header.css';

const Header = () => {
    const time=new Date().getHours();
    const greet=time<12?'Good Morning':time<16?'Good Afternoon':time<20?'Good Evening':'Good Night';
  return (
    <div className="header">
      <h1 className="app-title">Task Manager</h1>
      <p className='greeting'>{greet}</p>
    </div>
  );
};

export default Header;
