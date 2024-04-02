export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  export function isValidPassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]+$/;
    return passwordRegex.test(password);
  }
  