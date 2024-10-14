/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import SelectedCal from "./SelectedCal";
import DataTable from "../pages/DataTable";
import { useEffect, useState } from "react";

export default function SelectedDate({ incomeList, expenseList, range }) {
    console.log("From Date:", range.fromDate);
    console.log("To Date  :", range.toDate);

    /* Table Data------------- */
    const tableincomeList = useSelector((state) => state.personalBanking.addIncome);
    const tableexpenseList = useSelector((state) => state.personalBanking.addExpense);

    // Merging income and expense lists with type
    const mergedList = [
        ...tableincomeList.map((item) => ({ ...item, type: "Income" })),
        ...tableexpenseList.map((item) => ({ ...item, type: "Expense" })),
    ];

    /* Income and Expense--------------- */
    const totalIncome = incomeList.reduce((acc, income) => acc + Number(income.amount), 0);
    const totalExpense = expenseList.reduce((acc, expense) => acc + Number(expense.amount), 0);


   /* ======================Filter====================== */
  const [filteredList, setFilteredList] = useState([]);
  const dateRange = useSelector((state) => state.personalBanking.range);
  useEffect(() => {
    const fromDate = new Date(dateRange.fromDate);
    const toDate = new Date(dateRange.toDate);

    const newFilteredList = mergedList.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= fromDate && itemDate <= toDate;
    });

    setFilteredList(newFilteredList);/* .length > 0 ? newFilteredList : mergedList */
  }, [dateRange, incomeList, expenseList]);

    return (
        <div className="flex flex-col gap-6">
            <SelectedCal income={totalIncome} expense={totalExpense} />
            <DataTable tabledata={filteredList} />
        </div>
    );
}
