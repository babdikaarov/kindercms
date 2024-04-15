/**
 * form controller
 */

import { factories } from "@strapi/strapi";

const getService = (name: string) => {
   return strapi.plugin("content-manager").service(name);
};

export default factories.createCoreController("api::form.form", ({ strapi }) => ({
   async create(ctx) {
      const data = ctx.request.body;
      const files = ctx.request.files;
      const entry = await strapi.entityService.create("api::form.form", {
         data,
         files,
      });
      ctx.send(entry);
      return entry;
   },
   // async delete(ctx) {
   //    // some logic here
   //    const { id } = ctx.params;
   //    console.log(id);
   //    console.log();
   //    // console.log(strapi.entityManager.deleteRelations);
   //    // const entry = await strapi.services['form'].delete({ id });
   //    const entry = await strapi.api["form"].service("form").delete(id);
   //    console.log(entry);
   //    if (entry) {
   //       if (entry.docs.length > 0) {
   //          entry.docs.forEach((element) => {
   //             strapi.plugins.upload.services.upload.remove(element);
   //          });
   //       }
   //    }
   //    // some more logic

   //    // console.log(response);

   //    return this.sanitizeOutput(entry, { model: strapi.api.form });
   // },
   // async delete(ctx: any) {
   //    const { userAbility } = ctx.state;
   //    const { id, model } = ctx.params;

   //    console.log(id);
   //    console.log(model);
   //    const entityManager = getService("entity-manager");
   //    const permissionChecker = getService("permission-checker").create({ userAbility, model });

   //    if (permissionChecker.cannot.delete()) {
   //       return ctx.forbidden();
   //    }

   //    const permissionQuery = await permissionChecker.sanitizedQuery.delete(ctx.query);
   //    // @ts-expect-error populate builder needs to be called with a UID
   //    const populate = await getService("populate-builder")(model).populateFromQuery(permissionQuery).build();

   //    const entity = await entityManager.findOne(id, model, { populate });
   //    console.log(entity);

   //    if (!entity) {
   //       return ctx.notFound();
   //    }

   //    if (permissionChecker.cannot.delete(entity)) {
   //       return ctx.forbidden();
   //    }

   //    const result = await entityManager.delete(entity, model);

   //    ctx.body = await permissionChecker.sanitizeOutput(result);
   // },
}));

/* 
 'api::form.form': [Getter],
 'admin::project-settings': [Getter],
  'plugin::content-manager.components': [Getter],
  'plugin::content-manager.content-types': [Getter],
  'plugin::content-manager.data-mapper': [Getter],
  'plugin::content-manager.entity-manager': [Getter],
  'plugin::content-manager.field-sizes': [Getter],
  'plugin::content-manager.metrics': [Getter],
  'plugin::content-manager.permission-checker': [Getter],
  'plugin::content-manager.permission': [Getter],
  'plugin::content-manager.populate-builder': [Getter],
  'plugin::content-manager.uid': [Getter],
*/
