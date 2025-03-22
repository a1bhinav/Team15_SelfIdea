import React from "react";
import HelloWorld from "./components/HelloWorld";
import PdfParser from "./components/PdfParser";
const App: React.FC = () => {
  return (
    <div>
      <HelloWorld />
      <PdfParser />
    </div>
  );
};

export default App;
