const validation = (formData) => {
  const errors = {};

  if (formData.name.trim() === "") {
    errors.name = "El nombre es obligatorio";
  } else if (formData.name.length < 5 || formData.name.length > 50) {
    errors.name = "El nombre debe tener entre 5 y 50 caracteres";
  }

  if (formData.description.trim() == "") {
    errors.description = "La descripción es obligatoria";
  } else if (
    formData.description.length < 10 ||
    formData.description.length > 100
  ) {
    errors.description = "La descripción debe tener entre 10 y 100 caracteres";
  }

  if (formData.start_date.trim() === "") {
    errors.start_date = "La fecha de inicio es obligatoria";
  } else if (
    formData.start_date.length < 10 ||
    formData.start_date.length > 100
  ) {
    errors.start_date =
      "La fecha de inicio debe tener entre 10 y 100 caracteres";
  }

  if (formData.end_date.trim() === "") {
    errors.end_date = "La fecha de finalización es obligatoria";
  } else if (!/^[a-zA-Z0-9]+$/.test(formData.end_date)) {
    errors.end_date = "La fecha de finalización solo puede contener letras y números";
  }

  if (formData.start_hour.trim() === "") {
    errors.start_hour = "La hora de inicio del evento es obligatoria";
  } else if (!/^[a-zA-Z0-9]+$/.test(formData.start_hour)) {
    errors.start_hour = "La hora de inicio del evento es incorrecta";
  }

  if (formData.end_hour.trim() === "") {
    errors.end_hour = "La hora de finalizaión del evento es obligatoria";
  } else if (
    isNaN(parseInt(formData.end_hour)) ||
    parseInt(formData.end_hour) <= 0
  ) {
    errors.end_hour = "La hora final del inicio es incorrecta";
  }

  if (formData.location.trim() === "") {
    errors.location = "debe indicar el lugar donde se llevará adelante el evento";
  } else if (!/^[a-zA-Z0-9]+$/.test(formData.location)) {
    errors.location = "La descripción del lugar del evento es incorrecta";
  }

  if (formData.category.trim() === "") {
    errors.category = "La categoría del evento es obligatoria";
  } else if (!/^[a-zA-Z0-9]+$/.test(formData.category)) {
    errors.category = "La categoría del evento es incorrecta";
  }

  if (formData.access !== "paid" && formData.access !== "free") {
    errors.access = "El tipo de evento debe ser PAGO o LIBRE";
  } 

  if (formData.city.trim() === "") {
    errors.city = "Indique la ciudad donde se llevará adelante el evento";
  } else if (!/^[a-zA-Z0-9]+$/.test(formData.city)) {
    errors.city = "La ciudad del evento es incorrecta";
  }

  return errors;
};
export default validation;
