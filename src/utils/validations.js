export const validations = {
  required: v => !!v || 'Required field',
  gte: greaterOrEqualNum => v => Number(v) >= Number(greaterOrEqualNum) || `Must be greater or equal than ${greaterOrEqualNum}`
}
