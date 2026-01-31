import { Client } from '@/types/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, Calendar, Trash2, Eye } from 'lucide-react';

interface ClientCardProps {
  client: Client;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ClientCard({ client, onView, onDelete }: ClientCardProps) {
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

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 animate-slide-up border-border/50 hover:border-primary/30">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12 border border-border">
              <AvatarImage src={client.profilePhoto} alt={client.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {getInitials(client.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground text-lg">{client.name}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Mail className="w-3.5 h-3.5" />
                <span>{client.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5" />
            <span>{client.phone}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(client.birthDate)}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => onView(client.id)}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-1.5" />
            Ver Perfil
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(client.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
