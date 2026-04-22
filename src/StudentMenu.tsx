import React, { useState } from 'react';
import './StudentMenu.css';

const StudentMenu = ({ studentData, onSaveDocs }) => {
  const [activeSection, setActiveSection] = useState(null);

  const [pdfs, setPdfs] = useState({
    apertura: {},
    asesorias: {},
    cierre: {},
    evaluaciones: {}
  });

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleFileChange = (section, name, file) => {
    setPdfs((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: file
      }
    }));
  };

  // 🔥 CONECTADO AL APP.JSX
  const handleSave = () => {
    console.log("PDFs del alumno:", pdfs);

    if (onSaveDocs) {
      onSaveDocs(pdfs, studentData); // 👈 ENVÍA AL APP
    }

    alert("Documentos guardados correctamente");
  };

  const renderItem = (section, label) => (
    <div className="file-row" key={label}>
      <span className="file-label">{label}</span>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          handleFileChange(section, label, e.target.files[0])
        }
      />

      {pdfs[section][label] && (
        <span className="file-name">
          {pdfs[section][label].name}
        </span>
      )}
    </div>
  );

  return (
    <div className="student-menu">
      <h1 className="student-name">{studentData.nombre}</h1>
      <h2 className="section-title">Residencias</h2>

      {/* APERTURA */}
      <div className="menu-section">
        <button onClick={() => toggleSection('apertura')}>
          CARPETA DE APERTURA
        </button>

        {activeSection === 'apertura' && (
          <div className="file-upload">
            <h3 className="section-header">Documentos requeridos</h3>

            {[
              "Autorización de RP",
              "Carta Presentación",
              "Carta Aceptación",
              "Asignación de asesor interno",
              "Solicitud de residencias profesionales",
              "Carnet IMSS",
              "Anteproyecto"
            ].map((item) => renderItem('apertura', item))}
          </div>
        )}
      </div>

      {/* ASESORÍAS */}
      <div className="menu-section">
        <button onClick={() => toggleSection('asesorias')}>
          CARPETA DE ASESORÍAS SEMANALES
        </button>

        {activeSection === 'asesorias' && (
          <div className="file-upload">
            <h3 className="section-header">Documentos requeridos</h3>

            {[
              "Asesorías semanales",
              "Bitácora de sellos",
              "Informe semestral de asesorías"
            ].map((item) => renderItem('asesorias', item))}
          </div>
        )}
      </div>

      {/* CIERRE */}
      <div className="menu-section">
        <button onClick={() => toggleSection('cierre')}>
          CIERRE
        </button>

        {activeSection === 'cierre' && (
          <div className="file-upload">
            <h3 className="section-header">Documentos requeridos</h3>

            {[
              "Informe técnico",
              "Carta término",
              "Formato de liberación"
            ].map((item) => renderItem('cierre', item))}
          </div>
        )}
      </div>

      {/* EVALUACIONES */}
      <div className="menu-section">
        <button onClick={() => toggleSection('evaluaciones')}>
          CARPETA DE EVALUACIONES
        </button>

        {activeSection === 'evaluaciones' && (
          <div className="file-upload">
            <h3 className="section-header">Documentos requeridos</h3>

            {[
              "1era evaluación de RP",
              "2da evaluación de RP",
              "3era evaluación de RP"
            ].map((item) => renderItem('evaluaciones', item))}
          </div>
        )}
      </div>

      {/* BOTÓN GUARDAR */}
      <div className="save-container">
        <button className="save-button" onClick={handleSave}>
          Guardar documentos
        </button>
      </div>
    </div>
  );
};

export default StudentMenu;