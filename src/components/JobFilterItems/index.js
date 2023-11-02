import './index.css'

const JobFilterItems = props => {
  console.log('JobFilterItems')
  const {type, employmentType, isChecked, onCheck} = props
  const handelChange = () => {
    onCheck(employmentType.employmentTypeId)
  }
  const handelRadioChange = () => {
    onCheck(employmentType.salaryRangeId)
  }
  if (type === 'checkbox') {
    return (
      <li>
        <input
          type={type}
          id={employmentType.employmentTypeId}
          checked={isChecked}
          onChange={handelChange}
          className="box cup"
        />
        <label htmlFor={employmentType.employmentTypeId} className="cup">
          {employmentType.label}
        </label>
      </li>
    )
  }
  return (
    <li>
      <input
        type={type}
        id={employmentType.salaryRangeId}
        checked={isChecked}
        className="box cup"
        onChange={handelRadioChange}
      />
      <label htmlFor={employmentType.salaryRangeId} className="cup">
        {employmentType.label}
      </label>
    </li>
  )
}

export default JobFilterItems
