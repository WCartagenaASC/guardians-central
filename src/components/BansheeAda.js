import Carousel from 'react-bootstrap/Carousel';
import './BansheeAda.scss'
import { useEffect, useState } from 'react'

const renderItems = (list) => {
    const result = []
    for(let i = 0; i < list.length; i++){
        result.push(<img className="img-fluid ba-img-icon" key={i} src={list[i]} alt={`Item ${i + 1}`} />);
    }
    return result
}

const renderWeapons = (list, screenSize) => {
    const result = []
    let containerClass = ''
    if(screenSize == 'd-inline-block'){
        containerClass = 'd-inline-block daily-weapon-container'
    }else{
        containerClass = 'daily-weapon-container'
    }
    for(let i = 0; i < list.length; i++){
        let weaponName = Object.keys(list[i])[0];
        let weaponImg = list[i][weaponName].weapon_img;
        let weaponType = list[i][weaponName].weapon_type;
        result.push(
            <div key={i} className={containerClass}>
                <div className='d-flex inline daily-weapon-section-1'>
                    <div className='weapon-img-icon-container'>
                        <img className='img-fluid weapon-img-icon' src={weaponImg}></img>
                    </div>
                    <div className='weapon-strings-container d-flex d-flex flex-column pt-2'>
                        <span className='fw-bold'>{weaponName}</span>
                        <span className='fw-bold'>{weaponType}</span>
                    </div>
                </div>
                <div className='d-flex inline daily-weapon-section-2'>
                    <ul className='d-flex inline p-0'>
                        <li className='ba-list-item'>
                            <ul className='ba-list p-0'>
                                <li className='ba-list-item'><a><img className='perk-icon' src={list[i][weaponName].weapon_perk_list[0]}></img></a></li>
                                <li className='ba-list-item'><a><img className='perk-icon' src={list[i][weaponName].weapon_perk_list[1]}></img></a></li>
                            </ul>
                        </li>
                        <li className='ba-list-item'>
                            <ul className='ba-list p-0'>
                                <li className='ba-list-item'><a><img className='perk-icon' src={list[i][weaponName].weapon_perk_list[2]}></img></a></li>
                                <li className='ba-list-item'><a><img className='perk-icon' src={list[i][weaponName].weapon_perk_list[3]}></img></a></li>
                            </ul>
                        </li>
                        <li className='ba-list-item'>
                            <ul className='ba-list p-0'>
                                <li className='ba-list-item'><a><img className='perk-icon' src={list[i][weaponName].weapon_perk_list[4]}></img></a></li>
                            </ul>
                        </li>
                        <li className='ba-list-item'>
                            <ul className='ba-list p-0'>
                                <li className='ba-list-item'><a><img className='perk-icon' src={list[i][weaponName].weapon_perk_list[5]}></img></a></li>
                            </ul>
                        </li>
                        <li className='ba-list-item'> 
                            <ul className='ba-list p-0'>
                                <li className='ba-list-item'><a><img className='perk-icon' src={list[i][weaponName].weapon_perk_list[6]}></img></a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
    return result
}


const BansheeAda = () => {

    const [isXSmallScreen, setIsXSmallScreen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 992);
        setIsXSmallScreen(window.innerWidth < 600);
      };
  
      // Initial check on mount
      handleResize();
  
      // Add event listener for window resize
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    let adaTitanArmorList = ["https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg", "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"]
    let adaHunterArmorList = ["https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg", "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"]
    let adaWarlockArmorList = ["https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg", "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"]
    let adaShadersList = ["https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"]

    let dailyWeaponList = [
        {'True Prophecy':{
            weapon_img:'https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg',
            weapon_type:'HandCannon',
            weapon_perk_list:["https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png"]
        }},
        {'True Prophecy':{
            weapon_img:'https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg',
            weapon_type:'HandCannon',
            weapon_perk_list:["https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png"]
        }},
        {'True Prophecy':{
            weapon_img:'https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg',
            weapon_type:'HandCannon',
            weapon_perk_list:["https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png"]
        }},
        {'True Prophecy':{
            weapon_img:'https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg',
            weapon_type:'HandCannon',
            weapon_perk_list:["https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png"]
        }},
        {'True Prophecy':{
            weapon_img:'https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg',
            weapon_type:'HandCannon',
            weapon_perk_list:["https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png","https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png"]
        }}
    ]
    //https://www.bungie.net/common/destiny2_content/icons/7730e1732ed7ef91afce50277639c493.png
    return(
          <Carousel controls={false} indicators={false}>
            <Carousel.Item interval={1000000} className='w-100'>
                <div className='ba-overlay-container'>
                    <img className="carousel-img-transform" src="https://www.bungie.net/img/destiny_content/pgcr/raid_kings_fall.jpg" alt="Background" />
                    <div className='ba-overlay'></div>
                </div>
                <Carousel.Caption className='top-0 ba-overlay-text fw-bold overflow-auto'>
                    <h2 className='fw-bold'>Banshee & Ada</h2>
                    <div className={`${isSmallScreen ? 'flex-column' : 'd-inline-flex'}`}>
                        <div style={{paddingTop:'10px'}} className='container daily-weapon-list-container'>
                            <h5 className='fw-bold'>Weapons</h5>
                            <h6 className='fw-bold'>Weapons Refresh Daily @ 0:00 UTC</h6>
                            <div>
                                {renderWeapons(dailyWeaponList, isXSmallScreen ? '' : 'd-inline-block')}
                            </div>
                        </div>
                        <div className='ba-img-column-container'>
                            <h5 className='fw-bold'>Armor</h5>
                            <h6 className='fw-bold'>Resets Weekly</h6>
                            <div className='Titan'>
                                {renderItems(adaTitanArmorList)}
                            </div>
                            <div className='Hunter'>
                                {renderItems(adaHunterArmorList)}
                            </div>
                            <div className='Warlock'>
                                {renderItems(adaWarlockArmorList)}
                            </div>
                            <div className='ba-img-column-container'>
                                <h5 className='fw-bold'>Shaders</h5>
                                <h6 className='fw-bold'>Resets Weekly</h6>
                                <div className='Warlock'>
                                    {renderItems(adaShadersList)}
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
    );
}

export default BansheeAda
// Implement focused decoding