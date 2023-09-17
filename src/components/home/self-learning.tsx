'use client';

import { ClearRounded, SearchRounded } from '@mui/icons-material';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Grid from '@mui/joy/Grid';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Stack, { StackProps } from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { FC, useDeferredValue, useMemo, useState } from 'react';

import { getIconByContentfulId } from '@/utils/get-icon-by-contentful-id';

export interface SelfLearningProps extends Omit<StackProps, 'children'> {
  courses?: {
    institution?: {
      id: string;
      name?: string;
    };
    certificate?: string;
    name?: string;
    categories?: string[];
  }[];
}

export const SelfLearning: FC<SelfLearningProps> = ({
  courses = [],
  ...props
}) => {
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const filteredCourses = useMemo(
    () =>
      courses.filter(({ name, institution, categories }) => {
        const searchStr = deferredSearch.toLowerCase();
        return (
          Boolean(name?.toLowerCase().includes(searchStr)) ||
          Boolean(institution?.name?.toLowerCase().includes(searchStr)) ||
          categories?.some((category) =>
            category.toLowerCase().includes(searchStr),
          )
        );
      }),
    [courses, deferredSearch],
  );

  return (
    <Stack spacing={2} {...props}>
      <Input
        endDecorator={
          search.length > 0 && (
            <IconButton
              onClick={() => {
                setSearch('');
              }}
            >
              <ClearRounded />
            </IconButton>
          )
        }
        fullWidth
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        placeholder="Search courses..."
        size="lg"
        startDecorator={<SearchRounded />}
        sx={{ maxWidth: 400, mx: 'auto' }}
        value={search}
      />
      <Grid container spacing={2}>
        {filteredCourses.map(
          ({ name, institution, certificate, categories }) => {
            const Icon = institution && getIconByContentfulId(institution.id);

            return (
              <Grid key={name} md={6} xs={12}>
                <Card orientation="horizontal">
                  {Icon ? <Icon color="branding" fontSize="xl2" /> : null}
                  <CardContent sx={{ gap: 1 }}>
                    <Box minHeight={{ md: 68, lg: 'unset' }}>
                      {certificate ? (
                        <Link
                          color="neutral"
                          href={certificate}
                          level="title-md"
                          overlay
                          target="_blank"
                          textColor="text.primary"
                        >
                          {name}
                        </Link>
                      ) : (
                        <Typography level="title-md">{name}</Typography>
                      )}
                      <Typography level="body-sm">
                        {institution?.name}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      {categories?.map((category) => (
                        <Chip
                          key={category}
                          size="sm"
                          sx={{ pointerEvents: 'none' }}
                        >
                          {category}
                        </Chip>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          },
        )}
      </Grid>
    </Stack>
  );
};
