import type { Schema, Attribute } from "@strapi/strapi";

export interface DefaultReachtext extends Schema.Component {
   collectionName: "components_default_reachtexts";
   info: {
      displayName: "reachtext";
   };
   attributes: {
      teset: Attribute.Blocks;
   };
}

declare module "@strapi/types" {
   export module Shared {
      export interface Components {
         "default.reachtext": DefaultReachtext;
      }
   }
}
