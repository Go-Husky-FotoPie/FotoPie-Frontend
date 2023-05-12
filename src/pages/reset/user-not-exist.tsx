import UserNotExist from "../../components/Reset/UserNotExist";
import NavBar from "../../components/NavBar/NavBar";
import { NavBarStyles } from "../../components/NavBar/NavbarBaseline.style";

const userNotExist: React.FC = () => {
  return (
    <>
      <NavBar isFixed={false} color="#000000" baseLine={NavBarStyles} />
      <UserNotExist />
    </>
  );
};

export default userNotExist;
