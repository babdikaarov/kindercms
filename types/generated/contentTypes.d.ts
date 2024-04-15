import type { Schema, Attribute } from "@strapi/strapi";

export interface AdminPermission extends Schema.CollectionType {
   collectionName: "admin_permissions";
   info: {
      name: "Permission";
      description: "";
      singularName: "permission";
      pluralName: "permissions";
      displayName: "Permission";
   };
   pluginOptions: {
      "content-manager": {
         visible: false;
      };
      "content-type-builder": {
         visible: false;
      };
   };
   attributes: {
      action: Attribute.String &
         Attribute.Required &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
      subject: Attribute.String &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      properties: Attribute.JSON & Attribute.DefaultTo<{}>;
      conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
      role: Attribute.Relation<"admin::permission", "manyToOne", "admin::role">;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"admin::permission", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"admin::permission", "oneToOne", "admin::user"> & Attribute.Private;
   };
}

export interface AdminUser extends Schema.CollectionType {
   collectionName: "admin_users";
   info: {
      name: "User";
      description: "";
      singularName: "user";
      pluralName: "users";
      displayName: "User";
   };
   pluginOptions: {
      "content-manager": {
         visible: false;
      };
      "content-type-builder": {
         visible: false;
      };
   };
   attributes: {
      firstname: Attribute.String &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      lastname: Attribute.String &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      username: Attribute.String;
      email: Attribute.Email &
         Attribute.Required &
         Attribute.Private &
         Attribute.Unique &
         Attribute.SetMinMaxLength<{
            minLength: 6;
         }>;
      password: Attribute.Password &
         Attribute.Private &
         Attribute.SetMinMaxLength<{
            minLength: 6;
         }>;
      resetPasswordToken: Attribute.String & Attribute.Private;
      registrationToken: Attribute.String & Attribute.Private;
      isActive: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
      roles: Attribute.Relation<"admin::user", "manyToMany", "admin::role"> & Attribute.Private;
      blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
      preferedLanguage: Attribute.String;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"admin::user", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"admin::user", "oneToOne", "admin::user"> & Attribute.Private;
   };
}

export interface AdminRole extends Schema.CollectionType {
   collectionName: "admin_roles";
   info: {
      name: "Role";
      description: "";
      singularName: "role";
      pluralName: "roles";
      displayName: "Role";
   };
   pluginOptions: {
      "content-manager": {
         visible: false;
      };
      "content-type-builder": {
         visible: false;
      };
   };
   attributes: {
      name: Attribute.String &
         Attribute.Required &
         Attribute.Unique &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      code: Attribute.String &
         Attribute.Required &
         Attribute.Unique &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      description: Attribute.String;
      users: Attribute.Relation<"admin::role", "manyToMany", "admin::user">;
      permissions: Attribute.Relation<"admin::role", "oneToMany", "admin::permission">;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"admin::role", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"admin::role", "oneToOne", "admin::user"> & Attribute.Private;
   };
}

export interface AdminApiToken extends Schema.CollectionType {
   collectionName: "strapi_api_tokens";
   info: {
      name: "Api Token";
      singularName: "api-token";
      pluralName: "api-tokens";
      displayName: "Api Token";
      description: "";
   };
   pluginOptions: {
      "content-manager": {
         visible: false;
      };
      "content-type-builder": {
         visible: false;
      };
   };
   attributes: {
      name: Attribute.String &
         Attribute.Required &
         Attribute.Unique &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      description: Attribute.String &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }> &
         Attribute.DefaultTo<"">;
      type: Attribute.Enumeration<["read-only", "full-access", "custom"]> &
         Attribute.Required &
         Attribute.DefaultTo<"read-only">;
      accessKey: Attribute.String &
         Attribute.Required &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      lastUsedAt: Attribute.DateTime;
      permissions: Attribute.Relation<"admin::api-token", "oneToMany", "admin::api-token-permission">;
      expiresAt: Attribute.DateTime;
      lifespan: Attribute.BigInteger;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"admin::api-token", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"admin::api-token", "oneToOne", "admin::user"> & Attribute.Private;
   };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
   collectionName: "strapi_api_token_permissions";
   info: {
      name: "API Token Permission";
      description: "";
      singularName: "api-token-permission";
      pluralName: "api-token-permissions";
      displayName: "API Token Permission";
   };
   pluginOptions: {
      "content-manager": {
         visible: false;
      };
      "content-type-builder": {
         visible: false;
      };
   };
   attributes: {
      action: Attribute.String &
         Attribute.Required &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      token: Attribute.Relation<"admin::api-token-permission", "manyToOne", "admin::api-token">;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"admin::api-token-permission", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"admin::api-token-permission", "oneToOne", "admin::user"> & Attribute.Private;
   };
}

