import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormHelperTextProps,
  FormLabel,
  FormLabelProps,
  Input,
  InputProps,
} from "@mui/joy";
import { FC } from "react";
import { UseControllerProps, useController } from "react-hook-form";

import { FormSchema } from "./form-schema";

type Props = FormControlProps &
  UseControllerProps<FormSchema> & {
    label?: string;
    slotProps?: Partial<{
      formLabel: FormLabelProps;
      input: InputProps;
      formHelperText: FormHelperTextProps;
    }>;
  };

const ContactInput: FC<Props> = ({ label, slotProps = {}, ...props }) => {
  const { root, formLabel, input, formHelperText } = slotProps;
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <FormControl error={Boolean(error)} slotProps={{ root }} {...props}>
      <FormLabel {...formLabel}>{label}</FormLabel>
      <Input {...field} {...input} />
      <FormHelperText {...formHelperText}>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default ContactInput;
