import { renderShareCard } from "./card";

/* The link preview image, served at /elite-tempo/share-card (every page names it
   through SHARE_IMAGES in theme.ts). It used to be the file-based
   opengraph-image, whose URL hash did not change when the design did, so phones
   that had cached the old card kept showing it on the home page. */
export async function GET() {
  return renderShareCard();
}
