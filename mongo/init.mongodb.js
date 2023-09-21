use("user-management");

// Permissions
// db.createCollection("c_permissions", {
//   validator: {
//     $jsonSchema: {
//       bsonType: "object",
//       required: ["name", "description", "created_at"],
//       properties: {
//         name: {
//           bsonType: "string",
//         },
//         description: {
//           bsonType: "string",
//         },
//         created_at: {
//           bsonType: "date",
//         },
//       },
//     },
//   },
// });
// db.c_permissions.createIndex({ name: 1 }, { unique: true });
// db.c_permissions.insertMany([
//   {
//     name: "create",
//     description: "create data",
//     created_at: new Date(),
//   },
//   {
//     name: "read",
//     description: "read data of authenticated user",
//     created_at: new Date(),
//   },
//   {
//     name: "read-all",
//     description: "read all database data",
//     created_at: new Date(),
//   },
//   {
//     name: "update",
//     description: "update data of authenticated user",
//     created_at: new Date(),
//   },
//   {
//     name: "update-all",
//     description: "update all database data",
//     created_at: new Date(),
//   },
//   {
//     name: "delete",
//     description: "delete data of authenticated user",
//     created_at: new Date(),
//   },
//   {
//     name: "delete-all",
//     description: "delete all database data",
//     created_at: new Date(),
//   },
// ]);

// Roles
// db.createCollection("c_roles", {
//   validator: {
//     $jsonSchema: {
//       bsonType: "object",
//       required: ["name", "created_at", "permissions"],
//       properties: {
//         name: {
//           bsonType: "string",
//         },
//         created_at: {
//           bsonType: "date",
//         },
//         permissions: {
//           bsonType: "array",
//           items: {
//             enum: db.c_permissions.distinct("name"),
//           },
//         },
//       },
//     },
//   },
// });
// db.c_roles.createIndex({ name: 1 }, { unique: true });
// db.c_roles.insertMany([
//   {
//     name: "admin",
//     created_at: new Date(),
//     permissions: ["create", "read-all", "update-all", "delete-all"],
//   },
//   {
//     name: "viewer",
//     created_at: new Date(),
//     permissions: ["read-all"],
//   },
//   {
//     name: "user",
//     created_at: new Date(),
//     permissions: ["create", "read", "update", "delete"],
//   },
// ]);
// db.getCollectionInfos({ name: "c_roles" })[0].options.validator;

// // Users
db.createCollection("c_users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["external_id", "email", "password", "created_at"],
      properties: {
        external_id: {
          bsonType: "string",
        },
        email: {
          bsonType: "string",
        },
        password: {
          bsonType: "string",
        },
        created_at: {
          bsonType: "date",
        },
        sessions: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              required: ["external_id", "created_at", "expires_at"],
            },
          },
        },
        roles: {
          bsonType: "array",
          items: {
            enum: db.c_roles.distinct("name"),
          },
        },
      },
    },
  },
});
// db.c_users.createIndex({ external_id: 1 }, { unique: true, requ });
// db.c_users.createIndex({ email: 1 }, { unique: true });
// db.c_users.insertOne({
//   external_id: UUID(),
//   email: "",
// });
