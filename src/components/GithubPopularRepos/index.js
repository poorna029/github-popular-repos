import Loader from 'react-loader-spinner'
import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const apiStatus = {loading: 'loading', successful: 'success', failed: 'fail'}
// step1 create heading
// step2 create ul and iterate over languages and get corressponding language higligt and save the language in state
// step3 create RepositoryItem for each object
// step3 from api object get filtered data according to the corresponding language selected

class GithubPopularRepos extends Component {
  state = {language: languageFiltersData[0].id, isLoading: true, list: []}

  componentDidMount() {
    this.fetch()
  }

  fetch = async () => {
    const {language} = this.state
    this.setState({isLoading: apiStatus.loading})
    const res = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${language}`,
    )
    const data = await res.json()
    const rep = {data: data.popular_repos}
    // console.log(res)
    const modifiedData = rep.data.map(e => ({
      name: e.name,
      id: e.id,
      issuesCount: e.issues_count,
      forksCount: e.forks_count,
      starsCount: e.stars_count,
      avatarUrl: e.avatar_url,
    }))

    if (res.ok === true) {
      this.setState({list: modifiedData, isLoading: apiStatus.successful})
    } else {
      this.setState({isLoading: apiStatus.failed})
    }
  }

  renderViews = () => {
    const {isLoading, list} = this.state
    switch (isLoading) {
      case apiStatus.loading:
        return (
          <div className="loader" data-testid="loader">
            <Loader type="ThreeDots" />
          </div>
        )
      case apiStatus.successful:
        return (
          <ul className="ul">
            {list.map(e => (
              <RepositoryItem ri={e} key={e.name} />
            ))}
          </ul>
        )
      case apiStatus.failed:
        return (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
            />
            <h1>Something Went Wrong</h1>
          </div>
        )
      default:
        return null
    }
  }

  renderLanguagesView = () => {
    const {language} = this.state
    return (
      <ul className="languageFilter">
        {languageFiltersData.map(e => (
          <LanguageFilterItem
            key={e.id}
            lfi={e}
            lfiFn={this.languageSetFn}
            isActive={e.id === language}
          />
        ))}
      </ul>
    )
  }

  //   renderAgain = async () => {
  //     this.setState({isLoading: apiStatus.loading})
  //     const {language} = this.state
  //     const res = await fetch(
  //       `https://apis.ccbp.in/popular-repos?language=${language}`,
  //     )
  //     const data = await res.json()

  //     const rep = {data: data.popular_repos}

  //     const modifiedData = rep.data.map(e => ({
  //       name: e.name,
  //       id: e.id,
  //       issuesCount: e.issues_count,
  //       forksCount: e.forks_count,
  //       starsCount: e.stars_count,
  //       avatarUrl: e.avatar_url,
  //     }))

  //     if (res.ok === true) {
  //       this.setState({list: modifiedData, isLoading: apiStatus.successfull})
  //     } else {
  //       this.setState({isLoading: apiStatus.failed})
  //     }
  //   }

  languageSetFn = a => {
    this.setState({language: a}, this.fetch)
  }

  render() {
    // const {language, isLoading} = this.state
    // console.log(language)

    return (
      <div className="main">
        <div className="sub-main">
          <h1>Popular</h1>
        </div>
        {this.renderLanguagesView()}
        {this.renderViews()}
      </div>
    )
  }
}

export default GithubPopularRepos
