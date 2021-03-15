import React from "react";
import "./styles.css";

const Users = ({ user }) => {
  return (
    <div>
      <ul className="user-list" key={user.id}>
        <li>{user.id}</li>
        <li>
          <strong>Name: </strong> {user.name}
        </li>
        <li>
          <strong>Username: </strong> {user.username}
        </li>
        <li>
          <strong>Email: </strong>
          {user.email}
        </li>
      </ul>
    </div>
  );
};

export default Users;
