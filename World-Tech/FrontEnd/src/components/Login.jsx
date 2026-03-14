import { useState } from 'react';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [credentials, setCredentials] = useState({ 
    nombre: '',
    correo: '', 
    password: '',
    telefono: '',
    direccion: '' 
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        if (isRegister) {
          setMessage("¡Cuenta creada con éxito!");
          setIsRegister(false);
        } else {
          setMessage(`¡Bienvenido, ${data.user.nombre}!`);
          localStorage.setItem('user', JSON.stringify(data.user));
          setTimeout(() => window.location.reload(), 1500);
        }
      } else {
        setMessage(data.message || 'Error en la operación');
      }
    } catch (error) {
      setMessage('Error de conexión con el servidor.');
    }
  };

  // ESTILOS PERSONALIZADOS
  const azulWorldTech = '#007bff'; // El azul vibrante del logo

  const darkCardStyle = {
    backgroundColor: '#212529', 
    color: '#f8f9fa',           
    maxWidth: '500px',
    borderRadius: '15px',
    border: `1px solid ${azulWorldTech}` // Borde sutil azul para resaltar la tarjeta
  };

  // Estilo para los inputs y sus placeholders
  const inputStyle = {
    backgroundColor: '#2b3035',
    border: '1px solid #495057',
    color: '#ffffff',
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '75vh', padding: '40px 0' }}>
      {/* Estilo inyectado para forzar que los placeholders sean blancos/claros */}
      <style>
        {`
          .custom-input::placeholder {
            color: rgba(255, 255, 255, 0.7) !important;
            opacity: 1;
          }
        `}
      </style>

      <div className="card shadow-lg p-4 w-100" style={darkCardStyle}>
        
        <h2 className="text-center mb-4 fw-bold" style={{ color: azulWorldTech }}>
          {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
        </h2>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <div className="mb-3">
                <label className="form-label">Nombre Completo:</label>
                <input 
                  type="text" name="nombre" className="form-control custom-input" 
                  style={inputStyle} placeholder="Escribe tu nombre completo"
                  onChange={handleChange} required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono:</label>
                <input 
                  type="text" name="telefono" className="form-control custom-input" 
                  style={inputStyle} placeholder="+57 300 123 4567"
                  onChange={handleChange} 
                />
              </div>
            </>
          )}

          <div className="mb-3">
            <label className="form-label">Correo Electrónico:</label>
            <input 
              type="email" name="correo" className="form-control custom-input" 
              style={inputStyle} placeholder="Correo@gmail.com"
              onChange={handleChange} required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input 
              type="password" name="password" className="form-control custom-input" 
              style={inputStyle} placeholder="Ingresa tu contraseña"
              onChange={handleChange} required 
            />
          </div>

          {isRegister && (
            <div className="mb-3">
              <label className="form-label">Dirección:</label>
              <input 
                type="text" name="direccion" className="form-control custom-input" 
                style={inputStyle} placeholder="Ciudad y dirección de residencia"
                onChange={handleChange} 
              />
            </div>
          )}

          <button 
            type="submit" 
            className="btn w-100 py-2 fs-5 fw-bold shadow-sm mt-3"
            style={{ backgroundColor: azulWorldTech, color: 'white' }}
          >
            {isRegister ? 'Registrarse' : 'Entrar'}
          </button>
        </form>

        <hr className="my-4" style={{ borderColor: '#495057' }} />

        <div className="text-center">
          <p className="mb-2" style={{ color: '#adb5bd' }}>
            {isRegister ? '¿Ya tienes una cuenta?' : '¿Aún no tienes cuenta en World-Tech?'}
          </p>
          <button 
            className="btn btn-link text-decoration-none fw-bold"
            style={{ color: azulWorldTech }}
            onClick={() => { setIsRegister(!isRegister); setMessage(''); }}
          >
            {isRegister ? 'Ir a Iniciar Sesión' : 'Regístrate aquí'}
          </button>
        </div>

        {message && (
          <div className={`alert mt-3 text-center ${message.includes('éxito') || message.includes('Bienvenido') ? 'alert-success bg-success text-white border-0' : 'alert-danger bg-danger text-white border-0'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;