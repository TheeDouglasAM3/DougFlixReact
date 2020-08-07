import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageDefault from '../../../components/PageDefault'
import FormField from '../../../components/FormField'
import Button from '../../../components/Button'
import useForm from '../../../hooks/useForm'

function CadastroCategoria() {
  const [categorias, setCategorias] = useState([])
  const valoresIniciaisForm = {
    nome: '',
    descricao: '',
    cor: '#ffffff',
  }

  const { handleChange, valoresForm, clearForm } = useForm(valoresIniciaisForm)

  useEffect(() => {
    const URL = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/'
      : 'https://dougflixreact.herokuapp.com/'
    fetch(`${URL}categorias`)
      .then(async (response) => {
        const responseJSON = await response.json()
        setCategorias([
          ...responseJSON,
        ])
      })
  }, [
    valoresForm.nome,
  ])

  // mudar cor do form style={{background: valoresForm.cor}}
  return (
    <PageDefault>
      <h1 style={{ color: valoresForm.cor }}>
        Cadastro de Categoria:
        {valoresForm.nome}
      </h1>

      <form onSubmit={function handleSubmit(event) {
        event.preventDefault()
        setCategorias([
          ...categorias, valoresForm,
        ])
        clearForm()
      }}
      >

        <FormField
          label="Nome da Categoria"
          type="text"
          name="nome"
          maxLength={32}
          value={valoresForm.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          maxLength={256}
          value={valoresForm.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          maxLength={8}
          value={valoresForm.cor}
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
      </form>

      { categorias.length === 0 && (
      <div>
        Loading...
      </div>
      )}
      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.titulo}`}>
            {categoria.titulo}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  )
}

export default CadastroCategoria
