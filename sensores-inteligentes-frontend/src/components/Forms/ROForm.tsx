/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import ButtonPrimary from '../Buttons/ButtonPrimary'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-hot-toast'
import { idbClient } from '../../services/idbClient'
import { getGeoLocation } from '../../services/getGeoLocation'
import { Icon } from '@iconify/react'
import { roDataFormDto } from '../../protocols/dtos/data-form-dto'
import * as DeadForm from './components/DeadForm'
import Cookies from 'js-cookie'
import { imageResizer } from '../../services/imageResizer'
import { Label } from './components/Label'
import { LabelError } from './components/LabelError'

export function ROForm({ data }: { data: roDataFormDto }) {
  const router = useRouter()
  const [detalhamentos, setDetalhamentos] = useState<any[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm()

  function onChangeTipificacao(e: any) {
    const dataDetalhamentos = data.tipificacao.filter((item) => item.value == e)
    setDetalhamentos(dataDetalhamentos[0]?.detalhamento || [])
  }

  async function handlePost(props: any) {
    let stringFotoBase64_1: any = ''
    let stringFotoBase64_2: any = ''
    let stringFotoBase64_3: any = ''
    let stringFotoBase64_4: any = ''
    let stringFotoBase64_5: any = ''
    let stringFotoBase64_6: any = ''

    if (props.foto_1.length) {
      stringFotoBase64_1 = await imageResizer(props.foto_1[0])
    }
    if (props.foto_2.length) {
      stringFotoBase64_2 = await imageResizer(props.foto_2[0])
    }
    if (props.foto_3.length) {
      stringFotoBase64_3 = await imageResizer(props.foto_3[0])
    }
    if (props.foto_4.length) {
      stringFotoBase64_4 = await imageResizer(props.foto_4[0])
    }
    if (props.foto_5.length) {
      stringFotoBase64_5 = await imageResizer(props.foto_5[0])
    }
    if (props.foto_6.length) {
      stringFotoBase64_6 = await imageResizer(props.foto_6[0])
    }

    idbClient((db: any) => {
      let request = db.add({
        tipo: 'ro',
        id: uuidv4(),
        foto_1: {
          foto: stringFotoBase64_1,
          descricao: props.descricao_foto_1,
        },
        foto_2: {
          foto: stringFotoBase64_2,
          descricao: props.descricao_foto_2,
        },
        foto_3: {
          foto: stringFotoBase64_3,
          descricao: props.descricao_foto_3,
        },
        foto_4: {
          foto: stringFotoBase64_4,
          descricao: props.descricao_foto_4,
        },
        foto_5: {
          foto: stringFotoBase64_5,
          descricao: props.descricao_foto_5,
        },
        foto_6: {
          foto: stringFotoBase64_6,
          descricao: props.descricao_foto_6,
        },
        gerencia_id: props.gerencia,
        tipificacao_id: props.tipificacao,
        detalhamento: props.detalhamento,
        data: props.data,
        hora: props.hora,
        polo_id: props.polo,
        responsavel_polo: props.responsavel_polo,
        graduacao: props.gradacao,
        local: props.local,
        empresa: props.empresa,
        reincidente: props.reincidente,
        numero_bop: props.numero_bop,
        latitude: props.latitude,
        longitude: props.longitude,
        ocorrencia: props.ocorrencia,
        // status: props.status,
        repercursao_publica: props.repercursao_publica,
        presenca_policial: props.presenca_policial,
        paralizacao: props.paralizacao,
        tempo_paralizacao: props.tempo_paralizacao,
        providencias_adotadas: props.providencias_adotadas,
        recomendacoes_seguranca: props.recomendacoes_seguranca,
        valor_bem_recuperado: props.valor_bem_recuperado,
        // formate mysql date to yyyy-mm-dd
        created_at: new Date().toISOString().slice(0, 10),
      })
      request.onsuccess = () => {
        router.push('/dashboard/sucesso')
      }
      request.onerror = () => {
        toast.error('Erro ao salvar registro.')
        console.log('error')
      }
    })
  }

  useEffect(() => {
    reset({
      nome: Cookies.get('Nome'),
      matricula: Cookies.get('Matricula'),
    })
  }, [])

  return (
    <form
      onSubmit={handleSubmit(handlePost)}
      className="grid sm:grid-cols-3 gap-2 w-full pb-20"
    >
      <DeadForm.TextForm
        label={'Nome'}
        name={'nome'}
        register={register}
        errors={errors}
        disabled
      />

      <DeadForm.TextForm
        label={'Matrícula'}
        name={'matricula'}
        register={register}
        errors={errors}
        disabled
      />

      <DeadForm.SelectInput
        register={register}
        errors={errors}
        label={'Gerência'}
        name={'gerencia'}
        options={data.gerencia}
      />

      <div className="grid grid-cols-2 gap-4">
        <DeadForm.DateForm
          register={register}
          errors={errors}
          name={'data'}
          label={'Data'}
          required
        />
        <DeadForm.TimeForm
          register={register}
          errors={errors}
          name={'hora'}
          label={'Hora'}
          required
        />
      </div>

      <div>
        <Label label={'Tipificação'} name={'tipificação'} />
        <select
          className="input-text"
          id={'tipificacao'}
          {...register('tipificacao', {
            required: true,
            onChange: (e) => onChangeTipificacao(e.target.value),
          })}
        >
          <option value="999999">Selecione</option>

          {data.tipificacao?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <LabelError
          msg={errors['tipificacao']?.message as string}
          hasError={errors['tipificacao'] as any}
        />
      </div>

      {detalhamentos.length > 0 && (
        <DeadForm.SelectInput
          register={register}
          errors={errors}
          label={'Detalhamento'}
          name={'detalhamento'}
          options={detalhamentos}
        />
      )}

      <DeadForm.CurrencyInput
        label={'Valor do Bem Recuperado'}
        name={'valor_bem_recuperado'}
        register={register}
        errors={errors}
        required
      />

      <DeadForm.SelectInput
        register={register}
        errors={errors}
        label={'Graduação'}
        name={'gradacao'}
        options={[
          { value: 'NA', label: 'NA' },
          { value: 'leve', label: 'Leve' },
          { value: 'media', label: 'Média' },
          { value: 'grave', label: 'Grave' },
        ]}
      />

      <DeadForm.SelectInput
        register={register}
        errors={errors}
        label={'Polo'}
        name={'polo'}
        options={data.polos}
      />

      <DeadForm.SelectInput
        register={register}
        errors={errors}
        label={'Responsável Polo'}
        name={'responsavel_polo'}
        options={data.responsaveis_polo}
        required
      />

      <DeadForm.TextForm
        label={'Local'}
        name={'local'}
        register={register}
        errors={errors}
        required
      />

      <div className="sm:col-span-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 items-end">
          <DeadForm.TextForm
            name={'latitude'}
            label={'Latitude'}
            register={register}
            errors={errors}
            required
          />
          <DeadForm.TextForm
            name={'longitude'}
            label={'Longitude'}
            register={register}
            errors={errors}
            required
          />
          {/* <div className="col-span-2 sm:col-span-1">
            <ButtonPrimary type="button" onClick={() => getGeoLocation(reset)}>
              <Icon icon="ant-design:environment-outlined" /> Carregar
              localização
            </ButtonPrimary>
          </div> */}
        </div>
      </div>

      <DeadForm.TextForm
        label={'Empresa'}
        name={'empresa'}
        register={register}
        errors={errors}
        required
      />

      <DeadForm.SelectInput
        register={register}
        errors={errors}
        label={'Reincidente'}
        name={'reincidente'}
        options={[
          { value: 'ND', label: 'ND' },
          { value: 'Sim', label: 'Sim' },
          { value: 'Nao', label: 'Não' },
        ]}
      />

      {/* <DeadForm.SelectInput
        register={register}
        errors={errors}
        label={'Status'}
        name={'status'}
        options={data.status}
      /> */}

      <DeadForm.TextFormMask
        mask="9999999999999999"
        label={'Número do B.O.P'}
        name={'numero_bop'}
        register={register}
        errors={errors}
        required
      />

      <div className="sm:col-span-3">
        <DeadForm.TextAreaForm
          label={'Ocorrência'}
          name={'ocorrencia'}
          register={register}
          errors={errors}
          required
        />
      </div>

      <strong className="text-center w-full mt-3 text-lg sm:col-span-3">
        Repercussão Externa
      </strong>

      <DeadForm.SelectInput
        register={register}
        errors={errors}
        label={'Repercussão no público e na mídia?'}
        name={'repercursao_publica'}
        options={[
          { value: 'Sim', label: 'Sim' },
          { value: 'Nao', label: 'Não' },
        ]}
      />
      <DeadForm.SelectInput
        register={register}
        errors={errors}
        label={'Houve presença policial?'}
        name={'presenca_policial'}
        options={[
          { value: 'Sim', label: 'Sim' },
          { value: 'Nao', label: 'Não' },
        ]}
      />

      <DeadForm.SelectInput
        register={register}
        errors={errors}
        label={'Paralização?'}
        name={'paralizacao'}
        options={[
          { value: 'Sim', label: 'Sim' },
          { value: 'Nao', label: 'Não' },
        ]}
      />

      <DeadForm.TimeForm
        register={register}
        errors={errors}
        name={'tempo_paralizacao'}
        label={'Tempo Paralização'}
      />

      <div className="sm:col-span-3">
        <DeadForm.TextAreaForm
          label={'Providências Adotadas'}
          name={'providencias_adotadas'}
          register={register}
          errors={errors}
          required
        />
      </div>
      <div className="sm:col-span-3">
        <DeadForm.TextAreaForm
          label={'Recomendações de Segurança'}
          name={'recomendacoes_seguranca'}
          register={register}
          errors={errors}
          required
        />
      </div>

      <div className="p-4 rounded-md bg-zinc-300">
        <label
          className="w-full text-lg py-4 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 flex justify-center items-center flex-col hover:scale-95 transition-all"
          htmlFor="user_avatar_1"
        >
          {showFileReader(watch, 'foto_1')}
          <input
            className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hidden"
            id="user_avatar_1"
            type="file"
            accept="image/*"
            {...register('foto_1')}
          />
        </label>
        <DeadForm.TextForm
          label={'Descrição da Foto'}
          name={'descricao_foto_1'}
          register={register}
          errors={errors}
        />
      </div>
      <div className="p-4 rounded-md bg-zinc-300">
        <label
          className="w-full text-lg py-4 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 flex justify-center items-center flex-col hover:scale-95 transition-all"
          htmlFor="user_avatar_2"
        >
          {showFileReader(watch, 'foto_2')}
          <input
            className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hidden"
            id="user_avatar_2"
            type="file"
            accept="image/*"
            {...register('foto_2')}
          />
        </label>
        <DeadForm.TextForm
          label={'Descrição da Foto'}
          name={'descricao_foto_2'}
          register={register}
          errors={errors}
        />
      </div>
      <div className="p-4 rounded-md bg-zinc-300">
        <label
          className="w-full text-lg py-4 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 flex justify-center items-center flex-col hover:scale-95 transition-all"
          htmlFor="user_avatar_3"
        >
          {showFileReader(watch, 'foto_3')}
          <input
            className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hidden"
            id="user_avatar_3"
            type="file"
            accept="image/*"
            {...register('foto_3')}
          />
        </label>
        <DeadForm.TextForm
          label={'Descrição da Foto'}
          name={'descricao_foto_3'}
          register={register}
          errors={errors}
        />
      </div>
      <div className="p-4 rounded-md bg-zinc-300">
        <label
          className="w-full text-lg py-4 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 flex justify-center items-center flex-col hover:scale-95 transition-all"
          htmlFor="user_avatar_4"
        >
          {showFileReader(watch, 'foto_4')}
          <input
            className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hidden"
            id="user_avatar_4"
            type="file"
            accept="image/*"
            {...register('foto_4')}
          />
        </label>
        <DeadForm.TextForm
          label={'Descrição da Foto'}
          name={'descricao_foto_4'}
          register={register}
          errors={errors}
        />
      </div>
      <div className="p-4 rounded-md bg-zinc-300">
        <label
          className="w-full text-lg py-4 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 flex justify-center items-center flex-col hover:scale-95 transition-all"
          htmlFor="user_avatar_5"
        >
          {showFileReader(watch, 'foto_5')}
          <input
            className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hidden"
            id="user_avatar_5"
            type="file"
            accept="image/*"
            {...register('foto_5')}
          />
        </label>
        <DeadForm.TextForm
          label={'Descrição da Foto'}
          name={'descricao_foto_5'}
          register={register}
          errors={errors}
        />
      </div>
      <div className="p-4 rounded-md bg-zinc-300">
        <label
          className="w-full text-lg py-4 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 flex justify-center items-center flex-col hover:scale-95 transition-all"
          htmlFor="user_avatar_6"
        >
          {showFileReader(watch, 'foto_6')}
          <input
            className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hidden"
            id="user_avatar_6"
            type="file"
            accept="image/*"
            {...register('foto_6')}
          />
        </label>
        <DeadForm.TextForm
          label={'Descrição da Foto'}
          name={'descricao_foto_6'}
          register={register}
          errors={errors}
        />
      </div>

      <ButtonPrimary type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar'}
      </ButtonPrimary>
    </form>
  )
}

export function showFileReader(watch: any, name: any) {
  return watch(name) ? (
    <img
      className="object-cover"
      src={watch(name).length > 0 ? URL.createObjectURL(watch(name)[0]) : ''}
      alt="Foto"
    />
  ) : (
    <Icon icon="ant-design:plus-circle" />
  )
}
