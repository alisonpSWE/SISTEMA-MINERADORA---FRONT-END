import React, { useState, useEffect } from 'react';
import { funcionarioService } from '../services/api';

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const carregarFuncionarios = async () => {
    try {
      const response = await funcionarioService.listar();
      setFuncionarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar funcionários", error);
    }
  };

  const cadastrar = async () => {
    if (!nome || !cargo) return alert("Preencha todos os campos!");
    try {
      await funcionarioService.criar({ nome, cargo });
      setNome('');
      setCargo('');
      carregarFuncionarios();
    } catch (error) {
      console.error("Erro ao cadastrar", error);
    }
  };

  const deletar = async (id) => {
    try {
      await funcionarioService.deletar(id);
      carregarFuncionarios();
    } catch (error) {
      console.error("Erro ao deletar", error);
    }
  };

  return (
    <div>
      <h2 className="poppins-semibold mb-3">Gestão de Funcionários</h2>
      
      <div className="mb-4 border p-3">
        <h3 className="poppins-medium">Novo Funcionário</h3>
        <input type="text" className="form-control mb-2" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input type="text" className="form-control mb-2" placeholder="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} />
        <button className="btn btn-secondary mt-2" onClick={cadastrar}>Cadastrar</button>
      </div>

      <h3 className="poppins-medium">Funcionários Cadastrados</h3>
      
      <ul className="list-group">
        {funcionarios.map(func => (
          <li key={func.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{func.nome}</strong> - Cargo: {func.cargo}
            </div>
            <button className="btn btn-sm btn-danger px-2 py-0" onClick={() => deletar(func.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
