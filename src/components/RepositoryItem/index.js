// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    avatarUrl,
    name,
    starsCont,
    forksCount,
    issuesCount,
  } = repositoryDetails
  return (
    <li className="repository-item">
      <img src={avatarUrl} alt="name" className="repository-img" />
      <h2 className="repo-heading">{name}</h2>
      <div className="repository-item-details">
        <p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="repository-item-icons"
          />
          {starsCont} stars
        </p>
        <p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="repository-item-icons"
          />
          {forksCount} forks
        </p>
        <p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="repository-item-icons"
          />
          {issuesCount} open issues
        </p>
      </div>
    </li>
  )
}

export default RepositoryItem
