/**
 * program-description controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::program-description.program-description", ({ strapi }) => ({
   async find(ctx) {
      const { data, meta } = await super.find(ctx);
      const secondLang = data.attributes.localizations.data[0].attributes;
      const entry = {
         [data.attributes.locale]: {
            description: data.attributes.description,
         },
         [secondLang.locale]: {
            description: secondLang.description,
         },
      };
      return entry;
   },
}));
