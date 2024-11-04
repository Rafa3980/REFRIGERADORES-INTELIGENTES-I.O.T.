import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import ButtonPrimary from '../Buttons/ButtonPrimary'
import { TextForm } from './components/TextForm'
import { TextFormPassword } from './components/TextFormPassword'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { api_develop, api_sidebeta } from '../../services/axios'
import { toast } from 'react-hot-toast'

const CONFIG = {
  expires: 120, //
}
interface FormProps {
  email: string
  senha: string
}

export function LoginForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>()

  async function handleLogin({ email, senha }: FormProps) {
    try {
      const response = await api_sidebeta.post('/login', {
        email,
        senha,
      })

      Cookies.set('token', response.data.results.token, CONFIG)
      Cookies.set('Nome', response.data.results.Nome, CONFIG)
      Cookies.set('Matricula', response.data.results.Matricula, CONFIG)

      if (Cookies.get('token')) {
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error(error?.response?.data.erro)
    }
    reset({ email: '', senha: '' })
  }

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      router.push('/dashboard')
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="grid gap-2 w-full">
      <TextForm
        name={'email'}
        label={'E-mail'}
        register={register}
        errors={errors}
        required
      />
      <TextFormPassword
        name={'senha'}
        label={'Senha'}
        register={register}
        errors={errors}
        required
      />
      <div className="mt-5">
        <ButtonPrimary type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </ButtonPrimary>
      </div>
    </form>
  )
}
