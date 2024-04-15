export default {
   //    beforeDelete(event) {
   //         const { model } = event;
   //         const { attributes } = model;
   //         const { docs } = attributes;
   //       console.log(docs);
   //    },
   //    afterDelete(event) {
   //         const {result, params, model, state } = event;
   //       console.log(model);
   //       // do something to the result;
   //    },
};

/* 
{
  action: 'beforeDelete',
  model: {
    kind: 'collectionType',
    collectionName: 'forms',
    info: {
      singularName: 'form',
      pluralName: 'forms',
      displayName: 'form',
      description: ''
    },
    options: { draftAndPublish: false },
    pluginOptions: {},
    attributes: {
      id: [Object],
      expired_at: [Object],
      is_saved: [Object],
      inn: [Object],
      docs: [Object],
      createdAt: [Object],
      updatedAt: [Object],
      createdBy: [Object],
      updatedBy: [Object]
    },
    __schema__: {
      collectionName: 'forms',
      info: [Object],
      options: [Object],
      pluginOptions: {},
      attributes: [Object],
      kind: 'collectionType'
    },
    modelType: 'contentType',
    modelName: 'form',
    connection: 'default',
    uid: 'api::form.form',
    apiName: 'form',
    globalId: 'Form',
    actions: {},
    lifecycles: { beforeDelete: [Function: beforeDelete] },
    singularName: 'form',
    tableName: 'forms',
    indexes: [ [Object], [Object], [Object] ],
    foreignKeys: [ [Object], [Object] ],
    columnToAttribute: {
      id: 'id',
      expired_at: 'expired_at',
      is_saved: 'is_saved',
      inn: 'inn',
      docs: 'docs',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
      createdBy: 'createdBy',
      updatedBy: 'updatedBy'
    }
  },
  state: {},
  params: { where: { id: 54 } }
}
*/
