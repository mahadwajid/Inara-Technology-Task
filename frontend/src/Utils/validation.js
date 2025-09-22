function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
function validatePassword(password) {
  // Password must be at least 8 characters long and contain at least one number and one special character
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
  return re.test(password);
}   
function validateUsername(username) {
  // Username must be alphanumeric and between 3 to 16 characters
  const re = /^[a-zA-Z0-9]{3,16}$/;
  return re.test(username);
}
export { validateEmail, validatePassword, validateUsername };
