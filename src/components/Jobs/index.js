import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'
import Header from '../Header'
import JobFilterItems from '../JobFilterItems'
import JobItems from '../JobItems'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstants = {
  loading: 'ISLOADING',
  failuer: 'FAILURE',
  success: 'SUCCESS',
}

class Jobs extends Component {
  state = {
    profileList: {},
    jobsList: [],
    jobConstants: apiConstants.loading,
    profileConstants: apiConstants.loading,
    searchval: '',
    selectedEmplymentType: [],
    selectedSalary: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    this.setState({profileConstants: apiConstants.loading})
    const getAuthToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${getAuthToken}`,
      },
      method: 'GET',
    }
    const profileResponse = await fetch(profileUrl, options)
    console.log(profileResponse.status)
    if (profileResponse.status === 200) {
      const profileJson = await profileResponse.json()
      const profile = profileJson.profile_details
      const profileList = {
        name: profile.name,
        profileImageUrl: profile.profile_image_url,
        shortBio: profile.short_bio,
      }
      // console.log(profileList)
      this.setState({profileList, profileConstants: apiConstants.success})
    } else {
      this.setState({profileConstants: apiConstants.failuer})
      console.log('error')
    }
  }

  getJobs = async () => {
    this.setState({jobConstants: apiConstants.loading})
    const getAuthToken = Cookies.get('jwt_token')
    const {selectedEmplymentType, selectedSalary, searchval} = this.state
    const employmentTypes = selectedEmplymentType.join(',')
    console.log('employmentTypes :', employmentTypes)
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${selectedSalary}&search=${searchval}`
    const options = {
      headers: {
        Authorization: `Bearer ${getAuthToken}`,
      },
      method: 'GET',
    }
    const jobsResponse = await fetch(jobsUrl, options)
    if (jobsResponse.status === 200) {
      const jobsRes = await jobsResponse.json()
      const jobsList = jobsRes.jobs.map(ele => ({
        companyLogoUrl: ele.company_logo_url,
        employmentType: ele.employment_type,
        id: ele.id,
        jobDescription: ele.job_description,
        packagePerAnnum: ele.package_per_annum,
        location: ele.location,
        rating: ele.rating,
        title: ele.title,
      }))
      this.setState({jobsList, jobConstants: apiConstants.success})
      // console.log('jobs : ', jobsList)
    } else {
      this.setState({jobConstants: apiConstants.failuer})
    }
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfile = list => (
    <div className="profile-bg">
      <img src={list.profileImageUrl} alt="profile" />
      <h1>{list.name}</h1>
      <p>{list.shortBio}</p>
    </div>
  )

  renderRetry = retry => (
    <div className="profile-btnc">
      <button type="button" className="btn" onClick={retry}>
        Retry
      </button>
    </div>
  )

  handleCheck = ele => {
    const {selectedEmplymentType} = this.state
    if (selectedEmplymentType.includes(ele)) {
      const newEmployType = selectedEmplymentType.filter(etype => etype !== ele)
      this.setState({selectedEmplymentType: newEmployType}, () =>
        this.getJobs(),
      )
    } else {
      const newEmployType = [...selectedEmplymentType, ele]
      this.setState({selectedEmplymentType: newEmployType}, () =>
        this.getJobs(),
      )
    }
  }

  handleRadio = selectedSalary => {
    this.setState({selectedSalary}, () => this.getJobs())
  }

  handleSearch = event => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  renderFilterAndProfile = () => {
    const {selectedEmplymentType, selectedSalary} = this.state
    return (
      <div className="profile-section">
        {this.renderProfileSection()}
        <hr />
        <h1 className="selection-h1 mb">Type of Rmployment</h1>
        <ul>
          {employmentTypesList.map(emp => (
            <JobFilterItems
              key={emp.employmentTypeId}
              type="checkbox"
              isChecked={selectedEmplymentType.includes(emp.employmentTypeId)}
              employmentType={emp}
              onCheck={this.handleCheck}
            />
          ))}
        </ul>
        <hr />
        <h1 className="selection-h1 mb">Salary Range</h1>
        <ul>
          {salaryRangesList.map(sal => (
            <JobFilterItems
              key={sal.salaryRangeId}
              type="radio"
              employmentType={sal}
              isChecked={selectedSalary === sal.salaryRangeId}
              onCheck={this.handleRadio}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderProfileSection = () => {
    const {profileConstants, profileList} = this.state
    switch (profileConstants) {
      case apiConstants.success:
        return this.renderProfile(profileList)
      case apiConstants.loading:
        return <div className="profile-btnc">{this.renderLoader()}</div>
      case apiConstants.failuer:
        return this.renderRetry(this.getJobs)
      default:
        return null
    }
  }

  renderJobsSucess = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return (
        <div className="job-na">
          <img
            className="job-na-img"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1 className="mt mb">No Jobs Found</h1>
          <p className="mt mb">We could not find any jobs. Try other filters</p>
        </div>
      )
    }
    return (
      <ul className="jobs-container">
        {jobsList.map(job => (
          <JobItems key={job.id} jobItem={job} />
        ))}
      </ul>
    )
  }

  rednerJobsFailuer = () => (
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
      {this.renderRetry(this.getJobs)}
    </div>
  )

  renderJobsSection = () => {
    const {jobConstants} = this.state
    switch (jobConstants) {
      case apiConstants.success:
        return this.renderJobsSucess()
      case apiConstants.loading:
        return <div className="profile-btnc">{this.renderLoader()}</div>
      case apiConstants.failuer:
        return this.rednerJobsFailuer()
      default:
        return null
    }
  }

  render() {
    const {searchval} = this.state
    return (
      <div>
        <Header />
        <div className="main-jobs">
          <div className="search-div top">
            <input
              type="search"
              name="searchval"
              value={searchval}
              placeholder="Search"
              id="search-bar"
              onChange={this.handleSearch}
            />
            <button
              type="button"
              className="search-icon-div"
              onClick={this.getJobs}
            >
              <BiSearch className="search-icon" />
            </button>
          </div>
          {this.renderFilterAndProfile()}
          <div className="jobs-section">
            <div className="search-div left ml">
              <input
                type="search"
                name="searchval"
                value={searchval}
                placeholder="Search"
                id="search-bar"
                onChange={this.handleSearch}
              />
              <button
                type="button"
                className="search-icon-div"
                onClick={this.getJobs}
              >
                <BiSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsSection()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
