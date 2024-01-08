import List, { ListProps } from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import dayjs, { extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { mergeSx } from 'merge-sx';
import { FC } from 'react';

import { getGuestbookSubmissions } from '@/lib/queries';

extend(relativeTime);

export type SubmissionListProps = Omit<ListProps, 'children'>;
export const SubmissionList: FC<SubmissionListProps> = async ({
  sx,
  ...props
}) => {
  const submissions = await getGuestbookSubmissions();
  return (
    <List sx={mergeSx({ '--List-gap': '16px' }, sx)} {...props}>
      {submissions.map(({ id, name, message, submittedAt }) => (
        <ListItem key={id}>
          <ListItemContent>
            <Typography level="title-md">
              {name}
              <Typography level="body-sm">
                {' · '}
                {dayjs(submittedAt).fromNow()}
              </Typography>
            </Typography>
            <Typography component="pre" level="body-md">
              {message}
            </Typography>
          </ListItemContent>
        </ListItem>
      ))}
    </List>
  );
};
