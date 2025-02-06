export const regex_tipos_cedulas = {
  nacional: (text = "") => {
    const regex = /^\d{9}$/;
    return regex.test(text);
  },
  pasaporte: (text = "") => {
    const regex = /^.{20}$/;
    return regex.test(text);
  },
  extranjero: (text = "") => {
    const regex = /^\d{12}$/;
    return regex.test(text);
  },
};

export const validateEmail = (email = "") => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};
