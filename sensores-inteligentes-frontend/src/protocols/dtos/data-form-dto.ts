export interface gerenciaDto {
  value: number
  label: string
}

export interface tipificacaoDto {
  value: number
  label: string
}

export interface polosDto {
  value: number
  label: string
}

export interface responsaveisPoloDto {
  value: number
  label: string
}

export interface statusDto {
  value: number
  label: string
}

export interface avuDataFormDto {
  gerencia: gerenciaDto[]
  tipificacao: tipificacaoDto[]
  status: statusDto[]
  polos: polosDto[]
  responsaveis_polo: responsaveisPoloDto[]
}

export interface roDataFormDto {
  gerencia: gerenciaDto[]
  tipificacao: tipificacaoDto[]
  status: statusDto[]
  polos: polosDto[]
  responsaveis_polo: responsaveisPoloDto[]
}