export interface AdminTransferToken extends Schema.CollectionType {
   collectionName: "strapi_transfer_tokens";
   info: {
      name: "Transfer Token";
      singularName: "transfer-token";
      pluralName: "transfer-tokens";
      displayName: "Transfer Token";
      description: "";
   };
   pluginOptions: {
      "content-manager": {
         visible: false;
      };
      "content-type-builder": {
         visible: false;
      };
   };
   attributes: {
      name: Attribute.String &
         Attribute.Required &
         Attribute.Unique &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      description: Attribute.String &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }> &
         Attribute.DefaultTo<"">;
      accessKey: Attribute.String &
         Attribute.Required &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      lastUsedAt: Attribute.DateTime;
      permissions: Attribute.Relation<"admin::transfer-token", "oneToMany", "admin::transfer-token-permission">;
      expiresAt: Attribute.DateTime;
      lifespan: Attribute.BigInteger;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"admin::transfer-token", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"admin::transfer-token", "oneToOne", "admin::user"> & Attribute.Private;
   };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
   collectionName: "strapi_transfer_token_permissions";
   info: {
      name: "Transfer Token Permission";
      description: "";
      singularName: "transfer-token-permission";
      pluralName: "transfer-token-permissions";
      displayName: "Transfer Token Permission";
   };
   pluginOptions: {
      "content-manager": {
         visible: false;
      };
      "content-type-builder": {
         visible: false;
      };
   };
   attributes: {
      action: Attribute.String &
         Attribute.Required &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      token: Attribute.Relation<"admin::transfer-token-permission", "manyToOne", "admin::transfer-token">;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"admin::transfer-token-permission", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"admin::transfer-token-permission", "oneToOne", "admin::user"> & Attribute.Private;
   };
}

export interface PluginUploadFile extends Schema.CollectionType {
   collectionName: "files";
   info: {
      singularName: "file";
      pluralName: "files";
      displayName: "File";
      description: "";
   };
   pluginOptions: {
      "content-manager": {
         visible: false;
      };
      "content-type-builder": {
         visible: false;
      };
   };
   attributes: {
      name: Attribute.String & Attribute.Required;
      alternativeText: Attribute.String;
      caption: Attribute.String;
      width: Attribute.Integer;
      height: Attribute.Integer;
      formats: Attribute.JSON;
      hash: Attribute.String & Attribute.Required;
      ext: Attribute.String;
      mime: Attribute.String & Attribute.Required;
      size: Attribute.Decimal & Attribute.Required;
      url: Attribute.String & Attribute.Required;
      previewUrl: Attribute.String;
      provider: Attribute.String & Attribute.Required;
      provider_metadata: Attribute.JSON;
      related: Attribute.Relation<"plugin::upload.file", "morphToMany">;
      folder: Attribute.Relation<"plugin::upload.file", "manyToOne", "plugin::upload.folder"> & Attribute.Private;
      folderPath: Attribute.String &
         Attribute.Required &
         Attribute.Private &
         Attribute.SetMinMax<
            {
               min: 1;
            },
            number
         >;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"plugin::upload.file", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"plugin::upload.file", "oneToOne", "admin::user"> & Attribute.Private;
   };
}

