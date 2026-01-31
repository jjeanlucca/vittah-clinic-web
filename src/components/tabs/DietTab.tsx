import { useState } from 'react';
import { DietEntry } from '@/types/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Utensils, Trash2 } from 'lucide-react';

interface DietTabProps {
  diets: DietEntry[];
  onAdd: (entry: Omit<DietEntry, 'id'>) => void;
  onDelete: (id: string) => void;
}

export function DietTab({ diets, onAdd, onDelete }: DietTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    meal: '',
    description: '',
    calories: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      calories: formData.calories ? parseInt(formData.calories) : undefined,
      notes: formData.notes || undefined,
    });
    setFormData({
      date: new Date().toISOString().split('T')[0],
      meal: '',
      description: '',
      calories: '',
      notes: '',
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Dieta</h3>
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
                  <Label htmlFor="diet-date">Data</Label>
                  <Input
                    id="diet-date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diet-meal">Refeição</Label>
                  <Input
                    id="diet-meal"
                    value={formData.meal}
                    onChange={(e) => setFormData({ ...formData, meal: e.target.value })}
                    placeholder="Ex: Café da manhã"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="diet-description">Descrição</Label>
                <Textarea
                  id="diet-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva a refeição..."
                  rows={2}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diet-calories">Calorias (opcional)</Label>
                <Input
                  id="diet-calories"
                  type="number"
                  value={formData.calories}
                  onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                  placeholder="Ex: 350"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diet-notes">Observações</Label>
                <Textarea
                  id="diet-notes"
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
        {diets.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Nenhum registro de dieta</p>
        ) : (
          diets
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((entry) => (
              <Card key={entry.id} className="animate-fade-in">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                      <Utensils className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{entry.meal}</p>
                      <p className="text-sm text-muted-foreground">{entry.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString('pt-BR')}
                        {entry.calories && ` | ${entry.calories} kcal`}
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
