import { Link } from "react-scroll";
import './Header.css'

function Header() {
  return (
    <header>
      <h1>Geriatrico</h1>
      <nav>
        <Link to="residentes" smooth={true} duration={500}>Residentes</Link>
        <Link to="medicamentos" smooth={true} duration={500}>Medicamentos</Link>
        <Link to="reportes" smooth={true} duration={500}>Reportes</Link>
      </nav>
    </header>
  );
}
export default Header;