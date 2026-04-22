import React, { useState } from 'react';
import './App.css';

const mockStudents = [
  { numControl: '123456789', nombre: 'Juan Pérez', pdfs: { apertura: [], asesorias: [], cierre: [], evaluaciones: [] } },
  { numControl: '987654321', nombre: 'Ana Gómez', pdfs: { apertura: [], asesorias: [], cierre: [], evaluaciones: [] } },
];

const AdminPanel = () => {
  const [search, setSearch] = useState('');
  const [student, setStudent] = useState(null);

  const handleSearch = () => {
    const s = mockStudents.find(st => st.numControl === search);
    if(!s) {
      alert('Alumno no encontrado');
      setStudent(null);
    } else {
      setStudent(s);
    }
  };

  return (
    <div className="admin-panel">
      <h1 className="admin-title">Panel Administrador</h1>
      <input
        type="text"
        placeholder="Número de control"
        value={search}
        onChange={e=>setSearch(e.target.value)}
        style={{padding: "10px", width:"70%", marginRight:"10px", borderRadius:"5px", border:"1px solid #ddd"}}
      />
      <button onClick={handleSearch} style={{padding:"10px 15px", borderRadius:"5px", backgroundColor:"#007BFF", color:"white", border:"none"}}>Buscar</button>

      {student && (
        <div style={{marginTop:"20px"}}>
          <h2>Alumno: {student.nombre}</h2>
          <p>Número de Control: {student.numControl}</p>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;