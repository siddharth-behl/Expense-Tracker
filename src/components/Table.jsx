import React, { useEffect, useRef, useState } from "react";
import useSum from "../hooks/useSum.jsx";
import useFilter from "../hooks/useFilter.jsx";
import ContextMenu from "./ContextMenu.jsx";
import useLocalStorage from "../hooks/useLocalStorage.jsx";

export default function Table({ expenses, setExpenses, all, setAll }) {
  const [menuPosition, setMenuPosition] = useState({});
  const [sortCallback, setSortCallback] = useLocalStorage(
    "sortCallback",
    () => () => {
      return { num: null, sorter: () => {} };
    }
  );

  const rowID = useRef();
  function handleChange(e) {
    setTypeFilter(e.target.value);
  }

  let [FilteredData, setTypeFilter] = useFilter(
    expenses,
    (data) => data.category
  );

  return (
    <>
      <ContextMenu
        menuPosition={menuPosition}
        setMenuPosition={setMenuPosition}
        rowID={rowID}
        setExpenses={setExpenses}
        expenses={expenses}
        all={all}
        setAll={setAll}
      />
      <table
        className="expense-table"
        onClick={() => {
          if (menuPosition.left) setMenuPosition({});
        }}
      >
        <thead>
          <tr>
            <th>
              <span>Title</span>

              {sortCallback().num !== 1 ? (
                <svg
                  onClick={() =>
                    setSortCallback(() => () => {
                      return {
                        num: 1,
                        sorter: (a, b) => {
                          return a.title.localeCompare(b.title);
                        },
                      };
                    })
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                >
                  <title>Convert to Ascending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              ) : (
                <svg
                  onClick={() =>
                    setSortCallback(() => () => {
                      return {
                        num: 2,
                        sorter: (a, b) => {
                          return b.title.localeCompare(a.title);
                        },
                      };
                    })
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                >
                  <title>Convert to Descending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
              )}
            </th>
            <th>
              <select className="menu" onChange={handleChange}>
                <option value="">All</option>
                <option value="No Category">No Category</option>
                <option value="Grocery">Grocery</option>
                <option value="Clothes">Clothes</option>
                <option value="Bills">Bills</option>
                <option value="Education">Education</option>
                <option value="Medicine">Medicine</option>
              </select>
            </th>
            <th className="amount-column">
              <div>
                <span>Amount</span>

                {sortCallback().num !== 3 ? (
                  <svg
                    onClick={() => {
                      setSortCallback(() => () => {
                        return {
                          num: 3,
                          sorter: (a, b) => a.Amount - b.Amount,
                        };
                      });
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    viewBox="0 0 384 512"
                    className="arrow down-arrow"
                  >
                    <title>Convert to Ascending</title>
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                ) : (
                  <svg
                    onClick={() => {
                      setSortCallback(() => () => {
                        return {
                          num: 4,
                          sorter: (a, b) => b.Amount - a.Amount,
                        };
                      });
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    viewBox="0 0 384 512"
                    className="arrow up-arrow"
                  >
                    <title>Convert to Descending</title>
                    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                  </svg>
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.length == 0 || FilteredData.length == 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No data Available
              </td>
            </tr>
          ) : (
            <>
              {FilteredData.sort(sortCallback().sorter).map((data) => {
                {
                  return (
                    <tr
                      key={data.id}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setMenuPosition({
                          left: e.clientX,
                          top: e.clientY,
                        });

                        rowID.current = data.id;
                      }}
                    >
                      <>
                        <td>{data.title}</td>
                        <td>{data.category}</td>
                        <td>
                          ₹{parseFloat(data.Amount).toLocaleString("en-IN")}
                        </td>
                      </>
                    </tr>
                  );
                }
              })}
              <tr>
                <td>Total</td>
                <td
                  className="clear-sort"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setSortCallback(() => () => {
                      return { num: null, sorter: () => {} };
                    })
                  }
                >
                  Clear Sort
                </td>
                <td>₹{useSum(FilteredData).toLocaleString("en-IN")}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </>
  );
}
