/**
 * lang controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::lang.lang", ({ strapi }) => ({
   async find(ctx) {
      ctx.query = { ...ctx.query };
      const { data, meta } = await super.find(ctx);
      if (ctx.query.lang === "ru") {
         return { data: data.attributes.ru, meta };
      } else if (ctx.query.lang === "ky") {
         return { data: data.attributes.ky, meta };
      }
      return { data, meta };
   },
   
}));
