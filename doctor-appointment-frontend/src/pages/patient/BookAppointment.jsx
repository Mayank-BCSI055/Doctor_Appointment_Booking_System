import { bookAppointment } from "../../api/patient.api";
import toast from "react-hot-toast";

const handleBook = async (slotId) => {
  try {
    await bookAppointment(slotId);
    toast.success("Appointment booked successfully", {
      duration: 3000
    });
  } catch (err) {
    toast.error(err, {
      duration: 3000
    });
  }
};

const BookAppointment = () => {
  return (
    <div>Book Appointment</div>
  );
};

export default BookAppointment;
