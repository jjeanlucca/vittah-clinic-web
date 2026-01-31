import { useClients } from '@/hooks/useClients';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Scale, 
  Pill, 
  Utensils, 
  Dumbbell, 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

const Dashboard = () => {
  const { clients, loading } = useClients();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  // Calculate statistics
  const totalClients = clients.length;
  const totalWeightEntries = clients.reduce((acc, c) => acc + c.weights.length, 0);
  const totalMedications = clients.reduce((acc, c) => acc + c.medications.length, 0);
  const totalDiets = clients.reduce((acc, c) => acc + c.diets.length, 0);
  const totalTrainings = clients.reduce((acc, c) => acc + c.trainings.length, 0);

  // Average weight across all clients (latest weight per client)
  const clientsWithWeight = clients.filter(c => c.weights.length > 0);
  const avgWeight = clientsWithWeight.length > 0
    ? clientsWithWeight.reduce((acc, c) => {
        const sortedWeights = [...c.weights].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        return acc + sortedWeights[0].weight;
      }, 0) / clientsWithWeight.length
    : 0;

  // Data for charts
  const dataOverview = [
    { name: 'Pesos', value: totalWeightEntries, color: 'hsl(var(--primary))' },
    { name: 'Medicações', value: totalMedications, color: 'hsl(var(--chart-2))' },
    { name: 'Dietas', value: totalDiets, color: 'hsl(var(--chart-3))' },
    { name: 'Treinos', value: totalTrainings, color: 'hsl(var(--chart-4))' },
  ];

  // Client entries per client
  const clientsData = clients.map(c => ({
    name: c.name.split(' ')[0],
    pesos: c.weights.length,
    treinos: c.trainings.length,
    dietas: c.diets.length,
  })).slice(0, 8);

  // Weight evolution (all weight entries sorted by date)
  const allWeights = clients.flatMap(c => 
    c.weights.map(w => ({
      date: w.date,
      peso: w.weight,
      cliente: c.name.split(' ')[0],
    }))
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const recentWeights = allWeights.slice(-10).map(w => ({
    ...w,
    date: new Date(w.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
  }));

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-6xl py-8">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground">Resumo estatístico dos clientes</p>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
          <Card className="animate-fade-in">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalClients}</p>
                  <p className="text-sm text-muted-foreground">Clientes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalWeightEntries}</p>
                  <p className="text-sm text-muted-foreground">Registros de Peso</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Pill className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalMedications}</p>
                  <p className="text-sm text-muted-foreground">Medicações</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalDiets}</p>
                  <p className="text-sm text-muted-foreground">Dietas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalTrainings}</p>
                  <p className="text-sm text-muted-foreground">Treinos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Average Weight Card */}
        {clientsWithWeight.length > 0 && (
          <Card className="mb-8 animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Peso Médio dos Clientes</p>
                  <p className="text-4xl font-bold text-foreground">{avgWeight.toFixed(1)} kg</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Entries Distribution Pie Chart */}
          {dataOverview.some(d => d.value > 0) && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-base font-medium">Distribuição de Registros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dataOverview.filter(d => d.value > 0)}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                        labelLine={false}
                      >
                        {dataOverview.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Entries per Client Bar Chart */}
          {clientsData.length > 0 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-base font-medium">Registros por Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={clientsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="pesos" name="Pesos" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="treinos" name="Treinos" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="dietas" name="Dietas" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Weight Timeline */}
          {recentWeights.length >= 2 && (
            <Card className="lg:col-span-2 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-base font-medium">Histórico de Pesos (Últimos Registros)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={recentWeights} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="dashboardWeightGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                      <YAxis 
                        tick={{ fontSize: 12 }} 
                        tickLine={false} 
                        axisLine={false}
                        domain={['dataMin - 5', 'dataMax + 5']}
                        tickFormatter={(value) => `${value}kg`}
                      />
                      <Tooltip
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        formatter={(value: number, name: string, props: any) => [
                          `${value} kg (${props.payload.cliente})`,
                          'Peso'
                        ]}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="peso" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        fill="url(#dashboardWeightGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Empty State */}
        {totalClients === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhum dado disponível
            </h3>
            <p className="text-muted-foreground mb-4">
              Cadastre clientes para ver as estatísticas
            </p>
            <Link to="/">
              <Button>
                <Users className="w-4 h-4 mr-2" />
                Ir para Clientes
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
