export interface InputControl {
  timer: any,
  step: number
}
const inputControl:InputControl = {
  timer: 0,
  step: 200
}

export const createTextArea = function (dom, context) {
  const {
    layer,
    onSelectLayer
  } = context.props
  const textarea = document.createElement('textarea')
  const p = dom.querySelector('p')
  textarea.setAttribute('style', p.getAttribute('style'))
  textarea.value = p.textContent

  textarea.addEventListener('input', handleInput.bind(context))
  textarea.addEventListener('blur', handleBlur.bind(context))
  textarea.addEventListener('keydown', stopPropagation.bind(context))
  dom.appendChild(textarea)
  textarea.focus()

  onSelectLayer({
    id: layer.id,
    selected: true,
    exclusive: true
  })
}

const handleInput = function (e) {
  clearTimeout(inputControl.timer)
  inputControl.timer = setTimeout(() => {
    const val = e.target.value
    const {
      onTextLayerInputChange
    } = this.props
    typeof onTextLayerInputChange === 'function' && onTextLayerInputChange('contentText', val)
  }, inputControl.step)

  e.stopImmediatePropagation()
}

const handleBlur = function (e) {
  const target = e.currentTarget
  const parent = target.parentNode
  e.stopPropagation()
  this.setState({
    isEditable: false
  })
  parent.removeChild(target)
}

const stopPropagation = function (e) {
  e.stopPropagation()
}