use("user_management");

// Permissions
db.createCollection("permissions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "description", "created_at"],
      properties: {
        name: {
          bsonType: "string",
        },
        description: {
          bsonType: "string",
        },
        created_at: {
          bsonType: "date",
        },
      },
    },
  },
});
db.permissions.createIndex({ name: 1 }, { unique: true });
db.permissions.insertMany([
  {
    name: "create",
    description: "create sessions for authenticated user",
    created_at: new Date(),
  },
  {
    name: "create-all",
    description: "create permission + create user with any role",
    created_at: new Date(),
  },
  {
    name: "read",
    description: "read data of authenticated user",
    created_at: new Date(),
  },
  {
    name: "read-all",
    description: "read all database data",
    created_at: new Date(),
  },
  {
    name: "update",
    description: "update data of authenticated user",
    created_at: new Date(),
  },
  {
    name: "update-all",
    description: "update all database data",
    created_at: new Date(),
  },
  {
    name: "delete",
    description: "delete data of authenticated user",
    created_at: new Date(),
  },
  {
    name: "delete-all",
    description: "delete all database data",
    created_at: new Date(),
  },
]);

// Roles;
db.createCollection("roles", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "created_at", "permissions"],
      properties: {
        name: {
          bsonType: "string",
        },
        created_at: {
          bsonType: "date",
        },
        permissions: {
          bsonType: "array",
          items: {
            enum: db.permissions.distinct("name"),
          },
        },
      },
    },
  },
});
db.roles.createIndex({ name: 1 }, { unique: true });
db.roles.insertMany([
  {
    name: "admin",
    created_at: new Date(),
    permissions: ["create-all", "read-all", "update-all", "delete-all"],
  },
  {
    name: "viewer",
    created_at: new Date(),
    permissions: ["create", "read-all"],
  },
  {
    name: "user",
    created_at: new Date(),
    permissions: ["create", "read", "update", "delete"],
  },
]);

// Users
function uuidBsonType() {
  return {
    bsonType: "binData",
    properties: {
      subType: {
        enum: ["04"],
      },
    },
  };
}
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["external_id", "email", "password", "created_at", "roles"],
      properties: {
        external_id: uuidBsonType(),
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
            bsonType: ["object"],
            required: ["external_id", "created_at", "expires_at"],
            properties: {
              external_id: uuidBsonType(),
              created_at: {
                bsonType: "date",
              },
              expires_at: {
                bsonType: "date",
              },
            },
          },
        },
        roles: {
          bsonType: "array",
          items: {
            enum: db.roles.distinct("name"),
          },
        },
      },
    },
  },
});
db.users.createIndex({ email: 1, external_id: 1 }, { unique: true });
db.users.createIndex({ external_id: 1 }, { unique: true });
db.users.insertOne({
  external_id: UUID(),
  email: "admin@dev.com",
  // my-admin-password
  password: "$2b$10$oMZXPe6UqWNGZgwyd72uoOMpvDe.t.7ur0zlw8/iADoX3FPRsJnvS",
  created_at: new Date(),
  roles: ["admin"],
});
