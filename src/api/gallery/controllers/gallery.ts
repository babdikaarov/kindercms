/**
 * gallery controller
 */

import { factories } from "@strapi/strapi";
interface ModifiedImageObject {
   src: string;
   width: number;
   height: number;
}
interface ImageObject {
   ext: string;
   url: string;
   hash: string;
   mime: string;
   name: string;
   path: string | null;
   size: number;
   width: number;
   height: number;
   sizeInBytes: number;
}
export default factories.createCoreController("api::gallery.gallery", ({ strapi }) => ({
   async find(ctx) {
      //   console.log(ctx);
      const host = `${process.env.UNSECURE_CON}` + ctx.request.header.host;
      const { data, meta } = await super.find(ctx);
      const sorted = data.sort(
         (
            a: { attributes: { createdAt: string | number | Date } },
            b: { attributes: { createdAt: string | number | Date } },
         ) => new Date(a.attributes.createdAt).getTime() - new Date(b.attributes.createdAt).getTime(),
      );

      const sortedEntry = sorted.map((el) => {
         const images = el.attributes.album.data.map((item) => {
            // console.log(item);
            const obj: Record<string, ImageObject> = item.attributes.formats;
            const modifiedObject: Record<string, ModifiedImageObject> = {};
            for (const [key, value] of Object.entries(obj)) {
               modifiedObject[key] = {
                  src: host + value.url,
                  width: value.width,
                  height: value.height,
               };
            }
            return {
               id: item.id,
               alt: item.attributes.alternativeText,
               src: host + item.attributes.url,
               formats: modifiedObject,
            };
         });
         const entry = {
            id: el.id,
            data: images,
         };
         return entry;
      });

      return sortedEntry;
      //   return ctx;
   },
}));
