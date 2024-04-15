// const getService = (name: string) => {
//    return strapi.plugin("content-manager").service(name);
// };

// export default {
//    async delete(ctx: any) {
//       const { userAbility } = ctx.state;
//       const { id, model } = ctx.params;

//       console.log(id);
//       console.log(model);
//       const entityManager = getService("entity-manager");
//       const permissionChecker = getService("permission-checker").create({ userAbility, model });

//       if (permissionChecker.cannot.delete()) {
//          return ctx.forbidden();
//       }

//       const permissionQuery = await permissionChecker.sanitizedQuery.delete(ctx.query);
//       // @ts-expect-error populate builder needs to be called with a UID
//       const populate = await getService("populate-builder")(model).populateFromQuery(permissionQuery).build();

//       const entity = await entityManager.findOne(id, model, { populate });
//       console.log(entity);

//       if (!entity) {
//          return ctx.notFound();
//       }

//       if (permissionChecker.cannot.delete(entity)) {
//          return ctx.forbidden();
//       }

//       const result = await entityManager.delete(entity, model);

//       ctx.body = await permissionChecker.sanitizeOutput(result);
//    },
// };
