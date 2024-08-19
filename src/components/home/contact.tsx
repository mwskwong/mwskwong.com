'use client';

import { valibotResolver } from '@hookform/resolvers/valibot';
import {
  Alert,
  Box,
  type BoxProps,
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
import { type FC, useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { contactInfo } from '@/constants/content';
import { routes } from '@/constants/site-config';
import { submitContactForm } from '@/lib/actions';
import { type ContactFormData, ContactFormSchema } from '@/lib/validators';

export type ContactProps = Omit<BoxProps<'section'>, 'children'>;
export const Contact: FC<ContactProps> = (props) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isSubmitSuccessful, isValid, errors },
    setError,
    setValue,
    trigger,
  } = useForm<ContactFormData>({
    resolver: valibotResolver(ContactFormSchema),
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

  const showInGuestbook = useWatch({ name: 'showInGuestbook', control }); // WORKAROUND: watch() is not compatible with React Compiler

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
          <Typography
            id={routes.contact.hash}
            level="h2"
            sx={{ textAlign: 'center' }}
          >
            Contact
          </Typography>
          <Grid
            container
            component="form"
            spacing={6}
            sx={{ alignItems: 'center' }}
            onSubmit={handleSubmit(async (data) => {
              try {
                await submitContactForm(data);
              } catch (error) {
                setError('root', {
                  message: 'Unexpected error. Please try again later.',
                });
              }
            })}
          >
            <Grid
              container
              component="address"
              size={{ md: 4, xs: 12 }}
              spacing={4}
              sx={{ fontStyle: 'initial' }}
            >
              {Object.values(contactInfo).map(({ Icon, title, value, url }) => (
                <Grid
                  key={title}
                  size={{ md: 12, sm: 4, xs: 12 }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Sheet
                    color="primary"
                    variant="soft"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 'sm',
                      width: 40,
                      height: 40,
                      mb: 2,
                    }}
                  >
                    <Icon />
                  </Sheet>
                  <Typography level="title-md">{title}</Typography>
                  <Link
                    color="neutral"
                    href={url}
                    level="body-md"
                    sx={{ color: 'text.secondary' }}
                    target={url.startsWith('http') ? '_blank' : undefined}
                  >
                    {value}
                  </Link>
                </Grid>
              ))}
            </Grid>
            {isSubmitSuccessful ? (
              <Grid size={{ md: 8, xs: 12 }}>
                <Stack
                  spacing={2}
                  sx={{
                    alignItems: 'center',
                    height: '100%',
                    mb: 6,
                    textAlign: 'center',
                    '--Icon-fontSize': '4rem',
                    '--Icon-color': 'var(--joy-palette-success-plainColor)',
                  }}
                >
                  <ThumbsUp absoluteStrokeWidth size={4 * 16} />
                  <Typography level="title-lg">Thank You!</Typography>
                  <Typography sx={{ maxWidth: 'sm' }}>
                    Thank you for reaching out! I have received your message and
                    will respond promptly, should you have provided your email
                    address.
                  </Typography>
                </Stack>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ justifyContent: 'center' }}
                >
                  <Button
                    component={NextLink}
                    href={routes.guestbook}
                    size="lg"
                  >
                    {routes.guestbook.name}
                  </Button>
                  <Button
                    color="neutral"
                    component="a"
                    href="/#"
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
                  container
                  columnSpacing={2}
                  id={routes.contactForm.hash}
                  rowSpacing={1}
                  size={{ md: 8, xs: 12 }}
                  // WORKAROUND: nested grid container needs to be a direct child of the parent Grid container to be identified
                  unstable_level={1}
                  sx={{
                    scrollMarginTop:
                      'calc(var(--Header-height) + 2 * var(--joy-spacing))',
                  }}
                >
                  <Grid size={{ sm: 6, xs: 12 }}>
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
                  <Grid size={{ sm: 6, xs: 12 }}>
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
                  <Grid size={12}>
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
                  <Grid size={12}>
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
                  <Grid size={12}>
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
                            slotProps={{ input: { ref } }}
                            onChange={(event) => {
                              onChange(event);

                              if (event.target.checked && !isValid) {
                                void trigger(['email', 'subject']);
                              }
                            }}
                            {...field}
                          />
                          <FormHelperText>
                            {error?.message ?? (
                              <Typography level="body-sm">
                                Your{' '}
                                <Typography sx={{ fontWeight: 'md' }}>
                                  name
                                </Typography>
                                {', '}
                                <Typography sx={{ fontWeight: 'md' }}>
                                  message
                                </Typography>{' '}
                                and{' '}
                                <Typography sx={{ fontWeight: 'md' }}>
                                  submission date
                                </Typography>{' '}
                                will appear in the{' '}
                                <Link
                                  component={NextLink}
                                  href={routes.guestbook}
                                >
                                  {routes.guestbook.name}
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
                  <Grid offset={{ md: 4 }} size={{ md: 8, xs: 12 }}>
                    <Alert color="danger" startDecorator={<AlertTriangle />}>
                      {errors.root.message}
                    </Alert>
                  </Grid>
                ) : null}
                <Grid offset={{ sm: 'auto' }} size={{ sm: 'auto', xs: 12 }}>
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
