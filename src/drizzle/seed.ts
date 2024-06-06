import "dotenv/config";

import { faker } from "@faker-js/faker";

import db from "./db";

import {
  Address,
  MenuItem,
  City,
  Category,
  OrderMenuItem,
  State,
  Restaurant,
  RestaurantOwner,
  Users,
  Orders,
  Driver,
  OrderStatus,
  StatusCatalog,
  Comment,
} from "./schema";
