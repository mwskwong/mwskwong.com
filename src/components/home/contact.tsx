'use client';

import { useSubmit } from '@formspree/react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  KeyboardArrowUpRounded,
  ReportRounded,
  SendRounded,
  ThumbUpRounded,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  BoxProps,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Link,
  Sheet,
  Stack,
  Textarea,
  Typography,
} from '@mui/joy';
import { capitalize } from 'lodash-es';
import NextLink from 'next/link';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { contactInfo } from '@/constants/content';
import { contact, home } from '@/constants/nav';

const formSchema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z
    .string()
    .nonempty('Email is required')
    .email('Email should be an email'),
  subject: z.string().nonempty('Subject is required'),
  message: z.string().nonempty('Message is required'),
});
type FormSchema = z.infer<typeof formSchema>;

export type ContactProps = Omit<BoxProps<'section'>, 'children'>;
export const Contact: FC<ContactProps> = (props) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    setError,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const handleFormSubmit = useSubmit<FormSchema>(
    process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? '',
    {
      onError: (error) => {
        const formErrors = error.getFormErrors();
        const fieldErrors = error.getAllFieldErrors();

        const { code, message } = formErrors[0] ?? {};
        setError('root', { type: code, message });

        for (const [field, errors] of fieldErrors) {
          setError(field, {
            type: 'validate',
            message: `${capitalize(field)} ${errors[0]?.message}`,
          });
        }
      },
    },
  );

  return (
    <Box component="section" {...props}>
      <Container>
        <Stack spacing={6}>
          <Typography id={contact.id} level="h2" textAlign="center">
            Contact
          </Typography>
          <Grid
            component="form"
            container
            disableEqualOverflow
            onSubmit={handleSubmit(handleFormSubmit)}
            spacing={6}
          >
            <Grid component="address" container md={4} spacing={3} xs={12}>
              {contactInfo.map(({ Icon, title, value, url }) => (
                <Grid
                  alignItems="center"
                  display="flex"
                  flexDirection="column"
                  key={title}
                  md={12}
                  sm={4}
                  xs={12}
                >
                  <Sheet
                    color="primary"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 'sm',
                      fontSize: 'xl5',
                      width: '1em',
                      height: '1em',
                      mb: 2,
                    }}
                    variant="outlined"
                  >
                    <Icon />
                  </Sheet>
                  <Typography level="title-md">{title}</Typography>
                  <Link
                    color="neutral"
                    href={url}
                    target={url.startsWith('http') ? '_blank' : undefined}
                    typography="body-md"
                  >
                    {value}
                  </Link>
                </Grid>
              ))}
            </Grid>
            {isSubmitSuccessful ? (
              <Grid md={8} xs={12}>
                <Stack
                  alignItems="center"
                  height="100%"
                  justifyContent="center"
                  spacing={2}
                  textAlign="center"
                >
                  <Sheet
                    color="success"
                    sx={{ display: 'flex', borderRadius: 'sm', p: 1.5 }}
                    variant="soft"
                  >
                    <ThumbUpRounded fontSize="xl4" />
                  </Sheet>
                  <Typography color="primary" level="h1">
                    Thank You!
                  </Typography>
                  <Typography>
                    I&apos;ve received your message and we&apos;ll be in touch
                    soon!
                  </Typography>
                  <Button
                    component={NextLink}
                    href={home.href}
                    size="lg"
                    startDecorator={<KeyboardArrowUpRounded />}
                  >
                    Back to Top
                  </Button>
                </Stack>
              </Grid>
            ) : (
              <>
                <Grid
                  columnSpacing={2}
                  container
                  md={8}
                  rowSpacing={1}
                  // WORKAROUND: nested grid container needs to be a direct child of the parent Grid container to be identified
                  unstable_level={1}
                  xs={12}
                >
                  <Grid sm={6} xs={12}>
                    <Controller
                      control={control}
                      disabled={isSubmitting}
                      name="name"
                      render={({
                        field: { disabled, ...field },
                        fieldState: { error },
                      }) => (
                        <FormControl disabled={disabled} error={Boolean(error)}>
                          <FormLabel>Name</FormLabel>
                          <Input {...field} />
                          <FormHelperText>{error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid sm={6} xs={12}>
                    <Controller
                      control={control}
                      disabled={isSubmitting}
                      name="email"
                      render={({
                        field: { disabled, ...field },
                        fieldState: { error },
                      }) => (
                        <FormControl disabled={disabled} error={Boolean(error)}>
                          <FormLabel>Email</FormLabel>
                          <Input {...field} />
                          <FormHelperText>{error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Controller
                      control={control}
                      disabled={isSubmitting}
                      name="subject"
                      render={({
                        field: { disabled, ...field },
                        fieldState: { error },
                      }) => (
                        <FormControl disabled={disabled} error={Boolean(error)}>
                          <FormLabel>Subject</FormLabel>
                          <Input {...field} />
                          <FormHelperText>{error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Controller
                      control={control}
                      disabled={isSubmitting}
                      name="message"
                      render={({
                        field: { disabled, ...field },
                        fieldState: { error },
                      }) => (
                        <FormControl disabled={disabled} error={Boolean(error)}>
                          <FormLabel>Message</FormLabel>
                          <Textarea maxRows={7} minRows={7} {...field} />
                          <FormHelperText>{error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                </Grid>
                {errors.root ? (
                  <Grid md={8} mdOffset={4} xs={12}>
                    <Alert color="danger" startDecorator={<ReportRounded />}>
                      {errors.root.message}
                    </Alert>
                  </Grid>
                ) : null}
                <Grid sm="auto" smOffset="auto" xs={12}>
                  <Button
                    fullWidth
                    loading={isSubmitting}
                    size="lg"
                    startDecorator={<SendRounded />}
                    type="submit"
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
