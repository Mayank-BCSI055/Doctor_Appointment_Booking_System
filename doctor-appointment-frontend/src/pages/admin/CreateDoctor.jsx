import { createDoctor } from "../../api/admin.api";

const submit = async (data) => {
  await createDoctor(data);
  alert("Doctor created");
};

const CreateDoctor = () => {
  return (
    <div>Create Doctor</div>
  );
};

export default CreateDoctor;