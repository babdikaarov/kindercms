/**
 * home-gallery-info controller
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
export default factories.createCoreController("api::home-gallery-info.home-gallery-info", ({ strapi }) => ({
   async find(ctx) {
      const host = `${process.env.UNSECURE_CON}` + ctx.request.header.host;
      const { data, meta } = await super.find(ctx);
      const obj: Record<string, ImageObject> = data.attributes.image.data.attributes.formats;
      const modifiedObject: Record<string, ModifiedImageObject> = {};
      for (const [key, value] of Object.entries(obj)) {
         modifiedObject[key] = {
            src: host + value.url,
            width: value.width,
            height: value.height,
         };
      }
      const image = {
         alt: data.attributes.image.data.attributes.alternativeText,
         src: host + data.attributes.image.data.attributes.url,
         formats: modifiedObject,
      };
      const secondLang = data.attributes.localizations.data[0].attributes;
      const entry = {
         [data.attributes.locale]: {
            description: data.attributes.description,
         },
         [secondLang.locale]: {
            description: secondLang.description,
         },
         image: image,
      };

      return entry;
   },
}));
