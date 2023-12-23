export interface UserInterface {
  id: number;
  username: string;
  email: string;
  token: string;
}

export type UserProfileType = { data: Omit<UserInterface, "token"> };
export interface UserResponseLoginInterface {
  user: UserInterface;
}
export interface UserStateInterface {
  user: UserInterface | null;
  isAuth: boolean;
}
export interface UserDataInterface {
  username: string;
  email: string;
  password: string;
}
export interface UserResponseInterface {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
export interface UserDataResponseInterface {
  token: string;
  user: UserResponseInterface;
}

export type CategoryType = {
  id: number;
  title: string;
  transactions?: [];
  user_id: number;
  createdAt?: string;
  updatedAt?: string;
};
export interface CategoriesInterface {
  categories: CategoryType[] | null;
}

export type TransactionType = {
  transaction_id: number;
  title: string;
  type: string;
  amount: number;
  category: CategoryType;
  createdAt: string;
  updatedAt: string;
  user: UserInterface;
};

export interface TransactionsInterface {
  transactions: TransactionType[] | null;
} 

export interface ResponseTransactionsLoaderInterface {
  categories: {
    categories: CategoryType[];
  };
  transactions: {
    transactions: TransactionType[];
  };
	totalIncome: {
		total: number;
	};
	totalExpense: {
		total: number;
	};
}




