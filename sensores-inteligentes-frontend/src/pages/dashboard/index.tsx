import React, { useEffect, useState } from 'react'
import Title from '../../components/Forms/components/Title'
import BottomNavigation from '../../components/Partials/BottomNavigation'
import Container from '../../components/Partials/Container'
import DashboardButton from '../../components/Partials/DashboardButton'
import Header from '../../components/Partials/Header'
import { api_sidebeta } from '../../services/axios'
import { idbClientFormUpdate } from '../../services/idbClient'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { checkAuthorization } from '../../services/checkAuthorization'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'

export default function Dashboard() {
  const [online, setOnline] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleUpdateForms() {
    setLoading(true)
    try {
      const response = await api_sidebeta.get('/update-formularios')
      idbClientFormUpdate((db: any) => {
        // limpa os dados atuais
        db.clear()
        // atualiza com os novos
        let request = db.add(response.data.results)
        request.onsuccess = () => {
          toast.success('Formulários atualizados com sucesso.')
        }
        request.onerror = () => {
          toast.error('Erro ao salvar registro.')
          console.log('error')
        }
      })
    } catch (error) {
      toast.error('Erro ao atualizar formulários.')
    }
    setLoading(false)
  }

  async function handleOnline() {
    try {
      await api_sidebeta.get('/update-formularios')
      setOnline(true)
    } catch (error) {
      setOnline(false)
    }
  }

  useEffect(() => {
    handleOnline()
    checkAuthorization()
  }, [router.pathname])

  return (
    <div className="bg-gradient-to-b from-slate-100 to-slate-400 h-screen">
      <Header />
      <Container>
        <div className="mt-3">
          <Title text={`Bem-vindo, ${Cookies.get('Nome')}`} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <DashboardButton
              icon={'carbon:intent-request-create'}
              title={'REGISTRO DE OCORRÊNCIA'}
              link={'/dashboard/formulario/ro'}
            />
            <DashboardButton
              icon={'carbon:intent-request-create'}
              title={'ANÁLISE DE VULNERABILIDADE'}
              link={'/dashboard/formulario/avu'}
            />
            <DashboardButton
              icon={'bi:card-list'}
              title={'Registros'}
              link={'/dashboard/registros'}
            />
            {/* <DashboardButton
              icon={'carbon:cloud-satellite-config'}
              title={'Configurações'}
              link={'/dashboard/registros'}
            /> */}
            {online && (
              <button
                className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 roundedm flex items-center justify-center rounded-md text-xl flex-col shadow"
                onClick={handleUpdateForms}
                disabled={loading}
              >
                {loading ? (
                  <Icon
                    icon="bx:bx-loader-circle"
                    className="animate-spin text-5xl"
                  />
                ) : (
                  <>
                    <Icon icon="bx:bx-refresh" className="text-5xl" />
                    <span>Atualizar formulários</span>
                  </>
                )}
              </button>
            )}
            {}
          </div>
        </div>
      </Container>
      <BottomNavigation />
    </div>
  )
}
