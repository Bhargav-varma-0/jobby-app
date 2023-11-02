import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {RiShareBoxFill} from 'react-icons/ri'
import './index.css'

const JobDetailCard = props => {
  const {jobDetails} = props
  console.log('job details')
  return (
    <div className="job-card ">
      <div className="row job-hcdiv">
        <img
          className="compeny-logo"
          src={jobDetails.companyLogoUrl}
          alt={jobDetails.title}
        />
        <div className="job-hrdiv">
          <h1 className="mb">{jobDetails.title}</h1>
          <div className="row">
            <AiFillStar className="ra-icon" />
            <p className="ml">{jobDetails.rating}</p>
          </div>
        </div>
      </div>
      <div className="row space-btwn mt">
        <div className="row">
          <MdLocationOn className="ml" />
          <p className="ml">{jobDetails.location}</p>
          <BsFillBriefcaseFill className="ml" />
          <p className="ml">{jobDetails.employmentType}</p>
        </div>
        <p>{jobDetails.packagePerAnnum} </p>
      </div>
      <hr />
      <div className="row space-btwn mt mb ">
        <h1>Description</h1>
        <a href={jobDetails.companyWebsiteUrl} className="ancor row">
          Visit <RiShareBoxFill />
        </a>
      </div>
      <p className="disc">{jobDetails.jobDescription}</p>
      <div className="mb mt">
        <h1>Skills</h1>
      </div>
      <div className="mb mt grid width-100">
        {jobDetails.skills.map(ele => (
          <div className="row grid-item" key={`${ele.imageUrl}${ele.nmae}`}>
            <div className="ml">
              <img className="skills-img" src={ele.imageUrl} alt={ele.name} />
            </div>
            <div className="ml">
              <h1>{ele.name}</h1>
            </div>
          </div>
        ))}
      </div>
      <div className="mb mt">
        <h1>Life at Compeny</h1>
      </div>
      <div className="flex-disp flexstart">
        <div className="column flexstart">
          <p className="f-20">{jobDetails.lifeAtCompany.description}</p>
        </div>
        <div>
          <img
            className="margin"
            src={jobDetails.lifeAtCompany.imageUrl}
            alt="life at compeny"
          />
        </div>
      </div>
    </div>
  )
}

export default JobDetailCard
