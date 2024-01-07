'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/joy/Alert';
import Box, { BoxProps } from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Container from '@mui/joy/Container';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import { AlertTriangle, ArrowUp, Send, ThumbsUp } from 'lucide-react';
import NextLink from 'next/link';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { contactInfo } from '@/constants/content';
import { contact, home } from '@/constants/nav';
import { submitContactForm } from '@/lib/actions';
import { contactFormSchema } from '@/lib/utils';

export type ContactProps = Omit<BoxProps<'section'>, 'children'>;
export const Contact: FC<ContactProps> = (props) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    setError,
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      showInGuestBook: false,
    },
    progressive: true,
  });

  return (
    <Box component="section" {...props}>
      <Container>
        <Stack spacing={8}>
          <Typography id={contact.id} level="h2" textAlign="center">
            Contact
          </Typography>
          <Grid
            component="form"
            container
            disableEqualOverflow
            onSubmit={handleSubmit(async (data) => {
              try {
                await submitContactForm(data);
              } catch (error) {
                setError('root', {
                  message: 'Unexpected error. Please try again later',
                });
              }
            })}
            spacing={6}
          >
            <Grid
              component="address"
              container
              fontStyle="initial"
              md={4}
              spacing={3}
              xs={12}
            >
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
                  py={6}
                  spacing={2}
                  textAlign="center"
                >
                  <Sheet
                    color="success"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 'sm',
                      fontSize: 'xl5',
                      width: '1em',
                      height: '1em',
                    }}
                    variant="outlined"
                  >
                    <ThumbsUp />
                  </Sheet>
                  <Box>
                    <Typography level="title-md">Thank You!</Typography>
                    <Typography>
                      I&apos;ve received your message and we&apos;ll be in touch
                      soon!
                    </Typography>
                  </Box>
                  <Button
                    component={NextLink}
                    href={home.href}
                    size="lg"
                    startDecorator={<ArrowUp />}
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
                      name="name"
                      render={({
                        field: { disabled, ref, ...field },
                        fieldState: { error },
                      }) => (
                        <FormControl
                          disabled={isSubmitting || disabled}
                          error={Boolean(error)}
                        >
                          <FormLabel>Name</FormLabel>
                          <Input slotProps={{ input: { ref } }} {...field} />
                          <FormHelperText>{error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid sm={6} xs={12}>
                    <Controller
                      control={control}
                      name="email"
                      render={({
                        field: { disabled, ref, ...field },
                        fieldState: { error },
                      }) => (
                        <FormControl
                          disabled={isSubmitting || disabled}
                          error={Boolean(error)}
                        >
                          <FormLabel>Email</FormLabel>
                          <Input slotProps={{ input: { ref } }} {...field} />
                          <FormHelperText>{error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Controller
                      control={control}
                      name="subject"
                      render={({
                        field: { disabled, ref, ...field },
                        fieldState: { error },
                      }) => (
                        <FormControl
                          disabled={isSubmitting || disabled}
                          error={Boolean(error)}
                        >
                          <FormLabel>Subject</FormLabel>
                          <Input slotProps={{ input: { ref } }} {...field} />
                          <FormHelperText>{error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Controller
                      control={control}
                      name="message"
                      render={({
                        field: { disabled, ref, ...field },
                        fieldState: { error },
                      }) => (
                        <FormControl
                          disabled={isSubmitting || disabled}
                          error={Boolean(error)}
                        >
                          <FormLabel>Message</FormLabel>
                          <Textarea
                            maxRows={7}
                            minRows={7}
                            slotProps={{ textarea: { ref } }}
                            {...field}
                          />
                          <FormHelperText>{error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                </Grid>
                {errors.root ? (
                  <Grid md={8} mdOffset={4} xs={12}>
                    <Alert color="danger" startDecorator={<AlertTriangle />}>
                      {errors.root.message}
                    </Alert>
                  </Grid>
                ) : null}
                <Grid sm="auto" smOffset="auto" xs={12}>
                  <Button
                    fullWidth
                    loading={isSubmitting}
                    loadingPosition="start"
                    startDecorator={<Send />}
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
