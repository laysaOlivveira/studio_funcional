import { useEffect, useState } from "react";
import { api } from "../../services/api";

interface Avaliacao {
  id: number;
  nome: string;
  data_avaliacao: string;
}

export function AdminAssessments() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(
        "/dashboard/proximas-avaliacoes"
      );
      setAvaliacoes(response.data);
    }

    fetchData();
  }, []);

export function AdminAssessments() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Avaliações Físicas</h1>
          <p className="text-muted-foreground">Gerencie avaliações e acompanhe evolução</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Nova Avaliação
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Agendadas</p>
              <p className="text-2xl font-bold">15</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-destructive p-3 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Atrasadas</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-accent p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Este Mês</p>
              <p className="text-2xl font-bold">42</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Assessments */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3 className="font-bold">Próximas Avaliações</h3>
        </div>
        <div className="divide-y divide-border">
          {upcomingAssessments.map((assessment) => (
            <div
              key={assessment.id}
              className="p-6 hover:bg-muted/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-bold mb-1">{assessment.studentName}</h4>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {assessment.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      assessment.status === "Agendada"
                        ? "bg-blue-100 text-blue-700"
                        : assessment.status === "Realizada"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {assessment.status}
                  </span>
                  <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                    Realizar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Assessments Table */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3 className="font-bold">Histórico de Avaliações</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 text-sm">Aluno</th>
                <th className="text-left p-4 text-sm">Data</th>
                <th className="text-left p-4 text-sm hidden sm:table-cell">Peso (kg)</th>
                <th className="text-left p-4 text-sm hidden md:table-cell">Altura (m)</th>
                <th className="text-left p-4 text-sm hidden lg:table-cell">IMC</th>
                <th className="text-left p-4 text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockAssessments.map((assessment) => (
                <tr key={assessment.id} className="border-b border-border last:border-0">
                  <td className="p-4 font-medium">{assessment.studentName}</td>
                  <td className="p-4">{assessment.date}</td>
                  <td className="p-4 hidden sm:table-cell">{assessment.weight}</td>
                  <td className="p-4 hidden md:table-cell">{assessment.height}</td>
                  <td className="p-4 hidden lg:table-cell">{assessment.imc.toFixed(1)}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        assessment.status === "Agendada"
                          ? "bg-blue-100 text-blue-700"
                          : assessment.status === "Realizada"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {assessment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
