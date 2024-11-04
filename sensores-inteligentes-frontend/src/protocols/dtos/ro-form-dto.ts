export interface ROFormDTO {
  tipo: string
  id: string
  foto_1: {
    foto: string
    descricao: string
  }
  foto_2: {
    foto: string
    descricao: string
  }
  foto_3: {
    foto: string
    descricao: string
  }
  nome: string
  responsavel: string
  matricula: string
  diretoria: string
  gerencia: string
  n_interno: string
  tipificacao: string
  detalhamento: string
  ga_envolvida: string
  polo: string
  responsavel_polo: string
  graduacao: string
  local: string
  empresa: string
  reincidente: string
  numero_bop: string
  data: string
  hora: string
  latitude: string
  longitude: string
  ocorrencia: string
  repercurssao: string
  teve_policia: string
  paralizacao: string
  tempo: string
  providencias_adotadas: string
  recomendacoes_seguranca: string
  created_at: Date
}
