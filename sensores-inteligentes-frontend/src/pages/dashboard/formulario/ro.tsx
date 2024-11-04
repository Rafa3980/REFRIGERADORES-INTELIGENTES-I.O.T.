import { useEffect, useState } from 'react'
import Title from '../../../components/Forms/components/Title'
import { ROForm } from '../../../components/Forms/ROForm'
import Container from '../../../components/Partials/Container'
import Header from '../../../components/Partials/Header'
import { idbClientFormUpdate } from '../../../services/idbClient'
import { roDataFormDto } from '../../../protocols/dtos/data-form-dto'
import { checkAuthorization } from '../../../services/checkAuthorization'

export default function Ro() {
  const [dataForm, setDataForm] = useState<roDataFormDto>({
    gerencia: [],
    polos: [],
    status: [],
    tipificacao: [],
    responsaveis_polo: [],
  })

  function updateForm() {
    idbClientFormUpdate((store: any) => {
      let request = store.getAll()
      request.onsuccess = () => {
        setDataForm(request?.result[0]?.ro)
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
        <Title text="Registro de Ocorrência (RO)" />

        {dataForm?.gerencia.length > 0 && <ROForm data={dataForm} />}
        {!dataForm && (
          <h2 className="text-zinc-800">
            Por favor, atualize o formulário para continuar.
          </h2>
        )}
      </Container>
    </div>
  )
}
