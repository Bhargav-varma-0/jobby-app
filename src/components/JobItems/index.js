import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItems = props => {
  const {jobItem} = props
  return (
    <li className="job-card ul-link">
      <Link to={`/jobs/${jobItem.id}`}>
        <div className="row job-hcdiv">
          <img
            className="compeny-logo"
            src={jobItem.companyLogoUrl}
            alt="company logo"
          />
          <div className="job-hrdiv">
            <h1 className="mb">{jobItem.title}</h1>
            <div className="row">
              <AiFillStar className="ra-icon" />
              <p className="ml">{jobItem.rating}</p>
            </div>
          </div>
        </div>
        <div className="row space-btwn mt">
          <div className="row">
            <MdLocationOn className="ml" />
            <p className="ml">{jobItem.location}</p>
            <BsFillBriefcaseFill className="ml" />
            <p className="ml">{jobItem.employmentType}</p>
          </div>
          <p>{jobItem.packagePerAnnum} </p>
        </div>
        <hr />
        <h1>Description</h1>
        <p className="disc">{jobItem.jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobItems
