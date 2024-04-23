import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  type ListProps,
  Skeleton,
  Stack,
  type StackProps,
  Typography,
} from '@mui/joy';
import { type SxProps } from '@mui/joy/styles/types';
import { Frown } from 'lucide-react';
import { mergeSx } from 'merge-sx';
import { type FC } from 'react';

import { getGuestbookSubmissions } from '@/lib/queries';

const submissionListSx = {
  '--List-gap': 'calc(2 * var(--joy-spacing))',
  '--ListItemDecorator-size': 'calc(2rem + 2 * var(--joy-spacing))',
  '--ListItem-paddingX': '0px',
  '& > li': { alignItems: 'flex-start' },
} satisfies SxProps;

const today = new Date();
const relativeTimeFormatter = new Intl.RelativeTimeFormat('en', {
  numeric: 'auto',
});

const fromNow = (date: Date) => {
  // logic: https://day.js.org/docs/en/display/from-now
  const diffInSec = Math.round((today.getTime() - date.getTime()) / 1000);
  const diffInMin = Math.round(diffInSec / 60);
  const diffInHour = Math.round(diffInMin / 60);
  const diffInDay = Math.round(diffInHour / 24);
  const diffInMonth = Math.round(diffInDay / 30);
  const diffInYear = Math.round(diffInMonth / 12);

  if (diffInSec >= 0 && diffInSec <= 44) {
    return relativeTimeFormatter.format(-diffInSec, 'second');
  }

  if (diffInSec >= 45 && diffInMin <= 44) {
    return relativeTimeFormatter.format(-diffInMin, 'minute');
  }

  if (diffInMin >= 45 && diffInHour <= 21) {
    return relativeTimeFormatter.format(-diffInHour, 'hour');
  }

  if (diffInHour >= 22 && diffInDay <= 25) {
    return relativeTimeFormatter.format(-diffInDay, 'day');
  }

  if (diffInDay >= 26 && diffInMonth <= 10) {
    return relativeTimeFormatter.format(-diffInMonth, 'month');
  }

  return relativeTimeFormatter.format(-diffInYear, 'year');
};

export type SubmissionListProps = Omit<ListProps, 'children'>;
export const SubmissionList: FC<SubmissionListProps> = async ({
  sx,
  ...props
}) => {
  const submissions = await getGuestbookSubmissions();
  return (
    <List sx={mergeSx(submissionListSx, sx)} {...props}>
      {submissions.map(({ id, name, message, submittedAt }) => (
        <ListItem key={id}>
          <ListItemDecorator>
            <Avatar size="sm" sx={{ textTransform: 'uppercase' }}>
              {name
                .split(' ')
                .slice(0, 2)
                .map((text) => text[0])
                .join('')}
            </Avatar>
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-md">
              {name}
              <Typography level="body-sm" sx={{ fontWeight: 'normal' }}>
                {' · '}
                {fromNow(submittedAt)}
              </Typography>
            </Typography>
            <Typography
              component="pre"
              level="body-md"
              sx={{ whiteSpace: 'pre-wrap' }}
            >
              {message}
            </Typography>
          </ListItemContent>
        </ListItem>
      ))}
    </List>
  );
};

export type SubmissionListSkeletonProps = SubmissionListProps;
export const SubmissionListSkeleton: FC<SubmissionListSkeletonProps> = ({
  sx,
  ...props
}) => {
  return (
    <List sx={mergeSx(submissionListSx, sx)} {...props}>
      {Array.from({ length: 5 }, (_, index) => (
        <ListItem key={index}>
          <ListItemDecorator>
            <Skeleton height={32} variant="circular" width={32} />
          </ListItemDecorator>
          <ListItemContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Skeleton level="title-md" variant="text" width={120} />
              <Typography component="span" level="body-sm">
                &nbsp;·&nbsp;
              </Typography>
              <Skeleton level="body-sm" variant="text" width={70} />
            </Box>
            <Skeleton variant="text" width="92%" />
            <Skeleton variant="text" width="70%" />
          </ListItemContent>
        </ListItem>
      ))}
    </List>
  );
};

export type SubmissionListErrorProps = Omit<StackProps, 'children'>;
export const SubmissionListError: FC<SubmissionListErrorProps> = ({
  sx,
  ...props
}) => {
  return (
    <Stack
      spacing={2}
      sx={mergeSx({ '--Icon-fontSize': '4rem', alignItems: 'center' }, sx)}
      {...props}
    >
      <Frown absoluteStrokeWidth size={4 * 16} />
      <Typography>Something went wrong. Please try again later.</Typography>
    </Stack>
  );
};
