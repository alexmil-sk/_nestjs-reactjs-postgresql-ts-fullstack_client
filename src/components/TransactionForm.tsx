import { FC, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import { ResponseTransactionsLoaderInterface } from "../types/types";
import CategoryModal from "./CategoryModal";

const TransactionForm: FC = () => {
	const { categories } = useLoaderData() as ResponseTransactionsLoaderInterface;
	
	const [visibleModal, setVisibleModal] = useState(false);

  return (
    <div className="rounded-md bg-slate-700 p-4">
      <Form
        className="grid gap-2"
        method="post" //Транзакции здесь мы будем только создавать, а не редактировать
        action="/transactions"
      >
        <label className="grid" htmlFor="title">
          <span>Title</span>
          <input
            type="text"
            className="input bg-slate-600"
            placeholder="Title..."
            name="title"
          />
        </label>
        <label className="grid" htmlFor="amount">
          <span>Amount</span>
          <input
            type="number"
            className="input bg-slate-600"
            placeholder="Amount..."
            name="amount"
            required
          />
        </label>

        {/* Select */}
        {categories.categories.length ? (
          <label htmlFor="category" className="grid">
            <span>Category</span>
            <select name="category" className="input bg-slate-600" required>
              {categories.categories.map((category, idx) => (
                <option value={category.id} key={idx}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <option className="mt-1 text-red-300">No Categories</option>
        )}

        {/* Add Category */}

        <button
          onClick={() => setVisibleModal(true)}
          className="max-w-fit flex mt-2 items-center gap-2 text-white/50 hover:text-white"
        >
          <FaPlus />
          <span>Manage Categories</span>
        </button>

        {/* Radio Buttons */}

        <div className="flex gap-4 items-center">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="type"
              value={"income"}
              className="form-radio text-blue-600 cursor-pointer"
              defaultChecked
            />
            <span>Income</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="type"
              value={"expense"}
              className="form-radio text-blue-600 cursor-pointer"
            />
            <span>Expense</span>
          </label>
        </div>
        {/* Submit Button */}
        <button className="btn btn-green max-w-fit mt-2">Submit</button>
      </Form>
      {/* Add Category Modal */}

      {visibleModal && (
        (<CategoryModal
          type="post"
          setVisibleModal={setVisibleModal}
        />)
      )}
    </div>
  );
};

export default TransactionForm;
