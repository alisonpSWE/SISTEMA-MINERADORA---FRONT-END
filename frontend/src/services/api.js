import supabase from './supabase';

export const equipamentoService = {
  listar: async () => {
    const { data, error } = await supabase.from('equipamentos').select('*');
    if (error) throw error;
    return { data };
  },
  criar: async (dados) => {
    const { data, error } = await supabase.from('equipamentos').insert([dados]);
    if (error) throw error;
    return { data };
  },
  deletar: async (id) => {
    const { data, error } = await supabase.from('equipamentos').delete().eq('id', id);
    if (error) throw error;
    return { data };
  }
};

export const cidadeService = {
  listar: async () => {
    const { data, error } = await supabase.from('cidades').select('*');
    if (error) throw error;
    return { data };
  },
  criar: async (dados) => {
    const { data, error } = await supabase.from('cidades').insert([dados]);
    if (error) throw error;
    return { data };
  },
  deletar: async (id) => {
    const { data, error } = await supabase.from('cidades').delete().eq('id', id);
    if (error) throw error;
    return { data };
  }
};

export const funcionarioService = {
  listar: async () => {
    const { data, error } = await supabase.from('funcionarios').select('*');
    if (error) throw error;
    return { data };
  },
  criar: async (dados) => {
    const { data, error } = await supabase.from('funcionarios').insert([dados]);
    if (error) throw error;
    return { data };
  },
  deletar: async (id) => {
    const { data, error } = await supabase.from('funcionarios').delete().eq('id', id);
    if (error) throw error;
    return { data };
  }
};

export const servicoService = {
  listar: async () => {
    const { data, error } = await supabase.from('servicos').select('*');
    if (error) throw error;
    return { data };
  },
  criar: async (dados) => {
    const { data, error } = await supabase.from('servicos').insert([dados]);
    if (error) throw error;
    return { data };
  },
  deletar: async (id) => {
    const { data, error } = await supabase.from('servicos').delete().eq('id', id);
    if (error) throw error;
    return { data };
  }
};
