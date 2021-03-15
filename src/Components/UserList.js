import React from "react";
import Users from "../Components/Users";

const UserList = ({ users, loading }) => {
  if (loading) {
    return <h2 className="loading-msg">Loading...</h2>;
  }
  return (
    <div>
      {users.map((user) => (
        <Users user={user} key={user.id} />
      ))}
    </div>
  );
};

export default UserList;
