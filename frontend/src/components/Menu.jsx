import React from 'react';

export default function Menu({ setPagina }) {
  return (
    <nav className="mb-4 mt-2">
      <button className="btn btn-primary me-2" onClick={() => setPagina('inicio')}>Início</button>
      <button className="btn btn-primary me-2" onClick={() => setPagina('equipamentos')}>Equipamentos</button>
      <button className="btn btn-primary me-2" onClick={() => setPagina('cidades')}>Cidades</button>
      <button className="btn btn-primary me-2" onClick={() => setPagina('funcionarios')}>Funcionários</button>
      <button className="btn btn-primary" onClick={() => setPagina('servicos')}>Serviços</button>
    </nav>
  );
}