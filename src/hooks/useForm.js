import { useState } from 'react'

function useForm(valoresIniciaisForm) {
  const [valoresForm, setValoresForm] = useState(valoresIniciaisForm)

  function handleValores(chave, valor) {
    setValoresForm({
      ...valoresForm,
      [chave]: valor,
    })
  }

  function handleChange(event) {
    handleValores(
      event.target.getAttribute('name'),
      event.target.value,
    )
  }

  function clearForm() {
    setValoresForm(valoresIniciaisForm)
  }

  return {
    valoresForm,
    handleChange,
    clearForm,
  }
}

export default useForm
