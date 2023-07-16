import { FormError, useForm } from "@formspree/react";
import { useState } from "react";

const useFormspree: typeof useForm = (formKey, args) => {
  const [state, submitHandler, ...rest] = useForm(formKey, args);
  const [errors, setErrors] = useState<FormError[]>([]);

  return [
    { ...state, errors: [...errors, ...state.errors] },
    async (submissionData) => {
      try {
        setErrors([]);
        return await submitHandler(submissionData);
      } catch (error) {
        const errors = [{ message: String(error) }];
        setErrors(errors);

        return {
          body: { errors },
          response: null,
        };
      }
    },
    ...rest,
  ];
};

export default useFormspree;
