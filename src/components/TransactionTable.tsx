import { FC, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import {
  ResponseTransactionsLoaderInterface,
  TransactionType,
} from "../types/types";
import { formatDate } from "../helpers/date.helper";
import { changeToUSD } from "../helpers/currency.helper";
import { instance } from "../api/axios.api";
import ReactPaginate from "react-paginate";

type TransactionTableProps = {
  limit: number;
};

const TransactionTable: FC<TransactionTableProps> = ({ limit = 3 }) => {
  const { transactions } =
		useLoaderData() as ResponseTransactionsLoaderInterface;
	
  const [data, setData] = useState<TransactionType[]>([]); //,query параметры
  const [currentPage, setCurrentPage] = useState<number>(1); //,текущая страница
	const [totalPages, setTotalPages] = useState<number>(0); //,общее количество страниц
	
  const fetchTransactions = async (page: number) => {
    const response = await instance.get(
      `/transactions/pagination?page=${page}&limit=${limit}`,
		);

    setData(response.data);
    setTotalPages(Math.ceil(transactions.transactions.length / limit));
  };

  const handleChangePage = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage, transactions]);

  return (
    <>
      <ReactPaginate
        className="flex gap-3 justify-end mt-4 items-center"
        activeClassName="bg-blue-600 rounded-sm" //? The classname for the active page. It is concatenated to base class pageClassName.
        pageLinkClassName="flex text-white text-xs py-1 px-2 rounded-sm" //? The classname on tag a of each page element.
        previousClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs" //? The classname on tag li of the previous button.
        nextClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs" //? The classname on tag li of the next button.
        disabledClassName="text-white/50 cursor-not-allowed" //? The classname for disabled previous and next buttons.
        disabledLinkClassName="text-slate-600 cursor-not-allowed" //? The classname on tag a for disabled previous and next buttons.
        pageCount={totalPages}
        pageRangeDisplayed={1} //? The range of pages displayed.
        marginPagesDisplayed={2} //? The number of pages to display for margins.
        onPageChange={handleChangePage}
      />
      <div className="bg-slate-800 px-4 py-3 mt-4 rounded-md">
        <table className="w-full">
          <thead>
            <tr>
              <th>№</th>
              <th>Title</th>
              <th style={{ textAlign: "left" }}>Amount</th>
              <th>Category</th>
              <th>Data</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((transaction, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{transaction.title}</td>
                <td
                  style={{ textAlign: "left" }}
                  className={
                    transaction.type === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {transaction.type === "income"
                    ? `+ ${changeToUSD(transaction.amount)}`
                    : `- ${changeToUSD(transaction.amount)}`}
                </td>
                <td>{transaction.category?.title || "No category"}</td>
                <td>{formatDate(transaction.createdAt)}</td>
                <td>
                  <Form method="delete" action="/transactions">
                    <input
                      type="hidden"
                      name="id"
                      value={transaction.transaction_id}
                    />
                    <button type="submit" className="btn hover:btn-red mx-auto">
                      <FaTrash />
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionTable;
