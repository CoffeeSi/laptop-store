export const isValidEmail = (email) => email && email.includes("@")
export const isValidPhone = (phone) => /^\+\d{10,15}$/.test(phone)
