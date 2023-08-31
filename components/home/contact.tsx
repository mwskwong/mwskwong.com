"use client";

import { useSubmit } from "@formspree/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  KeyboardArrowUpRounded,
  ReportRounded,
  SendRounded,
  ThumbUpRounded,
} from "@mui/icons-material";
import Alert from "@mui/joy/Alert";
import Box, { BoxProps } from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Container from "@mui/joy/Container";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import Grid from "@mui/joy/Grid";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";

import { contactInfo } from "@/constants/content";
import { contact, home } from "@/constants/nav";

import formSchema, { FormSchema } from "./form-schema";

const Contact: FC<Omit<BoxProps<"section">, "children">> = (props) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    setError,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });
  const handleFormSubmit = useSubmit<FormSchema>(
    process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? "",
    {
      onError: (error) => {
        const formErrors = error.getFormErrors();
        if (formErrors.length) {
          const { code, message } = formErrors[0];
          setError("root", { type: code, message });
        }
      },
    },
  );

  return (
    <Box component="section" {...props}>
      <Container>
        <Stack spacing={6}>
          <Typography level="h2" id={contact.id} textAlign="center">
            Contact
          </Typography>
          <Grid
            container
            spacing={6}
            disableEqualOverflow
            component="form"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <Grid component="address" container xs={12} md={4} spacing={3}>
              {contactInfo.map(({ Icon, title, value, url }) => (
                <Grid key={title} xs={12} sm={4} md={12}>
                  <Stack spacing={1} alignItems="center">
                    <Icon fontSize="xl4" />
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
            {isSubmitSuccessful ? (
              <Grid xs={12} md={8}>
                <Stack
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                  textAlign="center"
                >
                  <Sheet
                    color="success"
                    variant="soft"
                    sx={{ display: "flex", borderRadius: "sm", p: 1.5 }}
                  >
                    <ThumbUpRounded fontSize="xl4" />
                  </Sheet>
                  <Typography level="h1" color="primary">
                    Thank You!
                  </Typography>
                  <Typography>
                    {"I've received your message and we'll be in touch soon!"}
                  </Typography>
                  <Button
                    size="lg"
                    endDecorator={<KeyboardArrowUpRounded />}
                    component="a"
                    href={home.href}
                  >
                    Back To Top
                  </Button>
                </Stack>
              </Grid>
            ) : (
              <>
                <Grid
                  // WORKAROUND: nested grid container needs to be a direct child of the parent Grid container to be identified
                  unstable_level={1}
                  container
                  rowSpacing={1}
                  columnSpacing={2}
                  xs={12}
                  md={8}
                >
                  <Grid xs={12} sm={6}>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <FormControl
                          error={Boolean(error)}
                          disabled={isSubmitting}
                        >
                          <FormLabel>Name</FormLabel>
                          <Input {...field} />
                          <FormHelperText>{error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <FormControl
                          error={Boolean(error)}
                          disabled={isSubmitting}
                        >
                          <FormLabel>Email</FormLabel>
                          <Input {...field} />
                          <FormHelperText>{error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Controller
                      name="subject"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <FormControl
                          error={Boolean(error)}
                          disabled={isSubmitting}
                        >
                          <FormLabel>Subject</FormLabel>
                          <Input {...field} />
                          <FormHelperText>{error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Controller
                      name="message"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <FormControl
                          error={Boolean(error)}
                          disabled={isSubmitting}
                        >
                          <FormLabel>Message</FormLabel>
                          <Textarea minRows={5} maxRows={5} {...field} />
                          <FormHelperText>{error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                </Grid>
                {errors.root && (
                  <Grid xs={12} md={8} mdOffset={4}>
                    <Alert
                      variant="soft"
                      color="danger"
                      startDecorator={<ReportRounded />}
                    >
                      {errors.root.message}
                    </Alert>
                  </Grid>
                )}
                <Grid xs={12} sm="auto" smOffset="auto">
                  <Button
                    type="submit"
                    size="lg"
                    startDecorator={<SendRounded />}
                    fullWidth
                    loading={isSubmitting}
                  >
                    Send Message
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Contact;
