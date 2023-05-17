import './index.css'

const LanguageFilterItem = props => {
  const {lfi, isActive, lfiFn} = props
  const {id, language} = lfi

  const selectLangFn = () => {
    lfiFn(id)
  }

  return (
    <li>
      <button
        type="submit"
        onClick={selectLangFn}
        className={`li-item ${isActive ? 'active' : ''}`}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
