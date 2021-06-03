import PropTypes from 'prop-types'
import './index.scss';

const Select = ({ value, handleChange, label, options, name, id, error }) => (
  <div className="flex-select">
    <label htmlFor={id}>{label}</label>
    <select name={name} id={id} value={value} onChange={handleChange}>
      {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
)

Select.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}

Select.defaultProps = {
  error: ''
}

export default Select;