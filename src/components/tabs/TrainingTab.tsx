import { useState } from 'react';
import { TrainingEntry } from '@/types/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Dumbbell, Trash2 } from 'lucide-react';

interface TrainingTabProps {
  trainings: TrainingEntry[];
  onAdd: (entry: Omit<TrainingEntry, 'id'>) => void;
  onDelete: (id: string) => void;
}

export function TrainingTab({ trainings, onAdd, onDelete }: TrainingTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '',
    duration: '',
    exercises: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      duration: parseInt(formData.duration),
      notes: formData.notes || undefined,
    });
    setFormData({
      date: new Date().toISOString().split('T')[0],
      type: '',
      duration: '',
      exercises: '',
      notes: '',
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Treinos</h3>
        <Button onClick={() => setShowForm(!showForm)} size="sm">
          <Plus className="w-4 h-4 mr-1.5" />
          Adicionar
        </Button>
      </div>

      {showForm && (
        <Card className="animate-scale-in">
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="train-date">Data</Label>
                  <Input
                    id="train-date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="train-type">Tipo de Treino</Label>
                  <Input
                    id="train-type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="Ex: Musculação"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="train-duration">Duração (minutos)</Label>
                <Input
                  id="train-duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="Ex: 60"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="train-exercises">Exercícios</Label>
                <Textarea
                  id="train-exercises"
                  value={formData.exercises}
                  onChange={(e) => setFormData({ ...formData, exercises: e.target.value })}
                  placeholder="Liste os exercícios realizados..."
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="train-notes">Observações</Label>
                <Textarea
                  id="train-notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Observações opcionais..."
                  rows={2}
                />
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {trainings.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Nenhum treino cadastrado</p>
        ) : (
          trainings
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((entry) => (
              <Card key={entry.id} className="animate-fade-in">
                <CardContent className="p-4 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <Dumbbell className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{entry.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString('pt-BR')} | {entry.duration} min
                      </p>
                      <p className="text-sm text-foreground mt-2 whitespace-pre-line">{entry.exercises}</p>
                      {entry.notes && (
                        <p className="text-sm text-muted-foreground mt-2">{entry.notes}</p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(entry.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))
        )}
      </div>
    </div>
  );
}
