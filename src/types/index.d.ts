declare type CreateUserParams = {
  name: string;
  email: string;
  password: string;
};

declare type UpdateUserParams = {
  name: string;
  email: string;
  credit: number;
  suspended: string;
};

declare type CreateTransactionData = {
  userId: Types.ObjectId;
  source: "CREDIT" | "ORDER";
  source_id: string;
  amount: number;
  status?: "PENDING" | "SUCCESS" | "FAIL";
};

declare type UpdateTransactionData = {
  userId: Types.ObjectId;
  source: "CREDIT" | "ORDER";
  source_id: string;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAIL";
};

declare type PackageData = {
  name: string;
  image: string;
  per_person_price_in_credit: number;
  location: string;
  total_days: number;
  total_people_allowed: number;
  status?: "PENDING" | "SUCCESS" | "FAIL";
  average_rating?: number;
  total_rating?: number;
};

declare type OrderData = {
  userId: Types.ObjectId;
  packageId: Types.ObjectId;
  status: "PENDING" | "SUCCESS" | "FAIL";
  rate?: 1 | 2 | 3 | 4 | 5 | 6;
};

declare type CheckoutTransactionParams = {
  plan: string;
  credits: number;
  amount: number;
  userId: string;
};

export interface IStatistics {
  orders?: Orders;
  totalPackages?: number;
  totalTransactions?: number;
}

export interface Orders {
  totalCount?: number;
  totalOrderAmount?: number;
}

export interface IChart {
  Jan?: string;
  Feb?: number;
  Mar?: number;
  Apr?: number;
  May?: number;
  Jun?: number;
  Jul?: number;
  Aug?: number;
  Sep?: number;
  Oct?: number;
  Nov?: number;
  Dec?: number;
}

export interface IOrderResponse {
  _id?: string;
  userId?: CreateUserParams;
  packageId?: PackageData;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITransactionResponse {
  _id?: string;
  userId?: string;
  source?: string;
  source_id?: string;
  amount?: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

declare interface IPackagesResponse {
  _id?: string;
  name?: string;
  image?: string;
  per_person_price_in_credit?: number;
  location?: string;
  total_days?: number;
  total_people_allowed?: number;
  status?: boolean;
  average_rating?: number;
  total_rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