export interface PluginUploadFolder extends Schema.CollectionType {
   collectionName: "upload_folders";
   info: {
      singularName: "folder";
      pluralName: "folders";
      displayName: "Folder";
   };
   pluginOptions: {
      "content-manager": {
         visible: false;
      };
      "content-type-builder": {
         visible: false;
      };
   };
   attributes: {
      name: Attribute.String &
         Attribute.Required &
         Attribute.SetMinMax<
            {
               min: 1;
            },
            number
         >;
      pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
      parent: Attribute.Relation<"plugin::upload.folder", "manyToOne", "plugin::upload.folder">;
      children: Attribute.Relation<"plugin::upload.folder", "oneToMany", "plugin::upload.folder">;
      files: Attribute.Relation<"plugin::upload.folder", "oneToMany", "plugin::upload.file">;
      path: Attribute.String &
         Attribute.Required &
         Attribute.SetMinMax<
            {
               min: 1;
            },
            number
         >;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"plugin::upload.folder", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"plugin::upload.folder", "oneToOne", "admin::user"> & Attribute.Private;
   };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
   collectionName: "strapi_releases";
   info: {
      singularName: "release";
      pluralName: "releases";
      displayName: "Release";
   };
   options: {
      draftAndPublish: false;
   };
   pluginOptions: {
      "content-manager": {
         visible: false;
      };
      "content-type-builder": {
         visible: false;
      };
   };
   attributes: {
      name: Attribute.String & Attribute.Required;
      releasedAt: Attribute.DateTime;
      scheduledAt: Attribute.DateTime;
      timezone: Attribute.String;
      status: Attribute.Enumeration<["ready", "blocked", "failed", "done", "empty"]> & Attribute.Required;
      actions: Attribute.Relation<
         "plugin::content-releases.release",
         "oneToMany",
         "plugin::content-releases.release-action"
      >;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"plugin::content-releases.release", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"plugin::content-releases.release", "oneToOne", "admin::user"> & Attribute.Private;
   };
}

export interface PluginContentReleasesReleaseAction extends Schema.CollectionType {
   collectionName: "strapi_release_actions";
   info: {
      singularName: "release-action";
      pluralName: "release-actions";
      displayName: "Release Action";
   };
   options: {
      draftAndPublish: false;
   };
   pluginOptions: {
      "content-manager": {
         visible: false;
      };
      "content-type-builder": {
         visible: false;
      };
   };
   attributes: {
      type: Attribute.Enumeration<["publish", "unpublish"]> & Attribute.Required;
      entry: Attribute.Relation<"plugin::content-releases.release-action", "morphToOne">;
      contentType: Attribute.String & Attribute.Required;
      locale: Attribute.String;
      release: Attribute.Relation<
         "plugin::content-releases.release-action",
         "manyToOne",
         "plugin::content-releases.release"
      >;
      isEntryValid: Attribute.Boolean;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"plugin::content-releases.release-action", "oneToOne", "admin::user"> &
         Attribute.Private;
      updatedBy: Attribute.Relation<"plugin::content-releases.release-action", "oneToOne", "admin::user"> &
         Attribute.Private;
   };
}

export interface PluginI18NLocale extends Schema.CollectionType {
   collectionName: "i18n_locale";
   info: {
      singularName: "locale";
      pluralName: "locales";
      collectionName: "locales";
      displayName: "Locale";
      description: "";
   };
   options: {
      draftAndPublish: false;
   };
   pluginOptions: {
      "content-manager": {
         visible: false;
      };
      "content-type-builder": {
         visible: false;
      };
   };
   attributes: {
      name: Attribute.String &
         Attribute.SetMinMax<
            {
               min: 1;
               max: 50;
            },
            number
         >;
      code: Attribute.String & Attribute.Unique;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"plugin::i18n.locale", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"plugin::i18n.locale", "oneToOne", "admin::user"> & Attribute.Private;
   };
}

