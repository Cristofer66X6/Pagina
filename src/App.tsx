import React, { useState } from 'react';
import './App.css';
import SchoolForm from './SchoolForm';
import StudentMenu from './StudentMenu';
import AdminPanel from './AdminPanel';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [studentData, setStudentData] = useState(null);

  const handleToggle = () => setIsLogin(!isLogin);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Credenciales admin
    if(email === "admin@escuela.com" && password === "admin123") {
      setIsAuthenticated(true);
      setIsAdmin(true);
      setStudentData(null);
      return;
    }

    // Estudiante
    setIsAuthenticated(true);
    setIsAdmin(false);
    setStudentData(null);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setIsAdmin(false);
    setStudentData(null);
  };

  const handleSchoolSave = (data) => {
    setStudentData(data);
    alert("Datos escolares guardados");
  };

  // Login/registro
  if(!isAuthenticated) {
    return (
      <div className="auth-background">
        <div className="container-form">
          {/* Panel izquierdo */}
          <div className="information">
            <div className="info-childs">
              {isLogin ? (
                <>
                  <h2>¡Bienvenido nuevamente!</h2>
                  <p>Inicia sesión con tus datos</p>
                  <button onClick={handleToggle}>Registrarse</button>
                </>
              ) : (
                <>
                  <h2>Bienvenido</h2>
                  <p>Para tener más información, inicia sesión con tus datos</p>
                  <button onClick={handleToggle}>Iniciar Sesión</button>
                </>
              )}
            </div>
          </div>

          {/* Panel derecho */}
          <div className="form-information">
            <div className="form-information-childs">
              {isLogin ? (
                <>
                  <h2>Iniciar Sesión</h2>
                  <form className="form" onSubmit={handleLoginSubmit}>
                    <label>
                      <i className="bx bxs-envelope"></i>
                      <input type="email" name="email" placeholder="Correo Electrónico" required />
                    </label>
                    <label>
                      <i className="bx bxs-lock-alt"></i>
                      <input type="password" name="password" placeholder="Contraseña" required />
                    </label>
                    <input type="submit" value="Iniciar Sesión" />
                  </form>
                </>
              ) : (
                <>
                  <h2>Crea una cuenta</h2>
                  <form className="form" onSubmit={handleRegisterSubmit}>
                    <label>
                      <i className="bx bxs-user"></i>
                      <input type="text" placeholder="Nombre Completo" required />
                    </label>
                    <label>
                      <i className="bx bxs-envelope"></i>
                      <input type="email" placeholder="Correo Electrónico" required />
                    </label>
                    <label>
                      <i className="bx bxs-lock-alt"></i>
                      <input type="password" placeholder="Contraseña" required />
                    </label>
                    <input type="submit" value="Registrar" />
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Panel administrador
  if(isAdmin) return <AdminPanel />;

  // Panel estudiante
  if(!studentData) return <SchoolForm onSave={handleSchoolSave} />;

  return <StudentMenu studentData={studentData} />;
}

export default App;