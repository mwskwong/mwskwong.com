import {
  Box,
  List,
  ListItem,
  ListItemContent,
  type ListProps,
  Sheet,
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
  '--ListItem-paddingX': '0px',
  '& > li': { alignItems: 'flex-end' },
} satisfies SxProps;

const relativeTimeFormatter = new Intl.RelativeTimeFormat('en', {
  numeric: 'auto',
});

const fromNow = (date: Date) => {
  // logic: https://day.js.org/docs/en/display/from-now

  const today = new Date();
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
      {submissions.map(({ id, name, message, submittedAt, siteOwner }) => (
        <ListItem key={id}>
          <ListItemContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: siteOwner ? 'flex-end' : undefined,
            }}
          >
            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
              {name}{' '}
              <Typography level="body-xs" sx={{ fontWeight: 'normal' }}>
                {fromNow(submittedAt)}
              </Typography>
            </Typography>
            <Sheet
              color={siteOwner ? 'primary' : undefined}
              variant={siteOwner ? 'solid' : 'soft'}
              sx={{
                px: 2,
                py: 1,
                borderRadius: 'sm',
                borderTopLeftRadius: siteOwner ? undefined : 0,
                borderTopRightRadius: siteOwner ? 0 : undefined,
                width: 'fit-content',
                maxWidth: '80%',
                whiteSpace: 'pre-wrap',
              }}
            >
              {message}
            </Sheet>
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
}) => (
  <List sx={mergeSx(submissionListSx, sx)} {...props}>
    {Array.from({ length: 10 }, (_, index) => (
      <ListItem key={index}>
        <ListItemContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: index === 0 ? 'flex-end' : undefined,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Skeleton
              level="title-sm"
              variant="text"
              width={Math.round(Math.random() * (120 - 40 + 1) + 40)}
            />
            <Typography component="span" level="body-sm">
              &nbsp;
            </Typography>
            <Skeleton
              level="body-xs"
              variant="text"
              width={Math.round(Math.random() * (80 - 50 + 1) + 50)}
            />
          </Box>
          <Skeleton
            height={40}
            variant="rectangular"
            width={`${Math.round(Math.random() * (90 - 20 + 1) + 20)}%`}
            sx={{
              borderRadius: 'sm',
              borderTopLeftRadius: index === 0 ? undefined : 0,
              borderTopRightRadius: index === 0 ? 0 : undefined,
            }}
          />
        </ListItemContent>
      </ListItem>
    ))}
  </List>
);

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
      <Frown strokeWidth={1} />
      <Typography sx={{ textAlign: 'center' }}>
        Something went wrong. Please try again later.
      </Typography>
    </Stack>
  );
};
