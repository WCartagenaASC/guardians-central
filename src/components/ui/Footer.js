import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faSquareXTwitter,faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/images/logo192.png'
import './Footer.scss'

const Footer =() => {
    return(

            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 bg-dark relative-bottom gc-footer">
            <div className="px-2 d-flex align-items-center">
                <Link className=" text-body-secondary text-decoration-nonetext-light" to="/">
                    <img
                    alt=""
                    src={logoImg}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    />
                </Link>
                <span className="text-body-secondary"><Link className="text-decoration-none link-light" to="/">© 2024 Guardians Central.gg</Link></span>
            </div>
        
            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex px-2">
                {/*<li className="mx-1 text-light gc-icons"><FontAwesomeIcon icon={faSquareXTwitter} size="lg" /></li>*/}
                <Link className=" text-body-secondary text-decoration-nonetext-light" to="https://github.com/WesleyCartagena/guardians-central">
                    <li className="mx-1 text-light gc-icons"><FontAwesomeIcon icon={faGithub} size="lg" /></li>
                </Link>
                {/*<li className="mx-1 text-light gc-icons"><FontAwesomeIcon icon={faDiscord} size="lg" /></li>*/}
            </ul>
            </footer>

        
    )
};

export default Footer