export interface PluginUsersPermissionsPermission extends Schema.CollectionType {
   collectionName: "up_permissions";
   info: {
      name: "permission";
      description: "";
      singularName: "permission";
      pluralName: "permissions";
      displayName: "Permission";
   };
   pluginOptions: {
      "content-manager": {
         visible: false;
      };
      "content-type-builder": {
         visible: false;
      };
   };
   attributes: {
      action: Attribute.String & Attribute.Required;
      role: Attribute.Relation<"plugin::users-permissions.permission", "manyToOne", "plugin::users-permissions.role">;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"plugin::users-permissions.permission", "oneToOne", "admin::user"> &
         Attribute.Private;
      updatedBy: Attribute.Relation<"plugin::users-permissions.permission", "oneToOne", "admin::user"> &
         Attribute.Private;
   };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
   collectionName: "up_roles";
   info: {
      name: "role";
      description: "";
      singularName: "role";
      pluralName: "roles";
      displayName: "Role";
   };
   pluginOptions: {
      "content-manager": {
         visible: false;
      };
      "content-type-builder": {
         visible: false;
      };
   };
   attributes: {
      name: Attribute.String &
         Attribute.Required &
         Attribute.SetMinMaxLength<{
            minLength: 3;
         }>;
      description: Attribute.String;
      type: Attribute.String & Attribute.Unique;
      permissions: Attribute.Relation<
         "plugin::users-permissions.role",
         "oneToMany",
         "plugin::users-permissions.permission"
      >;
      users: Attribute.Relation<"plugin::users-permissions.role", "oneToMany", "plugin::users-permissions.user">;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"plugin::users-permissions.role", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"plugin::users-permissions.role", "oneToOne", "admin::user"> & Attribute.Private;
   };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
   collectionName: "up_users";
   info: {
      name: "user";
      description: "";
      singularName: "user";
      pluralName: "users";
      displayName: "User";
   };
   options: {
      draftAndPublish: false;
      timestamps: true;
   };
   attributes: {
      username: Attribute.String &
         Attribute.Required &
         Attribute.Unique &
         Attribute.SetMinMaxLength<{
            minLength: 3;
         }>;
      email: Attribute.Email &
         Attribute.Required &
         Attribute.SetMinMaxLength<{
            minLength: 6;
         }>;
      provider: Attribute.String;
      password: Attribute.Password &
         Attribute.Private &
         Attribute.SetMinMaxLength<{
            minLength: 6;
         }>;
      resetPasswordToken: Attribute.String & Attribute.Private;
      confirmationToken: Attribute.String & Attribute.Private;
      confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
      blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
      role: Attribute.Relation<"plugin::users-permissions.user", "manyToOne", "plugin::users-permissions.role">;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"plugin::users-permissions.user", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"plugin::users-permissions.user", "oneToOne", "admin::user"> & Attribute.Private;
   };
}

export interface ApiAboutAbout extends Schema.CollectionType {
   collectionName: "abouts";
   info: {
      singularName: "about";
      pluralName: "abouts";
      displayName: "about";
      description: "";
   };
   options: {
      draftAndPublish: false;
   };
   pluginOptions: {
      i18n: {
         localized: true;
      };
   };
   attributes: {
      description: Attribute.Text &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      image: Attribute.Media &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }>;
      order: Attribute.Integer &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }>;
      lr: Attribute.Boolean &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }>;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"api::about.about", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"api::about.about", "oneToOne", "admin::user"> & Attribute.Private;
      localizations: Attribute.Relation<"api::about.about", "oneToMany", "api::about.about">;
      locale: Attribute.String;
   };
}

export interface ApiBlogBlog extends Schema.CollectionType {
   collectionName: "blogs";
   info: {
      singularName: "blog";
      pluralName: "blogs";
      displayName: "blog";
   };
   options: {
      draftAndPublish: false;
   };
   pluginOptions: {
      i18n: {
         localized: true;
      };
   };
   attributes: {
      image: Attribute.Media &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }>;
      title: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      post: Attribute.Blocks &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"api::blog.blog", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"api::blog.blog", "oneToOne", "admin::user"> & Attribute.Private;
      localizations: Attribute.Relation<"api::blog.blog", "oneToMany", "api::blog.blog">;
      locale: Attribute.String;
   };
}

export interface ApiCalendarCalendar extends Schema.CollectionType {
   collectionName: "calendars";
   info: {
      singularName: "calendar";
      pluralName: "calendars";
      displayName: "Calendar";
      description: "";
   };
   options: {
      draftAndPublish: false;
   };
   attributes: {
      calendatID: Attribute.String;
      publicKey: Attribute.String;
      category: Attribute.String;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"api::calendar.calendar", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"api::calendar.calendar", "oneToOne", "admin::user"> & Attribute.Private;
   };
}

export interface ApiDetailDetail extends Schema.SingleType {
   collectionName: "details";
   info: {
      singularName: "detail";
      pluralName: "details";
      displayName: "details";
      description: "";
   };
   options: {
      draftAndPublish: false;
   };
   pluginOptions: {
      i18n: {
         localized: true;
      };
   };
   attributes: {
      tel1: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }>;
      tel2: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }>;
      weekday: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      weekend: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      orgName: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      address: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"api::detail.detail", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"api::detail.detail", "oneToOne", "admin::user"> & Attribute.Private;
      localizations: Attribute.Relation<"api::detail.detail", "oneToMany", "api::detail.detail">;
      locale: Attribute.String;
   };
}

