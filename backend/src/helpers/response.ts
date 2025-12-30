interface SuccessResponse {
  message: string;
  error: false;
  code: number;
  data?: object | [];
}

interface ErrorResponse {
  message: string;
  code: number;
  error: true;
}

interface ValidationResponse {
  message: string;
  code: number;
  error: true;
  errors: unknown;
}

export const success = (
  results?: object | [],
  message: string = 'success',
  statusCode: number = 200,
): SuccessResponse => {
  return {
    message,
    error: false,
    code: statusCode,
    data: results,
  };
};

export const error = (
  message: string,
  statusCode: number = 500,
): ErrorResponse => {
  return {
    message,
    code: statusCode,
    error: true,
  };
};

export const validation = (validationErrors: unknown[]): ValidationResponse => {
  // const firstError = validationErrors[0] || null;
  return {
    // message: firstError && firstError.msg ? firstError.msg : 'Validation Error',
    message: 'Validation Error',
    code: 422,
    error: true,
    errors: validationErrors,
  };
};
