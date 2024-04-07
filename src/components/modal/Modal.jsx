export const Modal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;
  return (
    <div className="flex flex-col">
      <p className="cursor-pointer text-black" onClick={closeModal}>
        X
      </p>
      <p className="text-2xl">Detalle de los tickets</p>
    </div>
  );
};
