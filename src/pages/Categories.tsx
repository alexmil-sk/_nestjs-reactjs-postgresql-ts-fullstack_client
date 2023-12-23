import { FC, useState } from "react";
import { AiFillEdit, AiFillCloseCircle } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import CategoryModal from "../components/CategoryModal";
import { instance } from "../api/axios.api";
import { CategoriesInterface } from "../types/types";
import { toast } from "react-toastify";

export const categoriesAction = async ({ request }: any) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const title = {
        category: {
          title: formData.get("title"),
        },
      };

      await instance.post("/categories", title);
      toast.info("Category have been created successfully");

      return null;
    }
    case "PATCH": {
      const formData = await request.formData();

      const newCategory = {
        category: {
          id: formData.get("id"),
          title: formData.get("title"),
        },
      };

      await instance.patch(
        `/categories/category/${newCategory.category.id}`,
        newCategory,
      );
      toast.info("Category have been updated successfully");

      return null;
    }
    case "DELETE": {
      const formData = await request.formData();
      const categoryId = formData.get("id");

      try {
        await instance.delete(`/categories/category/${categoryId}`);
        toast.info("Category have been deleted successfully");
      } catch (err: any) {
        const errors = err.response.data.errors;
        toast.error(errors.message);
      }
      return null;
    }
  }
};

export const categoriesLoader = async () => {
  try {
		const { data } = await instance.get<CategoriesInterface>("categories");
    return data;
  } catch (err: any) {
    toast.error(err.response.data.errors.message);
  }
};

const Categories: FC = () => {
	const { categories } = (useLoaderData() as CategoriesInterface);


  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [categoryTitle, setCategoryTitle] = useState<string>("");

  return (
    <>
      <div className="mt-10 p-4 rounded-md bg-slate-800">
        <h1>Your category list:</h1>
        {/* Category list */}
        <div className="flex mt-2 items-center gap-2 flex-wrap">
          {categories?.map((category, idx) => (
              <div
                key={idx}
                className="group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2"
              >
                {category.title}
                <div className="hidden cursor-pointer absolute px-3 left-0 top-0 bottom-0 right-0  rounded-lg bg-black/90 items-center justify-between group-hover:flex">
                  <button
                    onClick={() => {
                      setIsEdit(true);
                      setCategoryId(category.id);
                      setCategoryTitle(category.title);
                    }}
                    className="hover:rounded-sm hover:bg-orange-700"
                  >
                    <AiFillEdit />
                  </button>
                  <Form className="flex" method="delete" action="/categories">
                    <input type="hidden" value={category.id} name="id" />
                    <button
                      type="submit"
                      className="hover:rounded-[50%] hover:bg-red-500"
                    >
                      <AiFillCloseCircle />
                    </button>
                  </Form>
                </div>
              </div>
						))}
        </div>
        {/* Add Category */}
        <button
          onClick={() => setVisibleModal(true)}
          className="max-w-fit flex mt-5 items-center gap-2 text-white/50 hover:text-white"
        >
          <FaPlus />
          <span>Create a new category</span>
        </button>
      </div>

      {/* Add Category Modal */}
      {visibleModal && (
        <CategoryModal
          type="post"
          id={categoryId}
          setVisibleModal={setVisibleModal}
        />
      )}

      {/* Edit Category Modal */}
      {isEdit && (
        <CategoryModal
          type="patch"
          id={categoryId}
          setVisibleModal={setIsEdit}
          categoryTitle={categoryTitle}
        />
      )}
    </>
  );
};
export default Categories;
