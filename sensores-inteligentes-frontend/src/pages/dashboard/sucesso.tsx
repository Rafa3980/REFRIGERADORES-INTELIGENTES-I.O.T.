import { useRouter } from 'next/router'
import React from 'react'
import ButtonPrimary from '../../components/Buttons/ButtonPrimary'
import Container from '../../components/Partials/Container'
import SuccessIcon from '../../components/Partials/SuccessIcon'

export default function Sucesso() {
  const router = useRouter()
  return (
    <div>
      <Container>
        <div className="flex flex-col items-center justify-end min-h-screen">
          <div className="mb-10 w-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <SuccessIcon />
              <div className="mb-20">
                <h1 className="text-center font-bold text-2xl">Sucesso!</h1>
                <p className="text-center">Cadastro salvo!</p>
              </div>
            </div>
            <ButtonPrimary
              onClick={() => {
                router.push('/dashboard')
              }}
            >
              Dashboard
            </ButtonPrimary>
          </div>
        </div>
      </Container>
    </div>
  )
}
