import { useParams } from "react-router-dom";
import { users } from "../../db";

export default function User() {
  const { userId } = useParams();
  return (
    <div>
      <h1>
        User with it {userId} is named: {users[Number(userId) - 1].name}
      </h1>
    </div>
  );
}
