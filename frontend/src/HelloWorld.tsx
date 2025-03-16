import React, { useEffect, useState } from "react";

const HelloWorld: React.FC = () => {
  const [message, setMessage] = useState<string>(""); // State to hold the response message

  useEffect(() => {
    // Fetch data from the backend '/hello' route when the component mounts
    fetch("http://localhost:5000/api")
      .then((response) => response.text()) // Get the response text from the backend
      .then((data) => setMessage(data)) // Set the message in state
      .catch((error) => console.error("Error fetching data:", error)); // Handle errors
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      <h1>{message}</h1> {/* Display the message */}
    </div>
  );
};

export default HelloWorld;
