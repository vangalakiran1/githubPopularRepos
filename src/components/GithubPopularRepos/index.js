import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

import LanguageFiltersData from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const activeCaseItem = {
  initial: 'INITIAL',
  inProcess: 'IN_PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    repositoryData: [],
    activeCase: activeCaseItem.initial,
  }

  componentDidMount() {
    this.RepositoryItems()
  }

  RepositoryItems = async () => {
    const {activeLanguageId} = this.state
    this.setState({activeCase: activeCaseItem.inProcess})
    const api = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(api, options)
    if (response.ok === true) {
      const getData = await response.json()
      const convertCamelToSnake = getData.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCont: eachItem.stars_count,
      }))
      this.setState({
        repositoryData: convertCamelToSnake,
        activeCase: activeCaseItem.success,
      })
    } else {
      this.setState({activeCase: activeCaseItem.failure})
    }
  }

  onClickActiveId = id => {
    this.setState({activeLanguageId: id}, this.RepositoryItems)
  }

  activeCaseRenderElement = () => {
    const {activeCase} = this.state
    switch (activeCase) {
      case activeCaseItem.inProcess:
        return this.renderLoadingElement()

      case activeCaseItem.failure:
        return this.renderOnFailure()

      case activeCaseItem.success:
        return this.renderRepositoryItem()

      default:
        return null
    }
  }

  renderRepositoryItem = () => {
    const {repositoryData} = this.state
    return (
      <ul className="repository-container">
        {repositoryData.map(eachRepo => (
          <RepositoryItem repositoryDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderLoadingElement = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderOnFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
    </div>
  )

  render() {
    const {activeLanguageId} = this.state
    return (
      <div className="container">
        <h1 className="heading">Popular</h1>
        <ul className="group-btn">
          {languageFiltersData.map(eachItem => (
            <LanguageFiltersData
              languageFiltersData={eachItem}
              key={eachItem.id}
              isTrue={eachItem.id === activeLanguageId}
              onClickActiveId={this.onClickActiveId}
            />
          ))}
        </ul>
        {this.activeCaseRenderElement()}
      </div>
    )
  }
}

export default GithubPopularRepos
