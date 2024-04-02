import { useState } from "react";

const CreateNewEvent = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [isChecked, setIsChecked] = useState(false);

  const checkChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const [selectedDate, setSelectedDate] = useState("");

  const dateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const [textValue, setTextValue] = useState("");

  const textAreaChange = (event) => {
    setTextValue(event.target.value);
  };

  return (
    <div>
      <form>
        <h1>Create New FormEvent</h1>
        <section>
          <input type="text" name="eventName" placeholder="Event Name..." />
        </section>

        <section>
          <select value={selectedValue} onChange={handleChange}>
            <option value="">Seleccione una opción</option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
          </select>
        </section>

        <section>
          <label>
            <input type="checkbox" checked={isChecked} onChange={checkChange} />
            Private event?
          </label>
        </section>

        <section>
          <input type="date" value={selectedDate} onChange={dateChange} />
          <p>Fecha seleccionada: {selectedDate}</p>
        </section>

        <section>
          <textarea
            value={textValue}
            onChange={textAreaChange}
            placeholder="Description of the event"
          />
        </section>
      </form>
    </div>
  );
};

export default CreateNewEvent;
