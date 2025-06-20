import React, { useEffect, useState } from 'react';

export default function LoginTest() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Initial message
  useEffect(() => {
    setMessage("please provide informations");
  }, []);

  // Welcome Salin logic
  useEffect(() => {
    if (name.toLowerCase() === "salin") {
      setMessage("welcome salin");
    }
  }, [name]);

  const handleSubmit = () => {
    if (!name || !email || !password) {
      setMessage("provide all informations");
    } else {
      setMessage("congratulations");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />
      <button onClick={handleSubmit}>Submit</button>
      <br /><br />
      <p>{message}</p>
    </div>
  );
}
