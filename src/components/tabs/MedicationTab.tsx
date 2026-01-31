import { useState } from 'react';
import { MedicationEntry } from '@/types/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Pill, Trash2 } from 'lucide-react';

interface MedicationTabProps {
  medications: MedicationEntry[];
  onAdd: (entry: Omit<MedicationEntry, 'id'>) => void;
  onDelete: (id: string) => void;
}

export function MedicationTab({ medications, onAdd, onDelete }: MedicationTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      endDate: formData.endDate || undefined,
      notes: formData.notes || undefined,
    });
    setFormData({
      name: '',
      dosage: '',
      frequency: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      notes: '',
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Medicações</h3>
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
                  <Label htmlFor="med-name">Nome do Medicamento</Label>
                  <Input
                    id="med-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Paracetamol"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="med-dosage">Dosagem</Label>
                  <Input
                    id="med-dosage"
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    placeholder="Ex: 500mg"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="med-frequency">Frequência</Label>
                <Input
                  id="med-frequency"
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  placeholder="Ex: 2x ao dia"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="med-start">Data Início</Label>
                  <Input
                    id="med-start"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="med-end">Data Fim (opcional)</Label>
                  <Input
                    id="med-end"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="med-notes">Observações</Label>
                <Textarea
                  id="med-notes"
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
        {medications.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Nenhuma medicação cadastrada</p>
        ) : (
          medications.map((entry) => (
            <Card key={entry.id} className="animate-fade-in">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                    <Pill className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{entry.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {entry.dosage} - {entry.frequency}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Início: {new Date(entry.startDate).toLocaleDateString('pt-BR')}
                      {entry.endDate && ` | Fim: ${new Date(entry.endDate).toLocaleDateString('pt-BR')}`}
                    </p>
                    {entry.notes && (
                      <p className="text-sm text-muted-foreground mt-1">{entry.notes}</p>
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
