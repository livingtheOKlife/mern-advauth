import PropTypes from 'prop-types'

function FormButton ({btnClick, setBtnClick, children}) {
  return (
    <button type="submit" className={`btn md ${btnClick ? 'click' : ''}`} onMouseDown={() => setBtnClick(!btnClick)} onMouseUp={() => setBtnClick(!btnClick)}>
      {children}
    </button>
  )
}

FormButton.propTypes = {
  btnClick: PropTypes.bool.isRequired,
  setBtnClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default FormButton