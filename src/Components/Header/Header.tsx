import { Link } from "react-scroll";
import '../../index.css'

function Header() {
  return (
    <header>
      <h1>Geriatrico</h1>
      <nav className="nav">
        <Link to="residentes" smooth={true} duration={500} className="nav-link">Residentes</Link>
        <Link to="reportes" smooth={true} duration={500} className="nav-link">Reportes</Link>
      </nav>
    </header>
  );
}
export default Header;