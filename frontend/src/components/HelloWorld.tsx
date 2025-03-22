import React, { useEffect, useState } from "react";

const HelloWorld: React.FC = () => {
  const [message, setMessage] = useState<string>(""); // To store the result from the hello api call

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hello");
        const data = await response.text();
        setMessage(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchMessage();
  }, []);

  return <h1>{message}</h1>;
};

export default HelloWorld;
