import './style.css'
import lock from './img-icon/lock.svg'
import onay from './img-icon/onayIconXl.svg'
import ForgotForm from './components/form'

import { Link } from 'react-router-dom'
import forgotStyles from './forgotPassword.module.css'
function ForgotPage(props) {


  return (
    <div id="forgot-page" className="flex justify-center items-center">

      <div className={forgotStyles.forgotCard}>
        <div id="forgot-form" className="my-8 mx-16 w-3/4 text-center">
          <img
            src={props.onayPage ? onay : lock}
            alt="lock"
            className={props.onayPage ? 'mb-6 mt-16' : 'mb-6'}
          />
          {props.onayPage ? (
            <div>
              <span className="block mt-12">
                Şifreniz başarı ile değiştirildi. <br />
                <span>Yeni şifrenizle giriş yapabilirsiniz.</span>
              </span>
              <Link to="/login">
                <button
                  
                  style={{ marginTop: '3rem' }}
                >
                  Giriş Yap
                </button>
              </Link>
            </div>
          ) : (
            <ForgotForm type={props.type} />
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPage
