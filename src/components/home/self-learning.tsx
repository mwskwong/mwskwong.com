'use client';

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
import { Search, X } from 'lucide-react';
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
    <Stack spacing={6} {...props}>
      <Stack alignItems="center" spacing={2} textAlign="center">
        <Typography level="h3" textAlign="center">
          Self-learning
        </Typography>
        <Box component="figure" maxWidth="sm">
          <Typography component="blockquote" fontStyle="italic">
            “Stay hungry. Stay foolish. Never let go of your appetite to go
            after new ideas, new experiences, and new adventures.”
          </Typography>
          <Typography component="figcaption">― Steve Jobs</Typography>
        </Box>
      </Stack>
      <Stack spacing={2}>
        <Input
          endDecorator={
            search.length > 0 && (
              <IconButton onClick={() => setSearch('')}>
                <X />
              </IconButton>
            )
          }
          fullWidth
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search courses..."
          size="lg"
          startDecorator={<Search />}
          sx={{ maxWidth: 400, mx: 'auto' }}
          value={search}
        />
        <Grid container spacing={2}>
          {filteredCourses.map(
            ({ name, institution, certificate, categories }) => {
              const Icon = institution && getIconByContentfulId(institution.id);

              return (
                <Grid key={name} md={6} xs={12}>
                  <Card
                    orientation="horizontal"
                    sx={{ height: { sm: '100%' } }}
                  >
                    {Icon ? <Icon color="default" /> : null}
                    <Stack spacing="inherit">
                      <CardContent>
                        {certificate ? (
                          <Link
                            color="neutral"
                            href={certificate}
                            overlay
                            target="_blank"
                            typography="title-md"
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
              );
            },
          )}
        </Grid>
      </Stack>
    </Stack>
  );
};
