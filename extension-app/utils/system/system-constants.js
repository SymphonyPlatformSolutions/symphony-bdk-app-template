export const HTTP_OK = 200;
export const HTTP_CREATED = 201;
export const HTTP_BAD_REQUEST = 400;
export const HTTP_UNAUTHORIZED = 401;
export const HTTP_FORBIDDEN = 403;
export const HTTP_NOT_FOUND = 404;

export const getFlatPhoneNumber = phoneNumber => phoneNumber.split(' ').join('').replace('(', '').replace(')', '');