export interface ApiFormForm extends Schema.CollectionType {
   collectionName: "forms";
   info: {
      singularName: "form";
      pluralName: "forms";
      displayName: "form";
      description: "";
   };
   options: {
      draftAndPublish: false;
   };
   attributes: {
      expired_at: Attribute.Date & Attribute.Required;
      is_saved: Attribute.Boolean;
      inn: Attribute.UID & Attribute.Required;
      docs: Attribute.Media & Attribute.Required;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"api::form.form", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"api::form.form", "oneToOne", "admin::user"> & Attribute.Private;
   };
}

export interface ApiGalleryGallery extends Schema.CollectionType {
   collectionName: "galleries";
   info: {
      singularName: "gallery";
      pluralName: "galleries";
      displayName: "gallery";
   };
   options: {
      draftAndPublish: false;
   };
   attributes: {
      album: Attribute.Media;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"api::gallery.gallery", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"api::gallery.gallery", "oneToOne", "admin::user"> & Attribute.Private;
   };
}

export interface ApiGroupCategoryGroupCategory extends Schema.CollectionType {
   collectionName: "group_categories";
   info: {
      singularName: "group-category";
      pluralName: "group-categories";
      displayName: "groupCategory";
      description: "";
   };
   options: {
      draftAndPublish: false;
   };
   pluginOptions: {
      i18n: {
         localized: true;
      };
   };
   attributes: {
      category: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      age: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      language: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      image: Attribute.Media &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }>;
      order: Attribute.Integer &
         Attribute.Required &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }>;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"api::group-category.group-category", "oneToOne", "admin::user"> &
         Attribute.Private;
      updatedBy: Attribute.Relation<"api::group-category.group-category", "oneToOne", "admin::user"> &
         Attribute.Private;
      localizations: Attribute.Relation<
         "api::group-category.group-category",
         "oneToMany",
         "api::group-category.group-category"
      >;
      locale: Attribute.String;
   };
}

export interface ApiHeroHero extends Schema.SingleType {
   collectionName: "heroes";
   info: {
      singularName: "hero";
      pluralName: "heroes";
      displayName: "hero";
      description: "";
   };
   options: {
      draftAndPublish: false;
   };
   pluginOptions: {
      i18n: {
         localized: true;
      };
   };
   attributes: {
      title: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      description: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      image: Attribute.Media &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"api::hero.hero", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"api::hero.hero", "oneToOne", "admin::user"> & Attribute.Private;
      localizations: Attribute.Relation<"api::hero.hero", "oneToMany", "api::hero.hero">;
      locale: Attribute.String;
   };
}

export interface ApiHomeGalleryInfoHomeGalleryInfo extends Schema.SingleType {
   collectionName: "home_gallery_infos";
   info: {
      singularName: "home-gallery-info";
      pluralName: "home-gallery-infos";
      displayName: "home gallery info";
   };
   options: {
      draftAndPublish: false;
   };
   pluginOptions: {
      i18n: {
         localized: true;
      };
   };
   attributes: {
      description: Attribute.Text &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      image: Attribute.Media &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }>;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"api::home-gallery-info.home-gallery-info", "oneToOne", "admin::user"> &
         Attribute.Private;
      updatedBy: Attribute.Relation<"api::home-gallery-info.home-gallery-info", "oneToOne", "admin::user"> &
         Attribute.Private;
      localizations: Attribute.Relation<
         "api::home-gallery-info.home-gallery-info",
         "oneToMany",
         "api::home-gallery-info.home-gallery-info"
      >;
      locale: Attribute.String;
   };
}

export interface ApiHomeProgramItemHomeProgramItem extends Schema.CollectionType {
   collectionName: "home_program_items";
   info: {
      singularName: "home-program-item";
      pluralName: "home-program-items";
      displayName: "Home program item";
   };
   options: {
      draftAndPublish: false;
   };
   pluginOptions: {
      i18n: {
         localized: true;
      };
   };
   attributes: {
      title: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      image: Attribute.Media &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }>;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"api::home-program-item.home-program-item", "oneToOne", "admin::user"> &
         Attribute.Private;
      updatedBy: Attribute.Relation<"api::home-program-item.home-program-item", "oneToOne", "admin::user"> &
         Attribute.Private;
      localizations: Attribute.Relation<
         "api::home-program-item.home-program-item",
         "oneToMany",
         "api::home-program-item.home-program-item"
      >;
      locale: Attribute.String;
   };
}

