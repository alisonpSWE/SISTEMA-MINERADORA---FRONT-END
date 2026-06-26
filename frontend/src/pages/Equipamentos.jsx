import React, { useState, useEffect } from 'react';
import { equipamentoService } from '../services/api';

export default function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [nome, setNome] = useState('');
  const [setor, setSetor] = useState('');

  useEffect(() => {
    carregarEquipamentos();
  }, []);

  const carregarEquipamentos = async () => {
    try {
      const response = await equipamentoService.listar();
      setEquipamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar equipamentos", error);
    }
  };

  const cadastrar = async () => {
    if (!nome || !setor) return alert("Preencha todos os campos!");
    try {
      await equipamentoService.criar({ nome, setor });
      setNome('');
      setSetor('');
      carregarEquipamentos(); 
    } catch (error) {
      console.error("Erro ao cadastrar", error);
    }
  };

  const deletar = async (id) => {
    try {
      await equipamentoService.deletar(id);
      carregarEquipamentos();
    } catch (error) {
      console.error("Erro ao deletar", error);
    }
  };

  return (
    <div>
      <h2 className="poppins-semibold mb-3">Gestão de Equipamentos</h2>
      
      <div className="mb-4 border p-3">
        <h3 className="poppins-medium">Novo Equipamento</h3>
        <input type="text" className="form-control mb-2" placeholder="Nome do Equipamento" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input type="text" className="form-control mb-2" placeholder="Setor (Ex: Extração)" value={setor} onChange={(e) => setSetor(e.target.value)} />
        <button className="btn btn-secondary mt-2" onClick={cadastrar}>Cadastrar</button>
      </div>

      <h3 className="poppins-medium">Equipamentos Cadastrados</h3>
      
      <ul className="list-group">
        {equipamentos.map(eq => (
          <li key={eq.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{eq.nome}</strong> - Setor: {eq.setor}
            </div>
            <button className="btn btn-sm btn-danger px-2 py-0" onClick={() => deletar(eq.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
