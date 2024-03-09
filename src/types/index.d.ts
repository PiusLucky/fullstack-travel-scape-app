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
