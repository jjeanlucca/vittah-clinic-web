import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Login } from './Login';
import { GerenciarClientes } from './GerenciarClientes';
import './index.css';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCarregando(false);
    });
    return () => unsubscribe();
  }, []);

  if (carregando) {
    return <div className="min-h-screen flex items-center justify-center bg-background">Carregando...</div>;
  }

  return (
    <div className="App">
      {user ? <GerenciarClientes /> : <Login onLogin={setUser} />}
    </div>
  );
}

// ESTA LINHA ABAIXO É A MAIS IMPORTANTE:
export default App;