"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  EmailRounded,
  LocationOnRounded,
  SendRounded,
  SmartphoneRounded,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  BoxProps,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

import { address, email, phone } from "@/constants/data";
import { contact } from "@/constants/nav";

import ContactInput from "./contact-input";
import ContactTextarea from "./contact-textarea";
import FormSchema, { FormSchema as TFormSchema } from "./form-schema";
import useFormspree from "./use-formspree";

const personalInfo = [
  {
    Icon: SmartphoneRounded,
    title: "Call Me At",
    value: phone,
    url: `tel:${phone}`,
  },
  {
    Icon: EmailRounded,
    title: "Email Me At",
    value: email,
    url: `mailto:${email}`,
  },
  {
    Icon: LocationOnRounded,
    title: "Find Me At",
    value: address,
    url: "https://www.google.com/maps/place/Hong+Kong",
  },
];

const Contact: FC<BoxProps<"section">> = (props) => {
  const { handleSubmit, control, reset } = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
    mode: "onChange",
  });

  const [state, handleFormspreeSubmit, resetFormspree] = useFormspree(
    process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? ""
  );

  useEffect(() => {
    if (state.succeeded) {
      reset();
    }
  }, [reset, state.succeeded]);

  return (
    <Box component="section" id={contact.id} {...props}>
      <Container>
        <Stack spacing={6}>
          <Typography level="h2" sx={{ textAlign: "center" }}>
            Contact
          </Typography>
          <Grid
            container
            spacing={4}
            disableEqualOverflow
            component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(handleFormspreeSubmit)}
          >
            <Grid
              component="address"
              container
              xs={12}
              md={4}
              spacing={3}
              sx={{ "--Icon-fontSize": (theme) => theme.vars.fontSize.xl4 }}
            >
              {personalInfo.map(({ Icon, title, value, url }) => (
                <Grid key={title} xs={12} sm={4} md={12}>
                  <Stack spacing={1} sx={{ alignItems: "center" }}>
                    <Icon />
                    <Typography>{title}</Typography>
                    <Link
                      href={url}
                      target={url.startsWith("http") ? "_blank" : undefined}
                    >
                      {value}
                    </Link>
                  </Stack>
                </Grid>
              ))}
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={2} xs={12} md={8}>
              <Grid xs={12} sm={6}>
                <ContactInput
                  control={control}
                  name="name"
                  label="Name"
                  disabled={state.submitting}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <ContactInput
                  control={control}
                  name="email"
                  label="Email"
                  disabled={state.submitting}
                  slotProps={{ input: { type: "email" } }}
                />
              </Grid>
              <Grid xs={12}>
                <ContactInput
                  control={control}
                  name="subject"
                  label="Subject"
                  disabled={state.submitting}
                />
              </Grid>
              <Grid xs={12}>
                <ContactTextarea
                  control={control}
                  name="message"
                  label="Message"
                  disabled={state.submitting}
                  slotProps={{ textarea: { minRows: 5, maxRows: 5 } }}
                />
              </Grid>
            </Grid>
            <Grid xs={12} md={8} mdOffset={4}>
              <Stack spacing={1}>
                {state.errors.map(({ message }, index) => (
                  <Alert key={index} color="danger">
                    {message}
                  </Alert>
                ))}
              </Stack>
            </Grid>
            <Grid xs={12} sm="auto" smOffset="auto">
              <Button
                type="submit"
                size="lg"
                startDecorator={<SendRounded />}
                sx={{ width: "100%" }}
                loading={state.submitting}
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Contact;
