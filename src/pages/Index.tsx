import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClients } from '@/hooks/useClients';
import { ClientCard } from '@/components/ClientCard';
import { ClientForm } from '@/components/ClientForm';
import { ClientProfile } from '@/components/ClientProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Users, BarChart3 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const Index = () => {
  const { clients, loading, addClient, updateClient, deleteClient, getClient } = useClients();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<string | null>(null);
  const [viewingClient, setViewingClient] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddClient = (data: Parameters<typeof addClient>[0]) => {
    addClient(data);
    toast.success('Cliente cadastrado com sucesso!');
  };

  const handleEditClient = (data: Parameters<typeof addClient>[0]) => {
    if (editingClient) {
      updateClient(editingClient, data);
      setEditingClient(null);
      toast.success('Cliente atualizado com sucesso!');
    }
  };

  const handleDeleteClient = () => {
    if (deleteConfirm) {
      deleteClient(deleteConfirm);
      setDeleteConfirm(null);
      toast.success('Cliente removido com sucesso!');
    }
  };

  const currentClient = viewingClient ? getClient(viewingClient) : null;
  const editClient = editingClient ? getClient(editingClient) : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (currentClient) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container max-w-4xl py-8">
          <ClientProfile
            client={currentClient}
            onBack={() => setViewingClient(null)}
            onEdit={() => {
              setEditingClient(currentClient.id);
              setViewingClient(null);
            }}
            onUpdateClient={(updates) => updateClient(currentClient.id, updates)}
          />
        </div>
        <ClientForm
          open={!!editingClient}
          onOpenChange={(open) => !open && setEditingClient(null)}
          onSubmit={handleEditClient}
          initialData={editClient || undefined}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-4xl py-8">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Gestão de Clientes</h1>
            </div>
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>
          <p className="text-muted-foreground">
            Cadastre e gerencie os dados dos seus clientes
          </p>
        </header>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar clientes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Cliente
          </Button>
        </div>

        {filteredClients.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {search ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {search ? 'Tente uma busca diferente' : 'Comece cadastrando seu primeiro cliente'}
            </p>
            {!search && (
              <Button onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Cadastrar Cliente
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredClients.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onView={setViewingClient}
                onDelete={setDeleteConfirm}
              />
            ))}
          </div>
        )}
      </div>

      <ClientForm
        open={showForm || !!editingClient}
        onOpenChange={(open) => {
          if (!open) {
            setShowForm(false);
            setEditingClient(null);
          }
        }}
        onSubmit={editingClient ? handleEditClient : handleAddClient}
        initialData={editClient || undefined}
      />

      <AlertDialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteClient} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default Index;
