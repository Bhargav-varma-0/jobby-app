import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similarJobs} = props
  console.log('similarJobs', similarJobs)
  return (
    <div className="job-card ul-link">
      <div className="row job-hcdiv">
        <img
          className="compeny-logo"
          src={similarJobs.companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="job-hrdiv">
          <h1 className="mb">{similarJobs.title}</h1>
          <div className="row">
            <AiFillStar className="ra-icon" />
            <p className="ml">{similarJobs.rating}</p>
          </div>
        </div>
      </div>
      <h1 className="mt  mb">Description</h1>
      <p className="disc mt mb">{similarJobs.jobDescription}</p>
      <div className="row space-btwn mt mb">
        <div className="row">
          <MdLocationOn className="ml" />
          <p className="ml">{similarJobs.location}</p>
          <BsFillBriefcaseFill className="ml" />
          <p className="ml">{similarJobs.employmentType}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobs
