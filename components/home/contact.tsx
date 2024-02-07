'use client';

import { valibotResolver } from '@hookform/resolvers/valibot';
import {
  Alert,
  Box,
  BoxProps,
  Button,
  Checkbox,
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
import { AlertTriangle, Send, ThumbsUp } from 'lucide-react';
import NextLink from 'next/link';
import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { contactInfo } from '@/constants/content';
import { contact, contactForm, guestbook, home } from '@/constants/nav';
import { submitContactForm } from '@/lib/actions';
import { ContactFormData, contactFormSchema } from '@/lib/schemas';

export type ContactProps = Omit<BoxProps<'section'>, 'children'>;
export const Contact: FC<ContactProps> = (props) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isSubmitSuccessful, isValid, errors },
    setError,
    setValue,
    trigger,
    watch,
  } = useForm<ContactFormData>({
    resolver: valibotResolver(contactFormSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      showInGuestbook: false,
    },
    progressive: true,
  });

  const showInGuestbook = watch('showInGuestbook');

  useEffect(() => {
    /**
     * not using useSearchParam here,
     * or else the page (or the nearest suspense, which is impractical in this case)
     * will be client-side rendered.
     * @see {@link https://nextjs.org/docs/app/api-reference/functions/use-search-params#static-rendering}
     *
     * Since we are checking the checkbox on the client-side,
     * there will be a delay before the checkbox is checked,
     * if the client device is very slow (unable to reproduce with "Low-end mobile" in Chromium browser).
     * But this is acceptable for this case.
     */
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('showInGuestbook') === 'true') {
      setValue('showInGuestbook', true);
    }
  }, [setValue]);

  return (
    <Box component="section" {...props}>
      <Container>
        <Stack spacing={8}>
          <Typography id={contact.id} level="h2" textAlign="center">
            Contact
          </Typography>
          <Grid
            alignItems="center"
            component="form"
            container
            disableEqualOverflow
            onSubmit={handleSubmit(async (data) => {
              try {
                await submitContactForm(data);
              } catch (error) {
                setError('root', {
                  message: 'Unexpected error. Please try again later.',
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
              spacing={4}
              xs={12}
            >
              {Object.values(contactInfo).map(({ Icon, title, value, url }) => (
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
                      width: 40,
                      height: 40,
                      mb: 2,
                    }}
                    variant="soft"
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
                  mb={6}
                  spacing={2}
                  textAlign="center"
                >
                  <Sheet
                    color="success"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'sm',
                      borderRadius: '50%',
                      width: 100,
                      height: 100,
                      '--Icon-fontSize': '2.5rem',
                    }}
                    variant="outlined"
                  >
                    <ThumbsUp absoluteStrokeWidth size={2.5 * 16} />
                  </Sheet>
                  <Typography level="title-lg">Thank You!</Typography>
                  <Typography maxWidth="sm">
                    Thank you for reaching out! I have received your message and
                    will respond promptly, should you have provided your email
                    address.
                  </Typography>
                </Stack>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="center"
                  spacing={2}
                >
                  <Button
                    component={NextLink}
                    href={guestbook.pathname}
                    size="lg"
                  >
                    {guestbook.label}
                  </Button>
                  <Button
                    color="neutral"
                    component={NextLink}
                    href={{ pathname: home.pathname, hash: home.id }}
                    size="lg"
                    variant="outlined"
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
                  id={contactForm.id}
                  md={8}
                  rowSpacing={1}
                  sx={{
                    scrollMarginTop: 'calc(var(--Header-height) - 8px * 6)',
                  }}
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
                          <FormHelperText>
                            {error?.message ?? (showInGuestbook && 'Optional')}
                          </FormHelperText>
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
                          <FormHelperText>
                            {error?.message ?? (showInGuestbook && 'Optional')}
                          </FormHelperText>
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
                  <Grid xs={12}>
                    <Controller
                      control={control}
                      name="showInGuestbook"
                      render={({
                        field: { disabled, ref, value, onChange, ...field },
                        fieldState: { error },
                      }) => (
                        <FormControl
                          disabled={isSubmitting || disabled}
                          error={Boolean(error)}
                        >
                          <Checkbox
                            checked={value}
                            label="Show my message in the guestbook."
                            onChange={(event) => {
                              onChange(event);

                              if (event.target.checked && !isValid) {
                                void trigger(['email', 'subject']);
                              }
                            }}
                            slotProps={{ input: { ref } }}
                            {...field}
                          />
                          <FormHelperText>
                            {error?.message ?? (
                              <Typography level="body-sm">
                                Your{' '}
                                <Typography fontWeight="md">name</Typography>
                                {', '}
                                <Typography fontWeight="md">
                                  message
                                </Typography>{' '}
                                and{' '}
                                <Typography fontWeight="md">
                                  submission date
                                </Typography>{' '}
                                will appear in the{' '}
                                <Link
                                  component={NextLink}
                                  href={guestbook.pathname}
                                  underline="always"
                                >
                                  {guestbook.label}
                                </Link>
                                .
                              </Typography>
                            )}
                          </FormHelperText>
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
