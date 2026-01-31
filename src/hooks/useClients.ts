import { useState, useEffect } from 'react';
import { Client } from '@/types/client';

const STORAGE_KEY = 'clients-data';

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setClients(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const saveClients = (newClients: Client[]) => {
    setClients(newClients);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newClients));
  };

  const addClient = (client: Omit<Client, 'id' | 'createdAt' | 'weights' | 'medications' | 'diets' | 'trainings'>) => {
    const newClient: Client = {
      ...client,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      weights: [],
      medications: [],
      diets: [],
      trainings: [],
    };
    saveClients([...clients, newClient]);
    return newClient;
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    const newClients = clients.map(c => 
      c.id === id ? { ...c, ...updates } : c
    );
    saveClients(newClients);
  };

  const deleteClient = (id: string) => {
    saveClients(clients.filter(c => c.id !== id));
  };

  const getClient = (id: string) => {
    return clients.find(c => c.id === id);
  };

  return {
    clients,
    loading,
    addClient,
    updateClient,
    deleteClient,
    getClient,
  };
}
