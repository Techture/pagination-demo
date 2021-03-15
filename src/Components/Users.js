import React from "react";
import "./styles.css";

const Users = ({ user }) => {
  return (
    <tbody>
      <tr className="user-list" key={user.id}>
        <td>{user.id}</td>
        <td>
          <strong>Name: </strong> {user.name}
        </td>
        <td>
          <strong>Username: </strong> {user.username}
        </td>
        <td>
          <strong>Email: </strong>
          {user.email}
        </td>
      </tr>
    </tbody>
  );
};

export default Users;
