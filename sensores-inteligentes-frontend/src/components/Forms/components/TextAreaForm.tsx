import React from 'react'
import { Label } from './Label'
import { LabelError } from './LabelError'

export function TextAreaForm({
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
      <textarea
        type="text"
        id={name}
        style={errors[name] && { border: '1px solid red' }}
        {...register(name, {
          required: { message: 'Campo obrigatório', value: required },
        })}
        className="input-textarea"
        rows={5}
        disabled={disabled}
      />
      <LabelError
        msg={errors[name]?.message as string}
        hasError={errors[name] as any}
      />
    </div>
  )
}
