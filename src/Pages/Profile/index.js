import profile from './profile.svg'

import { Download, Edit, Logout } from './icons'
import company from './company.svg'
import phone from './icons/phone.svg'
import Mail from './icons/mail.js'
import location from './icons/location.svg'
import website from './icons/website.svg'

import {
  FacebookOriginal,
  TwitterOriginal,
  LinkedinOriginal,
} from './icons/social'
import InstagramOriginal from './icons/instagram.js'

import empty from './icons/bosPp.webp'

function CardVisit(props) {


  let user;



  if (1) {
    console.log("defaul profile")
    user = {
      first_name: 'Sierra Brooks',
      img: profile,
      company:'SkyLab',
      title: 'Coordinator',
      image: company,

      elevator_speech:
          'Hi, I’m Sierra Brooks a creative who is leading teams  that create digital experiences. Sometimes I work on stuff on the side with friends.',
      phone_number: '+1 (235) 354 7865',
      email: 'sierrabrooks@gmail.com',
      address: '147 East 42th Street NY',
      website: 'brookssierra.com',

      social: {
        instagram: '',
        twitter: '',
        linkedin: '',
        facebook: '',
      },
    }
  }

  return (

    <div id="all-cardvisit" className="w-full h-full flex justify-center items-center relative bg-white  rounded-2xl">
      <div id="cardvisit-settings" className="absolute right-12 top-12 flex flex-row justify-between w-24">
        <Edit />
        
      </div>
      <div id="cardvisit-card"
        className="w-2/3 h-4/5 flex flex-row justify-around"
        style={{ color: 'rgba(42, 43, 46, 0.8)' }}
      >
        <div  id="profile-pics" className="flex flex-col justify-center items-center">
          <img
            id="profile-pic"
            src={user.img ? user.img:empty}
            alt="profile-pic"
            className="rounded-2xl "
            style={{ width: '11.88em', height: '12.13em' }}
          />
          {user.image?<div
            className="mt-12 rounded-2xl flex justify-center items-center"
            id="company-pic"
            style={{

              width: '6.6em',
              height: '4.75em',
              background: '#FFFFFF',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
            }}
          >
              <img
                src={user.image ? user.image : ""}
                alt="company"
                style={{ maxWidth: '75%', maxHeight: '80%' }}
              />
          </div>:""}
        </div>

        <div id="cardvisit-details" className="w-1/2 flex flex-col justify-between">
          <h1 className="text-4xl font-bold">{user.first_name} {user.last_name}</h1>
          <h2 className="text-2xl font-normal">
            {user.title} @{user.company}
          </h2>
          <p className="text-base font-light ">{user.elevator_speech}</p>
          <div>
            <span className="flex items-center">
              <img src={phone} alt="phone" />
              <p>{user.phone_number}</p>
            </span>
            <span className="flex items-center">
              <Mail />
              {user.email}
            </span>

            <span className="flex items-center">
              <img src={website} alt="website" />
              <p>{user.website}</p>
            </span>
            <span className="flex items-center">
              <img src={location} alt="location" />
              <p>{user.address}</p>
            </span>
          </div>
          <div className="w-2/3">
            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-xl mt-6 mb-2 focus:outline-none"
              style={{
                height: '3em',
                background:
                  'linear-gradient(90.1deg, #167FFC -1.4%, #18ACFE 103.23%)',
                borderRadius: '1em',
                marginTop: '0',
              }}
            >
              Arkadaş Ekle
            </button>
            <div id="cardvisit-socials" className="mx-6 mt-6 flex flex-row justify-around">
              <TwitterOriginal />
              <InstagramOriginal />
              <LinkedinOriginal />
              <FacebookOriginal />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardVisit
