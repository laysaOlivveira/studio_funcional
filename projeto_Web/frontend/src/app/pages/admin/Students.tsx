import { useEffect, useState } from "react";
import { api } from "../../services/api";

interface Aluno {
  id: number;
  nome: string;
  email: string;
}

export function AdminStudents() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    async function fetchAlunos() {
      const response = await api.get("/alunos");
      setAlunos(response.data);
    }

    fetchAlunos();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestão de Alunos</h1>
          <p className="text-muted-foreground">Gerencie todos os alunos do studio</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Novo Aluno
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Todos</option>
              <option value="Ativo">Ativos</option>
              <option value="Inadimplente">Inadimplentes</option>
              <option value="Cancelado">Cancelados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 text-sm">Nome</th>
                <th className="text-left p-4 text-sm hidden md:table-cell">Email</th>
                <th className="text-left p-4 text-sm hidden sm:table-cell">Telefone</th>
                <th className="text-left p-4 text-sm">Modalidade</th>
                <th className="text-left p-4 text-sm">Status</th>
                <th className="text-left p-4 text-sm">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-border last:border-0">
                  <td className="p-4 font-medium">{student.name}</td>
                  <td className="p-4 hidden md:table-cell">{student.email}</td>
                  <td className="p-4 hidden sm:table-cell">{student.phone}</td>
                  <td className="p-4">{student.modality}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        student.status === "Ativo"
                          ? "bg-green-100 text-green-700"
                          : student.status === "Inadimplente"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-700"
                        title="Ver desempenho"
                        onClick={() => navigate(`/admin/students/performance?id=${student.id}`)}
                      >
                        <TrendingUp className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-green-100 rounded-lg transition-colors text-green-700"
                        title="Criar treino"
                        onClick={() => navigate(`/admin/workouts/builder?studentId=${student.id}`)}
                      >
                        <Dumbbell className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors text-destructive"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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