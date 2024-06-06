import {
  pgTable,
  serial,
  uuid,
  varchar,
  text,
  integer,
  decimal,
  date,
  timestamp,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

//1.Restaurant table
export const Restaurant = pgTable("restaurant", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  street_address: varchar("street_address", { length: 255 }).notNull(),
  zip_code: varchar("zip_code", { length: 50 }).notNull(),
  //foreign key referencing to city table
  city_id: uuid("city_id").references(() => City.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

//2.City Table
export const City = pgTable("city", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  state_id: uuid("state_id").references(() => State.id, {
    onDelete: "cascade",
  }),
});

//3.State Table
export const State = pgTable("state", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 10 }).notNull(),
});

//4.Address Table
export const Address = pgTable("address", {
  id: uuid("id").primaryKey().defaultRandom(),
  street_address_1: varchar("street_address_1", { length: 255 }).notNull(),
  street_address_2: varchar("street_address_2", { length: 255 }),
  zip_code: varchar("zip_code", { length: 50 }).notNull(),
  delivery_instructions: text("delivery_instructions"),
  user_id: uuid("user_id").references(() => Users.id, { onDelete: "cascade" }),
  city_id: uuid("city_id").references(() => City.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

//5.Restorant Owner Table
export const RestaurantOwner = pgTable("restaurant_owner", {
  id: uuid("id").primaryKey().defaultRandom(),
  restaurant_id: uuid("restaurant_id").references(() => Restaurant.id, {
    onDelete: "cascade",
  }),
  owner_id: uuid("owner_id").references(() => Users.id, {
    onDelete: "cascade",
  }),
});

//6.Users Table
export const Users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  contact_phone: varchar("contact_phone", { length: 20 }),
  phone_verified: boolean("phone_verified").default(false),
  email: varchar("email", { length: 255 }).notNull(),
  email_verified: boolean("email_verified").default(false),
  confirmation_code: varchar("confirmation_code", { length: 6 }),
  password: varchar("password", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

//7.Driver Table
export const Driver = pgTable("driver", {
  id: uuid("id").primaryKey().defaultRandom(),
  car_make: varchar("car_make", { length: 255 }).notNull(),
  car_model: varchar("car_model", { length: 255 }).notNull(),
  car_year: integer("car_year").notNull(),
  user_id: uuid("user_id").references(() => Users.id, { onDelete: "cascade" }),
  online: boolean("online").default(false),
  delivering: boolean("delivering").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

//8.Menu Item Table
export const MenuItem = pgTable("menu_item", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  restaurant_id: uuid("restaurant_id").references(() => Restaurant.id, {
    onDelete: "cascade",
  }),
  category_id: uuid("category_id").references(() => Category.id, {
    onDelete: "cascade",
  }),
  description: text("description").notNull(),
  ingredients: text("ingredients").notNull(),
  price: decimal("price").notNull(),
  active: boolean("active").default(true),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

//9.Category Table
export const Category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
});

//10.Orders Table
export const Orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  restaurant_id: uuid("restaurant_id").references(() => Restaurant.id, {
    onDelete: "cascade",
  }),
  estimated_delivery_time: timestamp("estimated_delivery_time"),
  actual_delivery_time: timestamp("actual_delivery_time"),
  delivery_address_id: uuid("delivery_address_id").references(
    () => Address.id,
    { onDelete: "cascade" }
  ),
  user_id: uuid("user_id").references(() => Users.id, { onDelete: "cascade" }),
  driver_id: uuid("driver_id").references(() => Driver.id, {
    onDelete: "cascade",
  }),
  price: decimal("price").notNull(),
  discount: decimal("discount"),
  final_price: decimal("final_price").notNull(),
  comment: text("comment"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

//11.Order Menu Item Table
export const OrderMenuItem = pgTable("order_menu_item", {
  id: uuid("id").primaryKey().defaultRandom(),
  order_id: uuid("order_id").references(() => Orders.id, {
    onDelete: "cascade",
  }),
  menu_item_id: uuid("menu_item_id").references(() => MenuItem.id, {
    onDelete: "cascade",
  }),
  quanlity: integer("quality").notNull(),
  item_price: decimal("item_price").notNull(),
  price: decimal("price").notNull(),
  comment: text("comment"),
});

//12. Order Status Table
export const OrderStatus = pgTable("order_status", {
  id: uuid("id").primaryKey().defaultRandom(),
  order_id: uuid("order_id").references(() => Orders.id, {
    onDelete: "cascade",
  }),
  status_catalog_id: uuid("status_catalog_id").references(
    () => StatusCatalog.id,
    { onDelete: "cascade" }
  ),
  created_at: timestamp("created_at").defaultNow(),
});

//13.Status Catalog Table
export const StatusCatalog = pgTable("status_catalog", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
});

//14.Comment Table
export const Comment = pgTable("comment", {
  id: uuid("id").primaryKey().defaultRandom(),
  order_id: uuid("order_id").references(() => Orders.id, {
    onDelete: "cascade",
  }),
  user_id: uuid("user_id").references(() => Users.id, { onDelete: "cascade" }),
  comment_text: text("comment_text").notNull(),
  is_complaint: boolean("is_complaint").default(false),
  is_praise: boolean("is_praise").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const RestaurantOwnerRole = pgEnum("restaurant_owner role", [
  "OWNER",
  "MANAGER",
  "STAFF",
  "DELIVERY",
]);
//relations

export const restaurantRelations = relations(Restaurant, ({ many, one }) => ({
  menuItems: many(MenuItem),
  orders: many(Orders),
  city: one(City, {
    fields: [Restaurant.city_id],
    references: [City.id],
  }),
  owners: many(RestaurantOwner),
}));

export const cityRelations = relations(City, ({ many, one }) => ({
  state: one(State, {
    fields: [City.state_id],
    references: [State.id],
  }),
  addresses: many(Address),
  restaurants: many(Restaurant),
}));

export const stateRelations = relations(State, ({ many }) => ({
  cities: many(City),
}));

export const addressRelations = relations(Address, ({ one, many }) => ({
  city: one(City, {
    fields: [Address.city_id],
    references: [City.id],
  }),
  user: one(Users, {
    fields: [Address.user_id],
    references: [Users.id],
  }),
  orders: many(Orders),
}));

export const restaurantOwnerRelations = relations(
  RestaurantOwner,
  ({ one }) => ({
    user: one(Users, {
      fields: [RestaurantOwner.owner_id],
      references: [Users.id],
    }),
    restaurant: one(Restaurant, {
      fields: [RestaurantOwner.restaurant_id],
      references: [Restaurant.id],
    }),
  })
);

export const userRelations = relations(Users, ({ many }) => ({
  addresses: many(Address),
  comments: many(Comment),
  drivers: many(Driver),
  orders: many(Orders),
  restaurantOwners: many(RestaurantOwner),
}));

export const driverRelations = relations(Driver, ({ one, many }) => ({
  user: one(Users, {
    fields: [Driver.user_id],
    references: [Users.id],
  }),
  orders: many(Orders),
}));

export const menuItemRelations = relations(MenuItem, ({ one, many }) => ({
  restaurant: one(Restaurant, {
    fields: [MenuItem.restaurant_id],
    references: [Restaurant.id],
  }),
  category: one(Category, {
    fields: [MenuItem.category_id],
    references: [Category.id],
  }),
  orderMenuItems: many(OrderMenuItem),
}));

export const categoryRelations = relations(Category, ({ many }) => ({
  menuItems: many(MenuItem),
}));

export const orderRelations = relations(Orders, ({ one, many }) => ({
  restaurant: one(Restaurant, {
    fields: [Orders.restaurant_id],
    references: [Restaurant.id],
  }),
  deliveryAddress: one(Address, {
    fields: [Orders.delivery_address_id],
    references: [Address.id],
  }),
  user: one(Users, {
    fields: [Orders.user_id],
    references: [Users.id],
  }),
  driver: one(Driver, {
    fields: [Orders.driver_id],
    references: [Driver.id],
  }),
  comments: many(Comment),
  orderMenuItems: many(OrderMenuItem),
  orderStatuses: many(OrderStatus),
}));

export const orderMenuItemRelations = relations(OrderMenuItem, ({ one }) => ({
  menuItem: one(MenuItem, {
    fields: [OrderMenuItem.menu_item_id],
    references: [MenuItem.id],
  }),
  order: one(Orders, {
    fields: [OrderMenuItem.order_id],
    references: [Orders.id],
  }),
}));

export const orderStatusRelation = relations(OrderStatus, ({ one }) => ({
  order: one(Orders, {
    fields: [OrderStatus.order_id],
    references: [Orders.id],
  }),
  statusCatalog: one(StatusCatalog, {
    fields: [OrderStatus.status_catalog_id],
    references: [StatusCatalog.id],
  }),
}));

export const statusCatalogRelations = relations(StatusCatalog, ({ many }) => ({
  orderStatuses: many(OrderStatus),
}));

export const commentRelation = relations(Comment, ({ one }) => ({
  order: one(Orders, {
    fields: [Comment.order_id],
    references: [Orders.id],
  }),
  user: one(Users, {
    fields: [Comment.user_id],
    references: [Users.id],
  }),
}));

export type TIRestaurant = typeof Restaurant.$inferInsert;
export type TSRestaurant = typeof Restaurant.$inferSelect;
//
export type TICity = typeof City.$inferInsert;
export type TSCity = typeof City.$inferSelect;

export type TIState = typeof State.$inferInsert;
export type TSState = typeof State.$inferSelect;

export type TIAddress = typeof Address.$inferInsert;
export type TSAddress = typeof Address.$inferSelect;

export type TIRestaurantOwner = typeof RestaurantOwner.$inferInsert;
export type TSRestaurantOwner = typeof RestaurantOwner.$inferSelect;

export type TIUser = typeof Users.$inferInsert;
export type TSUser = typeof Users.$inferSelect;

export type TIDriver = typeof Driver.$inferInsert;
export type TSDriver = typeof Driver.$inferSelect;

export type TIMenuItem = typeof MenuItem.$inferInsert;
export type TSMenuItem = typeof MenuItem.$inferSelect;

export type TICategory = typeof Category.$inferInsert;
export type TSCategory = typeof Category.$inferSelect;

export type TIOrder = typeof Orders.$inferInsert;
export type TSOrder = typeof Orders.$inferSelect;

export type TIOrderMenuItem = typeof OrderMenuItem.$inferInsert;
export type TSOrderMenuItem = typeof OrderMenuItem.$inferSelect;

export type TIOrderStatus = typeof OrderStatus.$inferInsert;
export type TSOrderStatus = typeof OrderStatus.$inferSelect;

export type TIStatusCatalog = typeof StatusCatalog.$inferInsert;
export type TSStatusCatalog = typeof StatusCatalog.$inferSelect;

export type TIComment = typeof Comment.$inferInsert;
export type TSComment = typeof Comment.$inferSelect;
