import 'server-only';
import { draftMode } from 'next/headers';
import { client } from '@/sanity/lib/client';
import { homePageQuery, pagesBySlugQuery, settingsQuery, postsQuery, postsBySlugQuery, categoryQuery, categoryBySlugQuery, getVideosQuery, getVideoBySlugQuery, teamQuery, teamBySlugQuery } from '@/sanity/lib/queries';
import { token } from '@/sanity/lib/token';
import { SettingsPayload, PostsPayload, CategoryPayload, VideoPayload, TeamPayload } from '@/types';
import * as queryStore from '@sanity/react-loader';

const serverClient = client.withConfig({
   token,
   stega: {
      // Enable stega if it's a Vercel preview deployment, as the Vercel Toolbar has controls that shows overlays
      enabled: process.env.VERCEL_ENV === 'preview',
   },
});

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient);

const usingCdn = serverClient.config().useCdn;
// Automatically handle draft mode
export const loadQuery = ((query, params = {}, options = {}) => {
   const { perspective = draftMode().isEnabled ? 'previewDrafts' : 'published' } = options;
   // Don't cache by default
   let revalidate: NextFetchRequestConfig['revalidate'] = 0;
   // If `next.tags` is set, and we're not using the CDN, then it's safe to cache
   if (!usingCdn && Array.isArray(options.next?.tags)) {
      revalidate = false;
   } else if (usingCdn) {
      revalidate = 1;
   }
   return queryStore.loadQuery(query, params, {
      ...options,
      next: {
         revalidate,
         ...(options.next || {}),
      },
      perspective,
      // @TODO add support in `@sanity/client/stega` for the below
      // stega: {enabled: draftMode().isEnabled}
   });
}) satisfies typeof queryStore.loadQuery;

// Settings
export const loadSettings = () => loadQuery<SettingsPayload>(settingsQuery, {}, { next: { tags: ['settings', 'home', 'page', 'project'] } });

// Posts
export const loadPosts = () => loadQuery<PostsPayload[]>(postsQuery, {}, { next: { tags: ['posts'] } });
export const loadPostsPage = (slug: string) => loadQuery<PostsPayload | null>(postsBySlugQuery, { slug }, { next: { tags: [`posts:${slug}`] } });

// Categories
export const loadCategories = () => loadQuery<CategoryPayload[]>(categoryQuery, {}, { next: { tags: ['category'] } });
export const loadCategorySlugPage = (slug: string) => loadQuery<CategoryPayload | null>(categoryBySlugQuery, { slug }, { next: { tags: [`category:${slug}`] } });

// Videos
export const loadVideos = () => loadQuery<VideoPayload[]>(getVideosQuery, {}, { next: { tags: ['video'] } });
export const loadVideoSlugPage = (slug: string) => loadQuery<VideoPayload | null>(getVideoBySlugQuery, { slug }, { next: { tags: [`video:${slug}`] } });

// Team
export const loadTeam = () => loadQuery<TeamPayload[]>(teamQuery, {}, { next: { tags: ['team'] } });
export const loadTeamSlugPage = (slug: string) => loadQuery<TeamPayload | null>(teamBySlugQuery, { slug }, { next: { tags: [`team:${slug}`] } });
