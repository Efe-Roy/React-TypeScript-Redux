import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MapContainer from "./pages/MapContainer";

import './App.css';
import Count from "./pages/Count";
import TodoApp from "./pages/TodoApp";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MapContainer />} />
          <Route path="/count" element={<Count />} />
          <Route path="/todo" element={<TodoApp />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;