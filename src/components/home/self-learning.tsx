'use client';

import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Input,
  Link,
  Stack,
  type StackProps,
  Typography,
} from '@mui/joy';
import { Search, X } from 'lucide-react';
import { type FC, useDeferredValue, useMemo, useState } from 'react';

import { Icon } from '../contentful';

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
    <Stack spacing={6} {...props}>
      <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}>
        <Typography level="h3">Self-learning</Typography>
        <Box component="figure" sx={{ maxWidth: 'sm' }}>
          <Typography component="blockquote" sx={{ fontStyle: 'italic' }}>
            “Stay hungry. Stay foolish. Never let go of your appetite to go
            after new ideas, new experiences, and new adventures.”
          </Typography>
          <Typography component="figcaption">― Steve Jobs</Typography>
        </Box>
      </Stack>
      <Stack component="search" spacing={2}>
        <Input
          fullWidth
          placeholder="Search courses..."
          size="lg"
          startDecorator={<Search />}
          sx={{ maxWidth: 400, mx: 'auto' }}
          type="search"
          value={search}
          endDecorator={
            search.length > 0 && (
              <IconButton onClick={() => setSearch('')}>
                <X />
              </IconButton>
            )
          }
          onChange={(event) => setSearch(event.target.value)}
        />
        <Grid container spacing={2}>
          {filteredCourses.map(
            ({ name, institution, certificate, categories }) => (
              <Grid key={name} md={6} xs={12}>
                <Card orientation="horizontal" sx={{ height: { sm: '100%' } }}>
                  {institution ? (
                    <Icon color="default" contentfulId={institution.id} />
                  ) : null}
                  <Stack spacing="inherit">
                    <CardContent>
                      {certificate ? (
                        <Link
                          overlay
                          color="neutral"
                          href={certificate}
                          sx={{ font: 'title-md' }}
                          target="_blank"
                        >
                          {name}
                        </Link>
                      ) : (
                        <Typography level="title-md">{name}</Typography>
                      )}
                      <Typography level="body-sm">
                        {institution?.name}
                      </Typography>
                    </CardContent>
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
                  </Stack>
                </Card>
              </Grid>
            ),
          )}
        </Grid>
      </Stack>
    </Stack>
  );
};
