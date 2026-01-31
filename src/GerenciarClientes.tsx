import React, { useState, useEffect } from 'react';
import { db, auth } from './firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Users, LogOut, Plus, Trash2, UserCircle } from 'lucide-react';

export const GerenciarClientes = () => {
  const [clientes, setClientes] = useState<any[]>([]);
  const [nome, setNome] = useState('');

  const carregar = async () => {
    const querySnapshot = await getDocs(collection(db, "pacientes"));
    setClientes(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { carregar(); }, []);

  const cadastrar = async () => {
    if (!nome) return;
    await addDoc(collection(db, "pacientes"), { nome, status: 'Ativo' });
    setNome('');
    carregar();
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 animate-fade-in">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-primary flex items-center gap-3">
            <Users size={36} /> Gestão de Clientes
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">Cadastre e gerencie os dados dos seus clientes</p>
        </div>
        <button 
          onClick={() => signOut(auth)}
          className="flex items-center gap-2 px-4 py-2 text-destructive border border-destructive/20 rounded-md hover:bg-destructive/10 transition-colors"
        >
          <LogOut size={18} /> Sair
        </button>
      </header>

      {/* Input de Cadastro */}
      <div className="flex gap-4 mb-10 bg-card p-6 rounded-xl border border-border shadow-sm animate-slide-up">
        <input 
          value={nome} 
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do novo cliente..." 
          className="flex-1 p-3 bg-muted border border-input rounded-md focus:ring-1 focus:ring-primary outline-none"
        />
        <button onClick={cadastrar} className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-bold flex items-center gap-2 hover:opacity-90 transition-all">
          <Plus size={20} /> Novo Cliente
        </button>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
        {clientes.map(c => (
          <div key={c.id} className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary">
                  <UserCircle size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{c.nome}</h3>
                  <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full font-medium">Ativo</span>
                </div>
              </div>
              <button 
                onClick={async () => { if(confirm("Remover?")) { await deleteDoc(doc(db, "pacientes", c.id)); carregar(); } }}
                className="text-muted-foreground hover:text-destructive transition-colors p-2"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <button className="w-full mt-6 py-2 bg-secondary text-secondary-foreground rounded-md font-semibold hover:bg-accent transition-colors">
              Ver Perfil Completo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};