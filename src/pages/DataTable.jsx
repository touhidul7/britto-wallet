/* eslint-disable react/no-children-prop */
import { useDispatch } from "react-redux";
import { deleteData } from "../redux/productSlice";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useState } from "react";

/* eslint-disable react/prop-types */
const DataTable = ({ tabledata, type }) => {
  const dispatch = useDispatch();

  /* Pagination------------------------->>> */
  const itemsPerPage = 5; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1); // State for current page

  const lastIndex = currentPage * itemsPerPage; // Calculate last index for slicing
  const firstIndex = lastIndex - itemsPerPage; // Calculate first index for slicing
  const currentItems = tabledata.slice(firstIndex, lastIndex); // Get current items for the page
  const totalPages = Math.ceil(tabledata.length / itemsPerPage); // Calculate total pages

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  /* Pagination Ends Here------------------------->>> */

  return (
    <div style={{ marginTop: "-110px", paddingBottom: "60px" }}>
      <div className="relative overflow-x-auto shadow-md rounded-md mx-4">
        <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100 ">
          <thead className="text-xs dark:text-white uppercase dark:bg-gray-500 bg-gray-300 text-black text-center rounded-t-md">
            <tr>
              <th scope="col" className="px-3 py-3 ">
                Purpose
              </th>
              <th scope="col" className="px-3 py-3">
                Amount
              </th>
              <th scope="col" className="px-3 py-3">
                {type ? "Month" : "Date"}
              </th>
              <th scope="col" className="px-3 py-3">
                Action
              </th>
            </tr>
          </thead>

          {/* Data to show with pagination */}
          {currentItems.length > 0 ? (
            <tbody>
              {currentItems.map((income, index) => (
                <tr
                  key={index}
                  className="dark:bg-gray-800 border-b text-black dark:text-white dark:border-gray-900 blue-400 text-center"
                >
                  <th
                    scope="row"
                    style={{ wordWrap: "break-word" }}
                    className="px-2 py-4 dark:bg-gray-800 bg-gray-100 text-black dark:text-white  max-w-20"
                  >
                    <Tooltip
                      text={
                        <>
                          <div className="flex flex-col">
                            {income.source}
                            <span
                              className={`${
                                income.type === "Expense"
                                  ? "text-red-500"
                                  : "text-green"
                              }`}
                            >
                              {income.type}
                            </span>
                          </div>
                        </>
                      }
                      children={income.note}
                    />
                  </th>
                  <td
                    style={{ wordWrap: "break-word" }}
                    className="px-2 py-4 dark:bg-gray-700 max-w-16"
                  >
                    {income.amount}
                  </td>
                  <td className="px-2 py-4 dark:bg-gray-800 bg-gray-100 text-black dark:text-white">
                    {income.type === "Budget" ? income.month : income.date}
                  </td>

                  <td className="pr-4 py-4 dark:bg-gray-800 bg-gray-100 text-black dark:text-white ">
                    <button
                      onClick={() =>
                        dispatch(
                          deleteData({
                            id: income.id,
                          })
                        )
                      }
                      className="userButton rounded cursor-pointer"
                    >
                      <Trash2 className="text-red-500" size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tr className=" text-center">
              <td
                colSpan="4"
                className="px-6 py-4 text-center font-bold text-lg dark:text-gray-300 text-gray-800"
              >
                No Transaction available
              </td>
            </tr>
          )}
        </table>

        {currentItems.length > 0 ? (
          <>
            {/* Pagination------------ */}
            <div className="dark:text-white flex justify-center items-center gap-4 p-2 mt-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`${currentPage === 1 ? "dark:text-gray-600 text-gray-400" : "text-gray-700 dark:text-gray-300"}`}
              >
                <ChevronLeft />
              </button>
              <span>{`${currentPage} of ${totalPages}`}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`${
                  currentPage === totalPages ? "dark:text-gray-600 text-gray-400" : "text-gray-700 dark:text-gray-300"}`}
              >
                <ChevronRight />
              </button>
            </div>
          </>
        ) : (
          ""
        )}
        <></>
      </div>
    </div>
  );
};

export default DataTable;

const Tooltip = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative flex justify-center items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {text}
      {isVisible && (
        <div>
          <div className="absolute max-w-44 bottom-[40px] ml-2 transform -translate-x-1/2 dark:bg-gray-700 bg-gray-200 py-2 px-4 rounded-md border-transparent border-t-gray-800">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
