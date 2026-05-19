/**
 * validator.js — Server-side input validation for reading requests
 *
 * Validates field types, ranges, and formats with structured error
 * responses (field name + message), similar to Pydantic-style validation.
 */

const VALID_METHODS = ['bazi', 'ziwei', 'iching', 'face'];

const VALID_BIRTH_TIMES = [
  '23-01', '01-03', '03-05', '05-07',
  '07-09', '09-11', '11-13', '13-15',
  '15-17', '17-19', '19-21', '21-23',
  'unknown',
];

const VALID_GENDERS = ['male', 'female'];

const VALID_FACE_SHAPES = ['oval', 'round', 'square', 'heart', 'long', 'diamond'];

const VALID_INTEREST_AREAS = ['general', 'career', 'relationships', 'health', 'wealth'];

class ValidationError {
  constructor(field, message) {
    this.field = field;
    this.message = message;
  }
}

/**
 * Validate a date string (YYYY-MM-DD), must be between 1900 and today
 */
function validateDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return false;
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return false;

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);

  if (year < 1900 || year > new Date().getFullYear()) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return false;
  if (date > new Date()) return false;

  return true;
}

/**
 * Validate reading request data. Returns an array of ValidationErrors (empty = valid).
 */
function validateReadingRequest(data) {
  const errors = [];

  // Method is always required
  if (!data.method) {
    errors.push(new ValidationError('method', 'Divination method is required.'));
    return errors; // Can't validate further without method
  }
  if (!VALID_METHODS.includes(data.method)) {
    errors.push(new ValidationError('method', `Invalid method "${data.method}". Must be one of: ${VALID_METHODS.join(', ')}.`));
    return errors;
  }

  // Method-specific validation
  switch (data.method) {
    case 'bazi':
    case 'ziwei':
      if (!data.birthDate) {
        errors.push(new ValidationError('birthDate', 'Birth date is required.'));
      } else if (!validateDate(data.birthDate)) {
        errors.push(new ValidationError('birthDate', 'Invalid birth date. Must be YYYY-MM-DD format, between 1900 and today.'));
      }

      if (!data.birthTime) {
        errors.push(new ValidationError('birthTime', 'Birth time is required.'));
      } else if (!VALID_BIRTH_TIMES.includes(data.birthTime)) {
        errors.push(new ValidationError('birthTime', `Invalid birth time "${data.birthTime}". Must be a Chinese two-hour block (e.g. "23-01") or "unknown".`));
      }

      if (!data.gender) {
        errors.push(new ValidationError('gender', 'Gender is required.'));
      } else if (!VALID_GENDERS.includes(data.gender)) {
        errors.push(new ValidationError('gender', `Invalid gender "${data.gender}". Must be "male" or "female".`));
      }
      break;

    case 'iching':
      if (!data.question || typeof data.question !== 'string' || data.question.trim().length === 0) {
        errors.push(new ValidationError('question', 'A question is required for I Ching readings.'));
      } else if (data.question.trim().length > 500) {
        errors.push(new ValidationError('question', 'Question must be 500 characters or fewer.'));
      }
      break;

    case 'face':
      if (data.faceShape && !VALID_FACE_SHAPES.includes(data.faceShape)) {
        errors.push(new ValidationError('faceShape', `Invalid face shape "${data.faceShape}". Must be one of: ${VALID_FACE_SHAPES.join(', ')}.`));
      }
      if (data.interestArea && !VALID_INTEREST_AREAS.includes(data.interestArea)) {
        errors.push(new ValidationError('interestArea', `Invalid interest area "${data.interestArea}". Must be one of: ${VALID_INTEREST_AREAS.join(', ')}.`));
      }
      if (data.features && typeof data.features === 'string' && data.features.length > 1000) {
        errors.push(new ValidationError('features', 'Feature description must be 1000 characters or fewer.'));
      }
      break;
  }

  // Validate optional question length (for non-iching methods)
  if (data.optionalQuestion && typeof data.optionalQuestion === 'string' && data.optionalQuestion.length > 500) {
    errors.push(new ValidationError('optionalQuestion', 'Optional question must be 500 characters or fewer.'));
  }

  return errors;
}

/**
 * Format validation errors into a user-friendly response
 */
function formatValidationErrors(errors) {
  return {
    success: false,
    error: 'Validation failed. Please check your inputs.',
    validationErrors: errors.map((e) => ({
      field: e.field,
      message: e.message,
    })),
  };
}

module.exports = {
  validateReadingRequest,
  formatValidationErrors,
  VALID_METHODS,
};
