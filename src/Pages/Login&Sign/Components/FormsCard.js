
import React, { useState } from "react";
import LoginForm from './Login/LoginForm';
import SignForm from './Sign/SignForm';
import logo from '../../../img/sun-clock2.jpg';
function FormsCard(props) {

	const [comp, setShow] = useState("giris");

	const openGiris = () => {

		if (comp === "kaydol") {
			setShow("giris");
			const girisYazi = document.getElementById("girisYazi");
			const kaydolYazi = document.getElementById("kaydolYazi");
			girisYazi.style.strokeDashoffset = 0;
			kaydolYazi.style.strokeDashoffset = 500;
		}
	}
	const openKaydol = () => {
		if (comp === "giris") {
			setShow("kaydol");
			const kaydolYazi = document.getElementById("kaydolYazi");
			const girisYazi = document.getElementById("girisYazi");
			kaydolYazi.style.strokeDashoffset = 0;
			girisYazi.style.strokeDashoffset = 500;
		}
	}
	return (


		<div id="form-card" className="w-3/4 flex flex-row justify-end h-4/5" style={{ minWidth: "50rem", backgroundColor: "#FFFFFF", height: "", color: "rgba(64, 62, 86, 0.6)", borderRadius: "1.8rem" }}>
			<div id="login-time-icon" className="w-2/3">
				<img src={logo} alt="ytu logo" className="" />
			</div>

			<div id="container-of-login-form" className="w-1/2 inline-block flex flex-col items-center justify-start " style={{ padding: "2rem", paddingTop: "5rem", paddingBottom: "1rem" }}>
				<div  className="mb-16 relative ">
					<h2 onClick={openGiris} style={{ left: "0rem" }}>
						<svg>
							<rect id="girisYazi" style={{ strokeDashoffset: "0" }} ></rect>
						</svg>
						Giriş Yap
					</h2>
					<h2 onClick={openKaydol} style={{ left: "-11rem" }}>
						<svg>
							<rect id="kaydolYazi" style={{ strokeDashoffset: "500" }} ></rect>
						</svg>
						Kayıt Ol
					</h2>


				</div>

				{
					comp === "giris" &&

					<LoginForm onClick={props.onClick} />

				}
				{comp === "kaydol" &&
					<SignForm onClick={props.onClick} />
				}



			</div>

		</div>

	);


}

export default FormsCard;