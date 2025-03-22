import React from "react";
import HelloWorld from "./components/HelloWorld"; // Import the HelloWorld component
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
