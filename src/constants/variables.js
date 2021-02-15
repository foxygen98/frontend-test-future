import PropTypes from 'prop-types'

export const USER_PROP_TYPE = PropTypes.shape({
  address: PropTypes.shape({
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    streetAddress: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
  }),
  description: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  lastName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
})

export const USER_OBJECT = {
  address: {
    city: '',
    state: '',
    streetAddress: '',
    zip: '',
  },
  description: '',
  email: '',
  firstName: '',
  id: -1,
  lastName: '',
  phone: '',
}
