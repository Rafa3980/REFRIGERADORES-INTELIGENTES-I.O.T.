import { useEffect, useState } from 'react'
import Container from './Container'
import {  api_sidebeta } from '../../services/axios'
import { idbClientFormUpdate } from '../../services/idbClient'
import { useRouter } from 'next/router'

export default function BottomNavigation() {
  const [online, setOnline] = useState(false)
  const [version, setVersion] = useState('0')
  const router = useRouter()

  async function handleOnline() {
    try {
      await api_sidebeta.get('/update-formularios')
      setOnline(true)
    } catch (error) {
      setOnline(false)
    }
  }

  function updateForm() {
    idbClientFormUpdate((store: any) => {
      let request = store.getAll()
      request.onsuccess = () => {
        setVersion(request?.result[0]?.versao)
      }
    })
  }

  useEffect(() => {
    handleOnline()
    updateForm()
  }, [router.pathname])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-200 ">
      <Container>
        <div className="flex justify-between items-center py-5">
          <p className="text-yellow-500">Versão: {version}</p>
          <p className="text-white ml-2">
            Status:{' '}
            <strong className={online ? 'text-green-500' : 'text-red-500'}>
              {online ? 'Online' : 'Offline'}{' '}
            </strong>
          </p>
        </div>
      </Container>
    </div>
  )
}