export interface ApiInstructionInstruction extends Schema.SingleType {
   collectionName: "instructions";
   info: {
      singularName: "instruction";
      pluralName: "instructions";
      displayName: "instruction";
   };
   options: {
      draftAndPublish: false;
   };
   pluginOptions: {
      i18n: {
         localized: true;
      };
   };
   attributes: {
      content: Attribute.Text &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"api::instruction.instruction", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"api::instruction.instruction", "oneToOne", "admin::user"> & Attribute.Private;
      localizations: Attribute.Relation<"api::instruction.instruction", "oneToMany", "api::instruction.instruction">;
      locale: Attribute.String;
   };
}

export interface ApiLangLang extends Schema.SingleType {
   collectionName: "langs";
   info: {
      singularName: "lang";
      pluralName: "langs";
      displayName: "lang";
      description: "";
   };
   options: {
      draftAndPublish: true;
   };
   attributes: {
      ky: Attribute.JSON;
      ru: Attribute.JSON;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      publishedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"api::lang.lang", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"api::lang.lang", "oneToOne", "admin::user"> & Attribute.Private;
   };
}

export interface ApiProgramDescriptionProgramDescription extends Schema.SingleType {
   collectionName: "program_descriptions";
   info: {
      singularName: "program-description";
      pluralName: "program-descriptions";
      displayName: "program description";
   };
   options: {
      draftAndPublish: false;
   };
   pluginOptions: {
      i18n: {
         localized: true;
      };
   };
   attributes: {
      description: Attribute.Text &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"api::program-description.program-description", "oneToOne", "admin::user"> &
         Attribute.Private;
      updatedBy: Attribute.Relation<"api::program-description.program-description", "oneToOne", "admin::user"> &
         Attribute.Private;
      localizations: Attribute.Relation<
         "api::program-description.program-description",
         "oneToMany",
         "api::program-description.program-description"
      >;
      locale: Attribute.String;
   };
}

export interface ApiWhyUsWhyUs extends Schema.CollectionType {
   collectionName: "why_uses";
   info: {
      singularName: "why-us";
      pluralName: "why-uses";
      displayName: "WhyUs";
   };
   options: {
      draftAndPublish: false;
   };
   pluginOptions: {
      i18n: {
         localized: true;
      };
   };
   attributes: {
      title: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      order: Attribute.Integer &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }>;
      image: Attribute.Media &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }>;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<"api::why-us.why-us", "oneToOne", "admin::user"> & Attribute.Private;
      updatedBy: Attribute.Relation<"api::why-us.why-us", "oneToOne", "admin::user"> & Attribute.Private;
      localizations: Attribute.Relation<"api::why-us.why-us", "oneToMany", "api::why-us.why-us">;
      locale: Attribute.String;
   };
}

declare module "@strapi/types" {
   export module Shared {
      export interface ContentTypes {
         "admin::permission": AdminPermission;
         "admin::user": AdminUser;
         "admin::role": AdminRole;
         "admin::api-token": AdminApiToken;
         "admin::api-token-permission": AdminApiTokenPermission;
         "admin::transfer-token": AdminTransferToken;
         "admin::transfer-token-permission": AdminTransferTokenPermission;
         "plugin::upload.file": PluginUploadFile;
         "plugin::upload.folder": PluginUploadFolder;
         "plugin::content-releases.release": PluginContentReleasesRelease;
         "plugin::content-releases.release-action": PluginContentReleasesReleaseAction;
         "plugin::i18n.locale": PluginI18NLocale;
         "plugin::users-permissions.permission": PluginUsersPermissionsPermission;
         "plugin::users-permissions.role": PluginUsersPermissionsRole;
         "plugin::users-permissions.user": PluginUsersPermissionsUser;
         "api::about.about": ApiAboutAbout;
         "api::blog.blog": ApiBlogBlog;
         "api::calendar.calendar": ApiCalendarCalendar;
         "api::detail.detail": ApiDetailDetail;
         "api::form.form": ApiFormForm;
         "api::gallery.gallery": ApiGalleryGallery;
         "api::group-category.group-category": ApiGroupCategoryGroupCategory;
         "api::hero.hero": ApiHeroHero;
         "api::home-gallery-info.home-gallery-info": ApiHomeGalleryInfoHomeGalleryInfo;
         "api::home-program-item.home-program-item": ApiHomeProgramItemHomeProgramItem;
         "api::instruction.instruction": ApiInstructionInstruction;
         "api::lang.lang": ApiLangLang;
         "api::program-description.program-description": ApiProgramDescriptionProgramDescription;
         "api::why-us.why-us": ApiWhyUsWhyUs;
      }
   }
}
