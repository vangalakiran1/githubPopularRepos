// Write your code here
import './index.css'

const LanguageFiltersData = props => {
  const {languageFiltersData, isTrue, onClickActiveId} = props
  const {language, id} = languageFiltersData
  const buttonClassName = isTrue ? 'active-btn' : ''
  const onClickChangeBtnId = () => {
    onClickActiveId(id)
  }

  const renderElement = () => (
    <li className="language-item">
      <button
        type="button"
        className={`lang-btn ${buttonClassName}`}
        onClick={onClickChangeBtnId}
      >
        {language}
      </button>
    </li>
  )

  return <div>{renderElement()}</div>
}

export default LanguageFiltersData
