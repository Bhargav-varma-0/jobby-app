import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  // const redirectToJobs = () => {
  const {history} = props
  //   history.push('/jobs')
  // }
  console.log('home route', history)
  return (
    <div>
      <Header />
      <div className="home-div">
        <div className="home-content">
          <h1 className="mb">Find The Job That Fits Your Life</h1>
          <p className="mb site-dis">
            Millions of people are searching for jobs, salary information,
            company reviews. FInd the job that fits your abilities and potential
          </p>
          <div className="mb tdn">
            <Link to="/jobs">
              <button type="button" className="btn">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
