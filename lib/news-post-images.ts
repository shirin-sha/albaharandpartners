import { NewsPost } from '@/types/news-updates';

/** Main image for list thumbnails and small cards — prefers main (`detailImagePath`), then featured (`imagePath`). */
export function newsMainImageSrc(post: Pick<NewsPost, 'detailImagePath' | 'imagePath'>): string {
  const main = post.detailImagePath?.trim();
  const featured = post.imagePath?.trim();
  return main || featured || '';
}

/**
 * Large hero image (news listing featured card + detail page header image).
 * Prefers featured image when set; otherwise main image.
 */
export function newsLargeDisplayImageSrc(post: Pick<NewsPost, 'detailImagePath' | 'imagePath'>): string {
  const featured = post.imagePath?.trim();
  const main = post.detailImagePath?.trim();
  return featured || main || '';
}
