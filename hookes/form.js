import { useEffect, useState } from "react";

// Reference by : https://www.daleseo.com/react-forms-with-hooks/
export default function useForm({ initialValues, onSubmit, validate }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    setErrors(validate(values));
  };

  useEffect(() => {
    if (submitting) {
      console.log("errors", errors)
      if (Object.keys(errors).length === 0) {
        onSubmit(values);
      }
      setSubmitting(false);
    }
  }, [errors]);

  return {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  };
}
