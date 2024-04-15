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
    errors.start_date = "La fecha de inicio del evento es obligatoria";
  } else {
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!regex.test(formData.start_date)) {
          errors.start_date = "El formato de la fecha debe ser dd/mm/aaaa";
      } else {
          const startDate = new Date(formData.start_date.split('/').reverse().join('/'));
          const currentDate = new Date();
          if (startDate <= currentDate) {
              errors.start_date = "La fecha de inicio debe ser posterior a la fecha actual";
          }
      }
  }

  if (formData.end_date.trim() === "") {
    errors.end_date = "La fecha de finalización del evento es obligatoria";
  } else {
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!regex.test(formData.end_date)) {
          errors.end_date = "El formato de la fecha de fin debe ser dd/mm/aaaa";
      } else {
          const endDate = new Date(formData.end_date.split('/').reverse().join('/'));
          const startDate = new Date(formData.start_date.split('/').reverse().join('/'));
          const currentDate = new Date();
          
          if (endDate <= currentDate) {
              errors.end_date = "La fecha de fin debe ser posterior a la fecha actual";
          } else if (endDate < startDate) {
              errors.end_date = "La fecha de fin debe ser mayor o igual a la fecha de inicio";
          }
      }
  }

  if (formData.start_hour.trim() === "") {
    errors.start_hour = "La hora de inicio es obligatoria";
  } else {
      const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!regex.test(formData.start_hour)) {
          errors.start_hour = "El formato de la hora de inicio debe ser hh:mm";
      }
  }

  if (formData.end_hour.trim() === "") {
    errors.end_hour = "La hora de fin es obligatoria";
  } else {
      const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!regex.test(formData.end_hour)) {
          errors.end_hour = "El formato de la hora de fin debe ser hh:mm";
      } else {
          const startHour = formData.start_hour.split(':');
          const endHour = formData.end_hour.split(':');
          
          const startDate = new Date();
          startDate.setHours(startHour[0], startHour[1]);
          
          const endDate = new Date();
          endDate.setHours(endHour[0], endHour[1]);
          
          if (endDate <= startDate) {
              errors.end_hour = "La hora de fin debe ser mayor a la hora de inicio";
          }
      }
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
    errors.access = "Elija el tipo de pago";
  } 

  if (formData.city.trim() === "") {
    errors.city = "Indique la ciudad donde se llevará adelante el evento";
  } else if (!/^[a-zA-Z0-9]+$/.test(formData.city)) {
    errors.city = "La ciudad del evento es incorrecta";
  }

  return errors;
};
export default validation;
