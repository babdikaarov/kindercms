/**
 * why-us controller
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
export default factories.createCoreController("api::why-us.why-us", ({ strapi }) => ({
   async find(ctx) {
      //   console.log(ctx);
      const host = `${process.env.UNSECURE_CON}` + ctx.request.header.host;
      const { data, meta } = await super.find(ctx);
      const sorted = data.sort(
         (a: { attributes: { order: number } }, b: { attributes: { order: number } }) =>
            a.attributes.order - b.attributes.order,
      );
      const sortedEntry = sorted.map((el) => {
         const obj: Record<string, ImageObject> = el.attributes.image.data.attributes.formats;
         const modifiedObject: Record<string, ModifiedImageObject> = {};
         for (const [key, value] of Object.entries(obj)) {
            modifiedObject[key] = {
               src: host + value.url,
               width: value.width,
               height: value.height,
            };
         }
         const image = {
            alt: el.attributes.image.data.attributes.alternativeText,
            src: host + el.attributes.image.data.attributes.url,
            formats: modifiedObject,
         };
         const secondLang = el.attributes.localizations.data[0].attributes;
         const entry = {
            id: el.id,
            [el.attributes.locale]: {
               title: el.attributes.title,
            },
            [secondLang.locale]: {
               title: secondLang.title,
            },
            order: el.order,
            image: image,
         };
         return entry;
      });
      return sortedEntry;
   },
}));
