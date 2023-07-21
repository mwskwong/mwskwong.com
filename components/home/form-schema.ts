import { z } from "zod";

const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().nonempty("Email is required").email(),
  subject: z.string().nonempty("Subject is required"),
  message: z.string().nonempty("Message is required"),
});

export type FormSchema = z.infer<typeof formSchema>;
export default formSchema;
