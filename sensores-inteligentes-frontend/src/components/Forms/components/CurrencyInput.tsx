import CurrencyInputComp from 'react-currency-input-field'
import { Label } from './Label'
import { LabelError } from './LabelError'

export function CurrencyInput({
  register,
  errors,
  name,
  label,
  required = false,
  disabled = false,
}: {
  register: any
  errors: any
  name: string
  label: string
  required?: boolean
  disabled?: boolean
}) {
  return (
    <div>
      <Label label={label} name={name} />
      <CurrencyInputComp
        prefix="R$ "
        placeholder=" "
        decimalsLimit={2}
        disabled={disabled}
        className="input-text"
        style={errors[name] && { border: '1px solid red' }}
        {...register(name, {
          required: { message: 'Campo obrigatório', value: required },
        })}
      />
      <LabelError
        msg={errors[name]?.message as string}
        hasError={errors[name] as any}
      />
    </div>
  )
}
