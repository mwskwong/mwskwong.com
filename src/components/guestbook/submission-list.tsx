import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  ListProps,
  Skeleton,
  Typography,
} from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
import dayjs, { extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { mergeSx } from 'merge-sx';
import { FC } from 'react';

import { getGuestbookSubmissions } from '@/lib/queries';

extend(relativeTime);

const submissionListSx = {
  '--List-gap': 'calc(2 * var(--joy-spacing))',
  '--ListItemDecorator-size': 'calc(2rem + 2 * var(--joy-spacing))',
  '--ListItem-paddingX': '0px',
  '& > li': { alignItems: 'flex-start' },
} satisfies SxProps;

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
                {dayjs(submittedAt).fromNow()}
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

export const SubmissionListSkeleton: FC<SubmissionListProps> = ({
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
