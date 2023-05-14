import InvalidToken from "../../components/Reset/InvalidToken";
import NavBar from "../../components/NavBar/NavBar";
import { NavBarStyles } from "../../components/NavBar/NavbarBaseline.style";

const invalidToken: React.FC = () => {
  return (
    <>
      <NavBar isFixed={false} color="#000000" baseLine={NavBarStyles} />
      <InvalidToken />
    </>
  );
};

export default invalidToken;
