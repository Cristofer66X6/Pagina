import React, { useState } from 'react';
import './SchoolForm.css';

const INITIAL_STATE = {
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  telefono: '',
  numControl: '',
  numProyecto: '',
  periodo: '',
  genero: ''
};

const SchoolForm = ({ onSave }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isSaved, setIsSaved] = useState(false); // ✅ agregado

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'numControl') {
      if (!/^\d{0,9}$/.test(value)) return;
      setFormData((prev) => ({ ...prev, numControl: value }));
      return;
    }

    if (name === 'numProyecto') {
      if (!/^\d{0,2}$/.test(value)) return;
      setFormData((prev) => ({ ...prev, numProyecto: value }));
      return;
    }

    if (name === 'telefono') {
      if (!/^\d{0,10}$/.test(value)) return;
      setFormData((prev) => ({ ...prev, telefono: value }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.numControl.length !== 9) {
      alert('El Número de Control debe tener 9 cifras');
      return;
    }

    if (formData.telefono.length !== 10) {
      alert('El teléfono debe tener 10 dígitos');
      return;
    }

    if (!formData.genero) {
      alert('Selecciona un género');
      return;
    }

    console.log('Datos enviados:', formData);
    alert('¡Información guardada con éxito!');

    if (onSave) {
      onSave(formData); // ✅ pasa los datos a App
    }

    setIsSaved(true); // ✅ evita reenvíos
  };

  // ✅ Si ya se guardó, no muestra nada (App mostrará StudentMenu)
  if (isSaved) {
    return null;
  }

  return (
    <div className="school-container">
      <form className="school-form" onSubmit={handleSubmit}>
        <h1>Datos Escolares</h1>

        <div className="form-grid">
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Apellido Paterno</label>
            <input
              type="text"
              name="apellidoPaterno"
              value={formData.apellidoPaterno}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Apellido Materno</label>
            <input
              type="text"
              name="apellidoMaterno"
              value={formData.apellidoMaterno}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              maxLength={10}
              inputMode="numeric"
              required
            />
          </div>

          <div className="form-group">
            <label>Número de Control</label>
            <input
              type="text"
              name="numControl"
              value={formData.numControl}
              onChange={handleChange}
              inputMode="numeric"
              required
            />
          </div>

          <div className="form-group">
            <label>Número de Proyecto</label>
            <input
              type="text"
              name="numProyecto"
              value={formData.numProyecto}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Periodo</label>
            <input
              type="text"
              name="periodo"
              value={formData.periodo}
              onChange={handleChange}
            />
          </div>

          <div className="gender-group">
            <label>Género</label>
            <div className="radio-options">
              <label>
                <input
                  type="radio"
                  name="genero"
                  value="Femenino"
                  checked={formData.genero === 'Femenino'}
                  onChange={handleChange}
                />
                Femenino
              </label>

              <label>
                <input
                  type="radio"
                  name="genero"
                  value="Masculino"
                  checked={formData.genero === 'Masculino'}
                  onChange={handleChange}
                />
                Masculino
              </label>

              <label>
                <input
                  type="radio"
                  name="genero"
                  value="Otro"
                  checked={formData.genero === 'Otro'}
                  onChange={handleChange}
                />
                Otro
              </label>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Guardar Información
          </button>
        </div>
      </form>
    </div>
  );
};

export default SchoolForm;