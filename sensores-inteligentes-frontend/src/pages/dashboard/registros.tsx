import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ButtonPrimary from '../../components/Buttons/ButtonPrimary'
import Title from '../../components/Forms/components/Title'
import BottomNavigation from '../../components/Partials/BottomNavigation'
import Container from '../../components/Partials/Container'
import Header from '../../components/Partials/Header'
import { AVUFormDTO } from '../../protocols/dtos/avu-form-dto'
import { ROFormDTO } from '../../protocols/dtos/ro-form-dto'
import { idbClient } from '../../services/idbClient'
import { checkAuthorization } from '../../services/checkAuthorization'
import { api_sidebeta } from '../../services/axios'
import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast'
import LoadingIcon from '../../components/Partials/LoadingIcon'

interface ROandAVUformDto extends ROFormDTO, AVUFormDTO {}

export default function Registros() {
  const [roList, setRoList] = useState<ROandAVUformDto[]>([])
  const [loading, setLoading] = useState(false)
  const token = Cookies.get('token')
  // const [checkDelete, setCheckDelete] = useState(false)
  // const [update, setUpdate] = useState(false)

  async function handleSync() {
    setLoading(true)
    try {
      await api_sidebeta.post(
        '/gerenciaOperacoes',
        {
          token: Cookies.get('token'),
          registros: roList,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      )
      idbClient((db: any) => {
        db.clear()
      })
      toast.success('Dados sincronizados com sucesso.')
      setRoList([])
    } catch (error) {
      toast.error('Erro ao sincronizar dados.')
    }
    setLoading(false)
  }

  // function removeRegistro(id: number) {
  //  console.log(id);

  // }

  useEffect(() => {
    idbClient((store: any) => {
      let request = store.getAll()
      request.onsuccess = () => {
        setRoList(request.result)
      }
    })
    checkAuthorization()
  }, [])

  return (
    <div className="pb-40">
      <Header />
      <Container>
        <Title text="Registros" />
        {roList.length === 0 ? (
          <div className="mb-3">Sem dados para sincronizar</div>
        ) : (
          <div className="mb-3">
            <ButtonPrimary onClick={handleSync}>
              Sincronizar dados
            </ButtonPrimary>
          </div>
        )}
        <div>
          {loading ? (
            <div>
              <LoadingIcon />
              <h2 className="text-center text-white">
                Enviando dados para o servidor, aguarde...
              </h2>
            </div>
          ) : (
            <>
              {roList.reverse().map((item) => {
                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-md shadow bg-slate-100 mb-3 relative"
                  >
                    {/* {checkDelete ? (
                      <>
                        <div className="absolute top-2 right-4 ">
                          <h3 className="font-bold">Remover Registro?</h3>

                          <div className="grid grid-cols-2 gap-2">
                            <span
                              className="text-red-500 text-center px-2 py-1 bg-zinc-200 rounded-md font-bold"
                              onClick={() => removeRegistro(item.id)}
                            >
                              Sim
                            </span>
                            <span
                              className="text-green-500 text-center px-2 py-1 bg-zinc-200 rounded-md font-bold"
                              onClick={() => setCheckDelete(false)}
                            >
                              Não
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <span
                        className="absolute top-2 right-4 cursor-pointer text-white bg-red-400 px-2 rounded-md"
                        onClick={() => {
                          setCheckDelete(true)
                        }}
                      >
                        Remover
                      </span>
                    )} */}
                    <div className="mb-2">
                      {item.tipo === 'ro' ? (
                        <span className="bg-green-600 p-1 rounded text-white">
                          Registro de Ocorrência (RO)
                        </span>
                      ) : (
                        <span className="bg-blue-600 p-1 rounded text-white">
                          Análise de Vunerabilidade (AVU)
                        </span>
                      )}
                    </div>

                    <div>
                      {item.titulo && (
                        <p>
                          <strong>Titulo: </strong>
                          {item.titulo}
                        </p>
                      )}

                      {item.responsavel && (
                        <p>
                          <strong>Responsavel: </strong>
                          {item.responsavel}
                        </p>
                      )}

                      <div className="grid grid-cols-2 gap-2">
                        {item.cod_trein && (
                          <p>
                            <strong>Cod. Trein: </strong>
                            {item.cod_trein}
                          </p>
                        )}

                        {item.revisao && (
                          <p>
                            <strong>Revisão: </strong>
                            {item.revisao}
                          </p>
                        )}
                      </div>

                      {item.nome && (
                        <p>
                          <strong>Nome: </strong>
                          {item.nome}
                        </p>
                      )}

                      {item.matricula && (
                        <p>
                          <strong>Matrícula: </strong>
                          {item.matricula}
                        </p>
                      )}

                      {item.tipificacao && (
                        <p>
                          <strong>Tipificação: </strong>
                          {item.tipificacao}
                        </p>
                      )}

                      {item.gerencia && (
                        <p>
                          <strong>Gerencia: </strong>
                          {item.gerencia}
                        </p>
                      )}

                      {item.prev_solucao && (
                        <p>
                          <strong>Previsão de solucao: </strong>
                          {new Intl.DateTimeFormat('pt-BR', {
                            dateStyle: 'full',
                            // timeStyle: 'short',
                          }).format(
                            new Date(item.prev_solucao).getTime() +
                              3 * 60 * 60 * 1000
                          )}
                        </p>
                      )}

                      {item.solucionado_em && (
                        <p>
                          <strong>Solucionado em: </strong>
                          {new Intl.DateTimeFormat('pt-BR', {
                            dateStyle: 'short',
                          }).format(
                            new Date(item.solucionado_em).getTime() +
                              3 * 60 * 60 * 1000
                          )}
                        </p>
                      )}

                      {item.status && (
                        <p>
                          <strong>Status: </strong>
                          {item.status}
                        </p>
                      )}

                      {item.situacao_vuneralvel_identificada && (
                        <p>
                          <strong>Situação Vulnerável Identificada: </strong>
                          {item.situacao_vuneralvel_identificada}
                        </p>
                      )}

                      {item.risco_potencial && (
                        <p>
                          <strong>Risco Potencial: </strong>
                          {item.risco_potencial}
                        </p>
                      )}

                      {item.n_interno && (
                        <p>
                          <strong>N interno: </strong>
                          {item.n_interno}
                        </p>
                      )}

                      {item.tipificacao && (
                        <p>
                          <strong>Tipificação: </strong>
                          {item.tipificacao}
                        </p>
                      )}

                      {item.detalhamento && (
                        <p>
                          <strong>Detalhamento: </strong>
                          {item.detalhamento}
                        </p>
                      )}

                      {/* {item.ga_envolvida && (
                  <p>
                    <strong>GA Envolvida: </strong>
                    {item.ga_envolvida}
                  </p>
                )} */}

                      {/* {item.polo && (
                  <p>
                    <strong>Polo: </strong>
                    {item.polo}
                  </p>
                )}

                {item.responsavel_polo && (
                  <p>
                    <strong>Responsável do Polo: </strong>
                    {item.responsavel_polo}
                  </p>
                )}

                {item.graduacao && (
                  <p>
                    <strong>Graduação: </strong>
                    {item.graduacao}
                  </p>
                )}

                {item.local && (
                  <p>
                    <strong>Local: </strong>
                    {item.local}
                  </p>
                )}

                {item.empresa && (
                  <p>
                    <strong>Empresa: </strong>
                    {item.empresa}
                  </p>
                )}

                {item.reincidente && (
                  <p>
                    <strong>Reincidente: </strong>
                    {item.reincidente}
                  </p>
                )}

                {item.numero_bop && (
                  <p>
                    <strong>Número B.O.P: </strong>
                    {item.numero_bop}
                  </p>
                )} */}

                      {item.data && (
                        <p>
                          <strong>Data: </strong>
                          {new Intl.DateTimeFormat('pt-BR', {
                            dateStyle: 'short',
                          }).format(
                            new Date(item.data).getTime() + 3 * 60 * 60 * 1000 // 3 horas
                          )}
                        </p>
                      )}

                      {item.hora && (
                        <p>
                          <strong>Hora: </strong>
                          {item.hora}
                        </p>
                      )}

                      {item.ocorrencia && (
                        <p>
                          <strong>Ocorrência: </strong>
                          {item.ocorrencia}
                        </p>
                      )}

                      {item.repercurssao && (
                        <p>
                          <strong>Repercurssão no público e na mídia: </strong>
                          {item.repercurssao}
                        </p>
                      )}

                      {item.teve_policia && (
                        <p>
                          <strong>Houve presença Policial: </strong>
                          {item.teve_policia}
                        </p>
                      )}

                      {/* {item.paralizacao && (
                  <p>
                    <strong>Paralização: </strong>
                    {item.paralizacao}
                  </p>
                )} */}
                      {/*
                {item.tempo && (
                  <p>
                    <strong>Tempo: </strong>
                    {item.tempo}
                  </p>
                )} */}

                      {/* {item.providencias_adotadas && (
                  <p>
                    <strong>Providências adotadas: </strong>
                    {item.providencias_adotadas}
                  </p>
                )} */}

                      {/* {item.recomendacoes_seguranca && (
                  <p>
                    <strong>Recomendações de Segurança: </strong>
                    {item.recomendacoes_seguranca}
                  </p>
                )} */}

                      {item.latitude && item.longitude && (
                        <div className="grid grid-cols-2">
                          <p>
                            <strong>Latitude: </strong>
                            {item.latitude}
                          </p>
                          <p>
                            <strong>Longitude: </strong>
                            {item.longitude}
                          </p>
                        </div>
                      )}

                      <p>
                        <strong>Criado em: </strong>
                        {new Intl.DateTimeFormat('pt-BR', {
                          dateStyle: 'full',
                          // timeStyle: 'short',
                        }).format(
                          new Date(item.created_at).getTime() +
                            3 * 60 * 60 * 1000
                        )}
                      </p>
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </div>
        <BottomNavigation />
      </Container>
    </div>
  )
}
