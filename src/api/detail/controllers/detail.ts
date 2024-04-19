/**
 * detail controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::detail.detail", ({ strapi }) => ({
   async find(ctx) {
      const { data, meta } = await super.find(ctx);
      const entry = {
         [data.attributes.locale]: {
            tel1: data.attributes.tel1,
            tel2: data.attributes.tel2,
            weekday: data.attributes.weekday,
            weekend: data.attributes.weekend,
            orgName: data.attributes.orgName,
            address: data.attributes.address,
         },
         [data.attributes.localizations.data[0].attributes.locale]: {
            tel1: data.attributes.localizations.data[0].attributes.tel1,
            tel2: data.attributes.localizations.data[0].attributes.tel2,
            weekday: data.attributes.localizations.data[0].attributes.weekday,
            weekend: data.attributes.localizations.data[0].attributes.weekend,
            orgName: data.attributes.localizations.data[0].attributes.orgName,
            address: data.attributes.localizations.data[0].attributes.address,
         },
      };
      return entry;
   },
}));
