import React, { useState, useEffect } from 'react';
import { servicoService } from '../services/api';

export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  useEffect(() => {
    carregarServicos();
  }, []);

  const carregarServicos = async () => {
    try {
      const response = await servicoService.listar();
      setServicos(response.data);
    } catch (error) {
      console.error("Erro ao buscar serviços", error);
    }
  };

  const cadastrar = async () => {
    if (!descricao || !valor) return alert("Preencha todos os campos!");
    try {
      await servicoService.criar({ descricao, valor: Number(valor) });
      setDescricao('');
      setValor('');
      carregarServicos();
    } catch (error) {
      console.error("Erro ao cadastrar", error);
    }
  };

  const deletar = async (id) => {
    try {
      await servicoService.deletar(id);
      carregarServicos();
    } catch (error) {
      console.error("Erro ao deletar", error);
    }
  };

  return (
    <div>
      <h2 className="poppins-semibold mb-3">Gestão de Serviços</h2>
      
      <div className="mb-4 border p-3">
        <h3 className="poppins-medium">Novo Serviço</h3>
        <input type="text" className="form-control mb-2" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        <input type="number" className="form-control mb-2" placeholder="Valor" value={valor} onChange={(e) => setValor(e.target.value)} />
        <button className="btn btn-secondary mt-2" onClick={cadastrar}>Cadastrar</button>
      </div>

      <h3 className="poppins-medium">Serviços Cadastrados</h3>
      
      <ul className="list-group">
        {servicos.map(serv => (
          <li key={serv.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{serv.descricao}</strong> - Valor: R$ {serv.valor}
            </div>
            <button className="btn btn-sm btn-danger px-2 py-0" onClick={() => deletar(serv.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
