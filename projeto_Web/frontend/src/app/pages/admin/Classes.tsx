import { Plus, Users, Megaphone } from "lucide-react";

interface Class {
  id: number;
  name: string;
  schedule: string;
  instructor: string;
  capacity: number;
  enrolled: number;
  status: "Ativa" | "Completa" | "Aguardando";
}

const mockClasses: Class[] = [
  {
    id: 1,
    name: "Funcional Manhã",
    schedule: "Segunda a Sexta - 07:00",
    instructor: "Adriano Oliveira",
    capacity: 15,
    enrolled: 12,
    status: "Ativa",
  },
  {
    id: 2,
    name: "Funcional Tarde",
    schedule: "Segunda a Sexta - 15:00",
    instructor: "Adriano Oliveira",
    capacity: 15,
    enrolled: 15,
    status: "Completa",
  },
  {
    id: 3,
    name: "Funcional Noite",
    schedule: "Segunda a Sexta - 19:00",
    instructor: "Adriano Oliveira",
    capacity: 15,
    enrolled: 13,
    status: "Ativa",
  },
  {
    id: 4,
    name: "Funcional Sábado",
    schedule: "Sábado - 09:00",
    instructor: "Adriano Oliveira",
    capacity: 12,
    enrolled: 8,
    status: "Ativa",
  },
];

export function AdminClasses() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestão de Turmas</h1>
          <p className="text-muted-foreground">Organize turmas de treino funcional</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Nova Turma
        </button>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockClasses.map((classItem) => (
          <div key={classItem.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg mb-1">{classItem.name}</h3>
                <p className="text-sm text-muted-foreground">{classItem.schedule}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  classItem.status === "Ativa"
                    ? "bg-green-100 text-green-700"
                    : classItem.status === "Completa"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {classItem.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Instrutor:</span>
                <span className="font-medium">{classItem.instructor}</span>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Vagas:</span>
                  <span className="font-medium">
                    {classItem.enrolled}/{classItem.capacity}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      classItem.enrolled === classItem.capacity
                        ? "bg-destructive"
                        : "bg-primary"
                    }`}
                    style={{
                      width: `${(classItem.enrolled / classItem.capacity) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-border">
              <button className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
                <Users className="w-4 h-4" />
                Ver Alunos
              </button>
              <button className="flex-1 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
                <Megaphone className="w-4 h-4" />
                Avisar Turma
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">4</div>
          <p className="text-sm text-muted-foreground">Turmas Ativas</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">48</div>
          <p className="text-sm text-muted-foreground">Alunos Matriculados</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">9</div>
          <p className="text-sm text-muted-foreground">Vagas Disponíveis</p>
        </div>
      </div>
    </div>
  );
}
