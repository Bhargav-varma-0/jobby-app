import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobDetailCard from '../JobDetailCard'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiConstants = {
  loading: 'ISLOADING',
  failuer: 'FAILURE',
  success: 'SUCCESS',
}

class JobDetail extends Component {
  state = {
    jobDetails: {},
    similarJobs: {},
    jobDetailsConstant: apiConstants.loading,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({jobDetailsConstant: apiConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const authToken = Cookies.get('jwt_token')
    console.log('id : ', id)
    const reqUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(reqUrl, options)
      if (response.status === 200) {
        const responseJson = await response.json()
        console.log(responseJson)
        const jobDeailsjson = responseJson.job_details
        const skillsJson = jobDeailsjson.skills
        const skills = skillsJson.map(skill => ({
          name: skill.name,
          imageUrl: skill.image_url,
        }))
        const lifeAtCompanyjson = jobDeailsjson.life_at_company
        const lifeAtCompany = {
          description: lifeAtCompanyjson.description,
          imageUrl: lifeAtCompanyjson.image_url,
        }
        const jobDetails = {
          title: jobDeailsjson.title,
          id: jobDeailsjson.id,
          skills,
          rating: jobDeailsjson.rating,
          packagePerAnnum: jobDeailsjson.package_per_annum,
          location: jobDeailsjson.location,
          lifeAtCompany,
          jobDescription: jobDeailsjson.job_description,
          employmentType: jobDeailsjson.employment_type,
          companyWebsiteUrl: jobDeailsjson.company_website_url,
          companyLogoUrl: jobDeailsjson.company_logo_url,
        }

        const similarJobsjson = responseJson.similar_jobs
        const similarJobs = similarJobsjson.map(similar => ({
          title: similar.title,
          companyLogoUrl: similar.company_logo_url,
          employmentType: similar.employment_type,
          id: similar.id,
          jobDescription: similar.job_description,
          rating: similar.rating,
          location: similar.location,
        }))

        this.setState({
          jobDetailsConstant: apiConstants.success,
          jobDetails,
          similarJobs,
        })
      } else {
        this.setState({jobDetailsConstant: apiConstants.failuer})
      }
    } catch (err) {
      this.setState({jobDetailsConstant: apiConstants.failuer})
      console.log('error : ', err)
    }
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailuer = () => (
    <div className="job-na">
      <img
        className="job-na-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="mt mb">Oops! Something Went Wrong</h1>
      <p className="mt mb">
        We cannot seem to find the page you are looking for
      </p>
      <div className="profile-btnc">
        <button type="button" className="btn" onClick={this.getJobDetails}>
          Retry
        </button>
      </div>
    </div>
  )

  renderJobDetails = () => {
    const {jobDetails, similarJobs} = this.state
    return (
      <div className="padg">
        <JobDetailCard jobDetails={jobDetails} />
        <h1 className="ml mt mb">Similar Jobs</h1>
        <div className="grid2">
          {similarJobs.map(similarJob => (
            <SimilarJobs similarJobs={similarJob} />
          ))}
        </div>
      </div>
    )
  }

  renderJobDetailsLogic = () => {
    const {jobDetailsConstant} = this.state
    switch (jobDetailsConstant) {
      case apiConstants.success:
        return this.renderJobDetails()
      case apiConstants.failuer:
        return this.renderFailuer()
      case apiConstants.loading:
        return (
          <div className="jobDeails-main column just-center">
            {this.renderLoader()}
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobDetails-main">
        <Header />
        {this.renderJobDetailsLogic()}
      </div>
    )
  }
}

export default JobDetail
