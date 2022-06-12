import { Role } from "@prepa-sn/shared/enums";
import { useSelector } from "react-redux";
import AdminProfile from "./admin";
import InstructorProfile from "./instructor";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user);
  if (user.infos.roles.includes(Role.ADMIN)) {
    return <AdminProfile />;
  }

  if (user.infos.roles.includes(Role.INSTRUCTOR)) {
    return <InstructorProfile />;
  }

  return (
    <div>Not known user</div>
  )
}

export default Profile;