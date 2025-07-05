# [mwskwong.com](https://mwskwong.com)

## Greetings 👋.

Welcome to the source code of [mwskwong.com](https://mwskwong.com). You can see how I created my site here.

## PROD Deployment

1. Create a PR from `canary` to `main`. Let the GitHub Actions run automatically.

2. In [Contentful](https://app.contentful.com/)
   1. Update the `master` alias target to the untargeted canary environment (check the **Created** date, it should be newer than the currently targeted environment).

   2. Delete the untargeted canary environment (i.e. the one previously targeted by `master`) and add a new one.
      - Environment ID naming: `canary_YYYY-MM-DDTHH-mm-ss-SSSZ`

        ```js
        navigator.clipboard.writeText(
          `canary_${new Date().toISOString().replaceAll(":", "-")}`,
        );
        ```

      - Cloned from: `master` environment

   3. Update the **Environments** of the `canary` API key, check the newly added canary environment

3. In [Vercel](https://vercel.com), replace the value of environment variable `CONTENTFUL_ENVIRONMENT` of the **Preview** environment to the Contentful Environment ID defined in step 2.ii.

4. Merge/enable auto merge for the PR.
