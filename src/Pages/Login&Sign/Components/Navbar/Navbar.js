import logo from '../../../../img/ytulogo.svg';
import './Navbar.css';
import { Link } from 'react-router-dom'
import auth from '../../../../auth/auth';
function Navbar(props) {

	return (

		<div style={props.style} className="w-full px-24 mx-auto h-1/6 flex justify-end pt-4 relative">
			<img id="ytuLogo" src={logo} alt="ytu logo" />

			<div id="nav-container">

				<ul id="nav-list" className=" p-3 mt-5">


					<Link onClick={props.to ? () => { auth.logout(() => { }) } : () => { }} to={props.to || "/"}><li style={{ color: "white" }}>{props.text || ""}</li></Link>

				</ul>
			</div>

		</div>

	)

}


export default Navbar;