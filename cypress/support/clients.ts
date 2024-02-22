import { ContentfulClientApi, createClient } from 'contentful';

// eslint-disable-next-line import/no-mutable-exports -- contentful client require setup
export let contentful: ContentfulClientApi<'WITHOUT_UNRESOLVABLE_LINKS'>;

export const setupContentfulClient = ({
  space,
  accessToken,
  environment,
}: {
  space: string;
  accessToken: string;
  environment: string;
}) => {
  contentful = createClient({
    space,
    accessToken,
    environment: environment === 'Production' ? 'master' : 'develop',
  }).withoutUnresolvableLinks;
};
