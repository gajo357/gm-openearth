import { useState } from "react";
import "./App.css";
import ContentContainer from "./components/ContentContainer";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <ContentContainer />
    </div>
  );
}

export default App;
