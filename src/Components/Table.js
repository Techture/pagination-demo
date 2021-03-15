import React from "react";

const Table = ({ users, loading }) => {
  console.log("User Data >>", users);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const renderTableData = () => {
    console.log("table data");

    return users.map((user, idx) => (
      <tr key={idx}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h1 className="title">Pagination Demo</h1>
      <table className="users">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
          {users && renderTableData()}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
