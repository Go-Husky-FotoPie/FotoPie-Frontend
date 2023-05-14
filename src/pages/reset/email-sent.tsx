import EmailSent from "../../components/Reset/EmailSent";
import NavBar from "../../components/NavBar/NavBar";
import { NavBarStyles } from "../../components/NavBar/NavbarBaseline.style";
import Copyright from "../../components/Copyright";

const emailSent: React.FC = () => {
  return (
    <>
      <NavBar isFixed={false} color="#000000" baseLine={NavBarStyles} />
      <EmailSent />
      <Copyright />
    </>
  );
};

export default emailSent;
