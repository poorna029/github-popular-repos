// import {AiOutlineStar} from 'react-icons/ai'
// import {IoInformationCircleSharp} from 'react-icons/io5'
// import {BiGitRepoForked} from 'react-icons/bi'
import './index.css'

const RepositoryItem = props => {
  const {ri} = props
  const {id, avatarUrl, name, issuesCount, forksCount, starsCount} = ri
  //   console.log(id)
  return (
    <li className="li">
      <img src={avatarUrl} alt={name} className="avatar-size" />
      <h1>{name}</h1>
      <div className="flat">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        {/* <AiOutlineStar className="com" /> */}
        <p>{starsCount} stars</p>
      </div>

      <div className="flat">
        {/* <BiGitRepoForked className="com1" /> */}
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="flat">
        {/* <IoInformationCircleSharp className="com2" /> */}
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon"
        />
        <p>{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
