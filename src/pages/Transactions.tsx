import { FC } from "react";
import TransactionForm from "../components/TransactionForm";
import { instance } from "../api/axios.api";
import { CategoriesInterface, ResponseTransactionsLoaderInterface, TransactionsInterface } from "../types/types";
import { toast } from "react-toastify";
import TransactionTable from "../components/TransactionTable";
import { useLoaderData } from "react-router-dom";
import { changeToUSD } from "../helpers/currency.helper";
import Chart from "../components/Chart";

export const transactionsLoader = async () => {
  const categories = await instance.get<CategoriesInterface>("/categories");
  const transactions =
		await instance.get<TransactionsInterface>("transactions");
	const totalIncome = await instance.get<number>(`/transactions/income/total`);
	const totalExpense = await instance.get<number>(`/transactions/expense/total`);
	
  const data = {
    categories: categories.data,
		transactions: transactions.data,
		totalIncome: totalIncome.data,
		totalExpense: totalExpense.data
  };
  return data;
};

export const transactionsAction = async ({ request }: any) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();

      const newTransaction = {
        transaction: {
          title: formData.get("title"),
          amount: +formData.get("amount"),
          category: formData.get("category"),
          type: formData.get("type"),
          user: {}, //вставляется автоматически текущий пользователь
        },
      };

      await instance.post("/transactions", newTransaction);
      toast.info("Transaction have been created successfully");
      return null;
    }
    case "DELETE": {
      const formData = await request.formData();

      const transaction_id = formData.get("id");
      await instance.delete(`/transactions/transaction/${transaction_id}`);
      toast.info("Transaction has been deleted successfully");

      return null;
    }
  }
};

const Transactions: FC = () => {

	const { totalIncome, totalExpense } =
    useLoaderData() as ResponseTransactionsLoaderInterface;


  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-4 items-start">
        {/* Add Transaction form */}
        <div className="col-span-2 grid">
          <TransactionForm />
        </div>
        {/* Statistic blocks */}
        <div className="rounded-md bg-slate-800 p-3 min-w-[150px]">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="uppercase text-md font-bold text-center">
                Total Income:
              </p>
              <p className="bg-green-600 p-1 rounded-sm text-center mt-2">
                {changeToUSD(totalIncome.total)}
              </p>
            </div>
            <div>
              <p className="uppercase text-md font-bold text-center">
                Total Expense:
              </p>
              <p className="bg-red-600 p-1 rounded-sm text-center mt-2">
                {changeToUSD(totalExpense.total)}
              </p>
            </div>
          </div>
          <Chart totalIncome={totalIncome.total} totalExpense={totalExpense.total} />
        </div>
      </div>
      {/* Result table */}
      <h1 className="my-5">
        <TransactionTable limit={5} />
      </h1>
    </>
  );
};

export default Transactions;
