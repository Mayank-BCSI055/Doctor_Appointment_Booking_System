export default function AppointmentCard({ appointment }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h4 className="font-semibold">{appointment.doctor}</h4>
      <p className="text-sm">{appointment.date}</p>
      <span className="text-xs text-green-600">Confirmed</span>
    </div>
  );
}
