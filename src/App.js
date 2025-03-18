
import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Selecciona primero un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch("https://ecu-backend-1.onrender.com/api/upload", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.downloadUrl) {
          setMessage(`Archivo modificado: ${data.downloadUrl}`);
        } else {
          setMessage("Error al procesar el archivo.");
        }
      })
      .catch(() => {
        setMessage("Error al conectar con el backend.");
      });
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <h1>ECU Frontend Online</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir y Procesar</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
