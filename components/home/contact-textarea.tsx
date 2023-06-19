import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormHelperTextProps,
  FormLabel,
  FormLabelProps,
  Textarea,
  TextareaProps,
} from "@mui/joy";
import { FC } from "react";
import { UseControllerProps, useController } from "react-hook-form";

import { FormSchema } from "./form-schema";

type Props = FormControlProps &
  UseControllerProps<FormSchema> & {
    label?: string;
    slotProps?: Partial<{
      formLabel: FormLabelProps;
      textarea: TextareaProps;
      formHelperText: FormHelperTextProps;
    }>;
  };

const ContactTextarea: FC<Props> = ({ label, slotProps = {}, ...props }) => {
  const { root, formLabel, textarea, formHelperText } = slotProps;
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <FormControl error={Boolean(error)} slotProps={{ root }} {...props}>
      <FormLabel {...formLabel}>{label}</FormLabel>
      <Textarea {...field} {...textarea} />
      <FormHelperText {...formHelperText}>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default ContactTextarea;
