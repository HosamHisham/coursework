import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Sigo's Cookbook</h1>
        <div className="login-signup">
          <a href="#">Login</a>
          <a href="#">Signup</a>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
        </div>
      </header>
      <div className="welcome-message">
        <p>Welcome to Sigo's Cookbook, where luxury meets home cooking. Discover expertly crafted recipes that transform everyday ingredients into gourmet masterpieces, elevating every meal with sophistication and flavor.</p>
      </div>
      <div className="sections">
        <div className="section">
          <img src="breakfast.jpg" alt="Breakfast" />
          <h3>Breakfast</h3>
        </div>
        <div className="section">
          <img src="main_course.jpg" alt="Main Course" />
          <h3>Main Course</h3>
        </div>
        <div className="section">
          <img src="appetizer.jpg" alt="Appetizer" />
          <h3>Appetizer</h3>
        </div>
        <div className="section">
          <img src="dessert.jpg" alt="Dessert" />
          <h3>Dessert</h3>
        </div>
        <div className="section">
          <img src="drinks.jpg" alt="Drinks" />
          <h3>Drinks</h3>
        </div>
      </div>
      <footer className="footer">
        <button>Enter Feedback</button>
      </footer>
    </div>
  );
}

export default App;
