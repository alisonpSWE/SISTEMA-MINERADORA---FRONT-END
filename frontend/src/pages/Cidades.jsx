import React, { useState, useEffect } from 'react';
import { cidadeService } from '../services/api';

export default function Cidades() {
  const [cidades, setCidades] = useState([]);
  const [nome, setNome] = useState('');

  useEffect(() => {
    carregarCidades();
  }, []);

  const carregarCidades = async () => {
    try {
      const response = await cidadeService.listar();
      setCidades(response.data);
    } catch (error) {
      console.error("Erro ao buscar cidades", error);
    }
  };

  const cadastrar = async () => {
    if (!nome) return alert("Preencha o nome da cidade!");
    try {
      await cidadeService.criar({ nome });
      setNome('');
      carregarCidades();
    } catch (error) {
      console.error("Erro ao cadastrar", error);
    }
  };

  const deletar = async (id) => {
    try {
      await cidadeService.deletar(id);
      carregarCidades();
    } catch (error) {
      console.error("Erro ao deletar", error);
    }
  };

  return (
    <div>
      <h2 className="poppins-semibold mb-3">Gestão de Cidades</h2>
      
      <div className="mb-4 border p-3">
        <h3 className="poppins-medium">Nova Cidade</h3>
        <input type="text" className="form-control mb-2" placeholder="Nome da Cidade" value={nome} onChange={(e) => setNome(e.target.value)} />
        <button className="btn btn-secondary mt-2" onClick={cadastrar}>Cadastrar</button>
      </div>

      <h3 className="poppins-medium">Cidades Cadastradas</h3>
      
      <ul className="list-group">
        {cidades.map(cid => (
          <li key={cid.id} className="list-group-item d-flex justify-content-between align-items-center">
            <strong>{cid.nome}</strong>
            <button className="btn btn-sm btn-danger px-2 py-0" onClick={() => deletar(cid.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
