import React, { useEffect, useState } from 'react'
import { AVUForm } from '../../../components/Forms/AVUForm'
import Title from '../../../components/Forms/components/Title'
import Container from '../../../components/Partials/Container'
import Header from '../../../components/Partials/Header'
import { avuDataFormDto } from '../../../protocols/dtos/data-form-dto'
import { idbClientFormUpdate } from '../../../services/idbClient'
import { checkAuthorization } from '../../../services/checkAuthorization'

export default function Avu() {
  const [dataForm, setDataForm] = useState<avuDataFormDto>({
    gerencia: [],
    tipificacao: [],
    status: [],
    responsaveis_polo: [],
  })

  function updateForm() {
    idbClientFormUpdate((store: any) => {
      let request = store.getAll()
      request.onsuccess = () => {
        setDataForm(request?.result[0]?.avu)
      }
    })
  }

  useEffect(() => {
    updateForm()
    checkAuthorization()
  }, [])

  return (
    <div>
      <Header />
      <Container>
        <Title text="Análise de Vulnerabilidade (AVU)" />

        {dataForm?.gerencia.length > 0 && <AVUForm data={dataForm} />}
        {!dataForm && (
          <h2 className="text-zinc-800">
            Por favor, atualize o formulário para continuar.
          </h2>
        )}
      </Container>
    </div>
  )
}
