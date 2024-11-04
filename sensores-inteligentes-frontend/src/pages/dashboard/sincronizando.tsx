import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ButtonPrimary from '../../components/Buttons/ButtonPrimary'
import LoadingIcon from '../../components/Partials/LoadingIcon'
import SuccessIcon from '../../components/Partials/SuccessIcon'
import { idbClient } from '../../services/idbClient'
import { api_sidebeta } from '../../services/axios'
import Cookies from 'js-cookie'

export default function Sincronizando() {
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  async function postOnServer() {
    setLoading(true)
    try {
      idbClient((store: any) => {
        let request = store.getAll()
        request.onsuccess = async () => {
          await api_sidebeta.post('/gerenciaOperacoes', {
            token: Cookies.get('token'),
            registros: request.result,
          })
          idbClient((db: any) => {
            db.clear()
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    postOnServer()
  }, [])

  return (
    <div className="bg-zinc-900 h-screen w-screen flex justify-center items-center flex-col">
      {loading ? (
        <div>
          <LoadingIcon />
          <h2 className="text-center text-white">
            Enviando dados para o servidor, aguarde...
          </h2>
        </div>
      ) : (
        <div>
          <div className="max-w-[120px] mx-auto">
            <SuccessIcon />
          </div>
          <h2 className="text-center text-white mb-10">
            Dados enviados com sucesso!
          </h2>
          <ButtonPrimary
            onClick={() => {
              router.push('/dashboard/registros')
            }}
          >
            Voltar
          </ButtonPrimary>
        </div>
      )}
    </div>
  )
}
