export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password) {
  return password.length > 6; // Verificar si la longitud de la contraseña es mayor que 6 caracteres
}

export function isValidname(name) {
  const nameParts = name.split(" ");
  return (
    nameParts.length === 2 && nameParts.every((part) => part.trim().length > 0)
  );
}
export function isValidImage(image) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(image);
}
