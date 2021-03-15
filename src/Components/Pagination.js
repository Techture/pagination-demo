import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./UserList";
import "./styles.css";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

const Pagination = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(3);

  const [pageNumberLimit, setPageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // create page numbers array from user data and insert usersPerPage
  const pages = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * usersPerPage;
  const indexOfFirstItem = indexOfLastItem - usersPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  // handle page number click
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  // handle previous button
  const handlePrevBtn = (event) => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  // handle next button
  const handleNextBtn = (event) => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  // ellipsis increment button
  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li
        className="load-more-ellipsis"
        onClick={handleNextBtn}
        disabled={currentPage === pages[pages.length - 1] ? true : false}
      >
        &hellip;
      </li>
    );
  }

  // ellipsis decrement button
  let pageDecrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageDecrementBtn = (
      <li
        className="load-more-ellipsis"
        onClick={handlePrevBtn}
        disabled={currentPage === pages[0] ? true : false}
      >
        &hellip;
      </li>
    );
  }

  // render page numbers
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  // handle load first page
  const handleLoadFirst = () => {
    setUsersPerPage(3);
    setCurrentPage(pages[0]);
    // renderPageNumbers;
  };

  // handle load more page
  const handleLoadMore = () => {
    setUsersPerPage(usersPerPage + 3);
  };

  // load user data on start of app
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}`);
      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div className="pagination-wrapper">
      {/* user data */}
      <UserList users={currentUsers} loading={loading} />

      {/* pagination */}
      <ul className="page-numbers">
        <button className="load-more-button" onClick={handleLoadFirst}>
          Load First
        </button>
        <li>
          <button
            onClick={handlePrevBtn}
            disabled={currentPage === pages[0] ? true : false}
          >
            Prev
          </button>
        </li>

        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button
            onClick={handleNextBtn}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
        <button
          className="load-more-button"
          onClick={handleLoadMore}
          disabled={currentPage === pages[pages.length - 1] ? true : false}
        >
          Load More
        </button>
      </ul>
    </div>
  );
};

export default Pagination;