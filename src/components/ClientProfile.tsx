import { Client, WeightEntry, MedicationEntry, DietEntry, TrainingEntry } from '@/types/client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Mail, Phone, Calendar, Edit } from 'lucide-react';
import { WeightTab } from './tabs/WeightTab';
import { MedicationTab } from './tabs/MedicationTab';
import { DietTab } from './tabs/DietTab';
import { TrainingTab } from './tabs/TrainingTab';

interface ClientProfileProps {
  client: Client;
  onBack: () => void;
  onEdit: () => void;
  onUpdateClient: (updates: Partial<Client>) => void;
}

export function ClientProfile({ client, onBack, onEdit, onUpdateClient }: ClientProfileProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const addWeight = (entry: Omit<WeightEntry, 'id'>) => {
    const newEntry = { ...entry, id: crypto.randomUUID() };
    onUpdateClient({ weights: [...client.weights, newEntry] });
  };

  const deleteWeight = (id: string) => {
    onUpdateClient({ weights: client.weights.filter(w => w.id !== id) });
  };

  const addMedication = (entry: Omit<MedicationEntry, 'id'>) => {
    const newEntry = { ...entry, id: crypto.randomUUID() };
    onUpdateClient({ medications: [...client.medications, newEntry] });
  };

  const deleteMedication = (id: string) => {
    onUpdateClient({ medications: client.medications.filter(m => m.id !== id) });
  };

  const addDiet = (entry: Omit<DietEntry, 'id'>) => {
    const newEntry = { ...entry, id: crypto.randomUUID() };
    onUpdateClient({ diets: [...client.diets, newEntry] });
  };

  const deleteDiet = (id: string) => {
    onUpdateClient({ diets: client.diets.filter(d => d.id !== id) });
  };

  const addTraining = (entry: Omit<TrainingEntry, 'id'>) => {
    const newEntry = { ...entry, id: crypto.randomUUID() };
    onUpdateClient({ trainings: [...client.trainings, newEntry] });
  };

  const deleteTraining = (id: string) => {
    onUpdateClient({ trainings: client.trainings.filter(t => t.id !== id) });
  };

  return (
    <div className="animate-fade-in">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>

      <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-border">
              <AvatarImage src={client.profilePhoto} alt={client.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {getInitials(client.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{client.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(client.birthDate)}</span>
                </div>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="w-4 h-4 mr-1.5" />
            Editar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="weight" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="weight">Peso</TabsTrigger>
          <TabsTrigger value="medication">Medicação</TabsTrigger>
          <TabsTrigger value="diet">Dieta</TabsTrigger>
          <TabsTrigger value="training">Treino</TabsTrigger>
        </TabsList>
        <TabsContent value="weight">
          <WeightTab
            weights={client.weights}
            onAdd={addWeight}
            onDelete={deleteWeight}
          />
        </TabsContent>
        <TabsContent value="medication">
          <MedicationTab
            medications={client.medications}
            onAdd={addMedication}
            onDelete={deleteMedication}
          />
        </TabsContent>
        <TabsContent value="diet">
          <DietTab
            diets={client.diets}
            onAdd={addDiet}
            onDelete={deleteDiet}
          />
        </TabsContent>
        <TabsContent value="training">
          <TrainingTab
            trainings={client.trainings}
            onAdd={addTraining}
            onDelete={deleteTraining}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
