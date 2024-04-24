
import Carousel from 'react-bootstrap/Carousel';
import './WeeklyRotators.scss'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const renderItems = (list) => {
    const result = []
    console.log(result)
    for(let i = 0; i < list.length; i++){
        result.push(<img className="img-fluid wr-img-icon" key={i} src={list[i]} alt={`Item ${i + 1}`} />);
    }
    return result
}

const renderText = (list) => {
    const result = []
    for(let i = 0; i < list.length; i++){
        let key = Object.keys(list[i])[0];
        let value = list[i][key];
        result.push(
            <div className='wr-mods-column' key={i}>
                <img className='wr-mod-icon' key={i} src={value} alt={`Item ${i + 1}`}></img>
                <span className='wr-mod-text'>{key}</span>
            </div>
        );
    }
    return result
}


const WeeklyRotators = () => {

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 992);
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



    // Nightfall lists
    let weeklyNightfallLoot = ["https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"]
    let nightfallHeroMods = [
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"}

    ]
    let nightfallLegendMods = [
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"}
    ]
    let nightfallMasterMods = [
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
        {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"}
    ]

    //Raid info states
    const [raidWeaponList, setRaidWeaponList] = useState([]);
    const [raidTitanArmorList, setRaidTitanArmorList] = useState([]);
    const [raidHunterArmorList, setRaidHunterArmorList] = useState([]);
    const [raidWarlockArmorList, setRaidWarlockArmorList] = useState([]);
    const [raidCosmeticList, setRaidCosmeticList] = useState([]);
    const [raidName, setRaidName] = useState([]);
    const [raidImage, setRaidImage] = useState([]);

    //Exotic Quest info states
    const [exoticQuestWeaponList, setExoticQuestWeaponList] = useState([]);
    const [exoticQuestTitanArmorList, setExoticQuestTitanArmorList] = useState([]);
    const [exoticQuestHunterArmorList, setExoticQuestHunterArmorList] = useState([]);
    const [exoticQuestWarlockArmorList, setExoticQuestWarlockArmorList] = useState([]);
    const [exoticQuestCatalystList, setExoticQuestCatalystList] = useState([]);
    const [exoticQuestName, setExoticQuestName] = useState([]);
    const [exoticQuestImage, setExoticQuestImage] = useState([]);

    //Dungeon info states
    const [dungeonWeaponList, setDungeonWeaponList] = useState([]);
    const [dungeonTitanArmorList, setDungeonTitanArmorList] = useState([]);
    const [dungeonHunterArmorList, setDungeonHunterArmorList] = useState([]);
    const [dungeonWarlockArmorList, setDungeonWarlockArmorList] = useState([]);
    const [dungeonCosmeticList, setDungeonCosmeticList] = useState([]);
    const [dungeonName, setDungeonName] = useState([]);
    const [dungeonImage, setDungeonImage] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/weeklyrotators');
                const data = response.data.getWeeklyRotators;
                //console.log(data);
    
                // Parse the JSON data and set the lists
                data.forEach(item => {
                    const jsonData = JSON.parse(item.Json);
                    const activityType = jsonData.activity_type;
                    const weapons = jsonData.weapons;
                    const titanArmor = jsonData.titan_armor;
                    const hunterArmor = jsonData.hunter_armor;
                    const warlockArmor = jsonData.warlock_armor;
                    const cosmetics = jsonData.cosmetics;
                    const activityName = jsonData.activity_name;
                    const activityImage = jsonData.pcgr_image;
                    const catalystList = jsonData.catalyst_list;

                    switch (activityType) {
                        case 'Raid':
                            if(weapons != null){
                                setRaidWeaponList([]);
                                setRaidWeaponList(prevList => [...prevList, ...weapons.map(weapon => "https://www.bungie.net" + Object.values(weapon)[0].Icon)]);
                            };
                            if(titanArmor != null){
                                setRaidTitanArmorList([]);
                                setRaidTitanArmorList(prevList => [...prevList, ...titanArmor.map(armor => "https://www.bungie.net" + Object.values(armor)[0].Icon)]);
                            };
                            if(hunterArmor != null){
                                setRaidHunterArmorList([]);
                                setRaidHunterArmorList(prevList => [...prevList, ...hunterArmor.map(armor => "https://www.bungie.net" + Object.values(armor)[0].Icon)]);
                            };
                            if(warlockArmor != null){
                                setRaidWarlockArmorList([]);
                                setRaidWarlockArmorList(prevList => [...prevList, ...warlockArmor.map(armor => "https://www.bungie.net" + Object.values(armor)[0].Icon)]);
                            };
                            if(cosmetics != null){
                                setRaidCosmeticList([])
                                setRaidCosmeticList(prevList => [...prevList, ...cosmetics.map(cosmetic => "https://www.bungie.net" + Object.values(cosmetic)[0].Icon)]);
                            };
                            if(activityName != null){
                                setRaidName(activityName);
                            }
                            if(activityImage != null){
                                setRaidImage(activityImage);
                            };
                            break;
                        case 'Dungeon':
                            if(weapons != null){
                                setDungeonWeaponList([]);
                                setDungeonWeaponList(prevList => [...prevList, ...weapons.map(weapon => "https://www.bungie.net" + Object.values(weapon)[0].Icon)]);
                            };
                            if(titanArmor != null){
                                setDungeonTitanArmorList([]);
                                setDungeonTitanArmorList(prevList => [...prevList, ...titanArmor.map(armor => "https://www.bungie.net" + Object.values(armor)[0].Icon)]);
                            };
                            if(hunterArmor != null){
                                setDungeonHunterArmorList([]);
                                setDungeonHunterArmorList(prevList => [...prevList, ...hunterArmor.map(armor => "https://www.bungie.net" + Object.values(armor)[0].Icon)]);
                            };
                            if(warlockArmor != null){    
                                setDungeonWarlockArmorList([]);
                                setDungeonWarlockArmorList(prevList => [...prevList, ...warlockArmor.map(armor => "https://www.bungie.net" + Object.values(armor)[0].Icon)]);
                            };
                            if(cosmetics != null){
                                setDungeonCosmeticList([])
                                setDungeonCosmeticList(prevList => [...prevList, ...cosmetics.map(cosmetic => "https://www.bungie.net" + Object.values(cosmetic)[0].Icon)]);
                            };
                            if(activityName != null){
                                setDungeonName(activityName);
                            };
                            if(activityImage != null){
                                setDungeonImage(activityImage);
                            };
                            break;
                        case 'Story':
                            if(weapons != null){
                                setExoticQuestWeaponList([]);
                                setExoticQuestWeaponList(prevList => [...prevList, ...weapons.map(weapon => "https://www.bungie.net" + Object.values(weapon)[0].Icon)]);
                            };
                            if(titanArmor != null){
                                setExoticQuestTitanArmorList([]);
                                setExoticQuestTitanArmorList(prevList => [...prevList, ...titanArmor.map(armor => "https://www.bungie.net" + Object.values(armor)[0].Icon)]);
                            };

                            if(hunterArmor != null){
                                setExoticQuestHunterArmorList([]);
                                setExoticQuestHunterArmorList(prevList => [...prevList, ...hunterArmor.map(armor => "https://www.bungie.net" + Object.values(armor)[0].Icon)]);
                            };
                            if(warlockArmor != null){
                                setExoticQuestWarlockArmorList([]);
                                setExoticQuestWarlockArmorList(prevList => [...prevList, ...warlockArmor.map(armor => "https://www.bungie.net" + Object.values(armor)[0].Icon)]);
                            };
                            if(catalystList != null){
                                setExoticQuestCatalystList([]);
                                setExoticQuestCatalystList(prevList => [...prevList, ...catalystList.map(catalyst => "https://www.bungie.net" + Object.values(catalyst)[0].Icon)]);
                            }
                            if(activityName != null){
                                setExoticQuestName(activityName);
                            };
                            if(activityImage != null){
                                setExoticQuestImage(activityImage);
                            };
                            break;
                        default:
                            break;
                    }

                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    return(
          <Carousel>
            <Carousel.Item interval={1000000}>
            <div className='wr-overlay-container'>
                    <img className="carousel-img-transform" src={"https://www.bungie.net" + raidImage} alt="Background" />
                    <div className='wr-overlay'></div>
                </div>
                <Carousel.Caption className='top-0 wr-overlay-text fw-bold overflow-auto'>
                    <h2 className='fw-bold'>Weekly Raid</h2>
                    <h3 className='fw-bold'>{raidName}</h3>
                    <div className={`info-container ${isSmallScreen ? 'flex-column' : 'd-inline-flex'}`}>
                        <div className='wr-img-column-container px-1'>
                            <h5 className='fw-bold'>Weapons</h5>
                            {renderItems(raidWeaponList)}
                        </div>
                        <div className='wr-img-column-container px-1'>
                            <h5 className='fw-bold'>Armor</h5>
                            <div className='Titan'>
                                {renderItems(raidTitanArmorList)}
                            </div>
                            <div className='Hunter'>
                                {renderItems(raidHunterArmorList)}
                            </div>
                            <div className='Warlock'>
                                {renderItems(raidWarlockArmorList)}
                            </div>
                        </div>
                        <div className='wr-img-column-container px-1'>
                            <h5 className='fw-bold'>Cosmetics</h5>
                             {renderItems(raidCosmeticList)}
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1000000}>
            <div className='wr-overlay-container'>
                    <img className="carousel-img-transform" src={"https://www.bungie.net" + dungeonImage} alt="Background" />
                    <div className='wr-overlay'></div>
                </div>
                <Carousel.Caption className='top-0 wr-overlay-text fw-bold overflow-auto'>
                    <h2 className='fw-bold'>Weekly Dungeon</h2>
                    <h3 className='fw-bold'>{dungeonName}</h3>
                    <div className={`info-container ${isSmallScreen ? 'flex-column' : 'd-inline-flex'}`}>
                        <div className='wr-img-column-container px-1'>
                            <h5 className='fw-bold'>Weapons</h5>
                            {renderItems(dungeonWeaponList)}
                        </div>
                        <div className='wr-img-column-container px-1'>
                            <h5 className='fw-bold'>Armor</h5>
                            <div className='Titan'>
                                {renderItems(dungeonTitanArmorList)}
                            </div>
                            <div className='Hunter'>
                                {renderItems(dungeonHunterArmorList)}
                            </div>
                            <div className='Warlock'>
                                {renderItems(dungeonWarlockArmorList)}
                            </div>
                        </div>
                        <div className='wr-img-column-container px-1'>
                            <h5 className='fw-bold'>Cosmetics</h5>
                             {renderItems(dungeonCosmeticList)}
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1000000}>
            <div className='wr-overlay-container'>
                    <img className="carousel-img-transform" src={"https://www.bungie.net" + exoticQuestImage} alt="Background" />
                    <div className='wr-overlay'></div>
                </div>
                <Carousel.Caption className='top-0 wr-overlay-text fw-bold overflow-auto'>
                    <h2 className='fw-bold'>Weekly Exotic Quest</h2>
                    <h3 className='fw-bold'>{exoticQuestName}</h3>
                    <p>You get 3 guaranteed red border drops per week. <br></br>One for completing legend, one for master and one when the pinnacle reward is completed</p>
                    <div className={`info-container ${isSmallScreen ? 'flex-column' : 'd-inline-flex'}`}>
                        <div className='wr-img-column-container px-1'>
                            <h5 className='fw-bold'>Weapons</h5>
                            {renderItems(exoticQuestWeaponList)}
                        </div>
                        <div className='wr-img-column-container px-1'>
                            <h5 className='fw-bold'>Armor</h5>
                            <div className='Titan'>
                                {renderItems(exoticQuestTitanArmorList)}
                            </div>
                            <div className='Hunter'>
                                {renderItems(exoticQuestHunterArmorList)}
                            </div>
                            <div className='Warlock'>
                                {renderItems(exoticQuestWarlockArmorList)}
                            </div>
                        </div>
                        <div className='wr-img-column-container px-1'>
                            <h5 className='fw-bold'>Catalyst</h5>
                             {renderItems(exoticQuestCatalystList)}
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            {/* Activate when ready */}
            {/*
            <Carousel.Item interval={1000000}>
                <div className='wr-overlay-container'>
                    <img className="carousel-img-transform" src="https://www.bungie.net/img/destiny_content/pgcr/raid_kings_fall.jpg" alt="Background" />
                    <div className='wr-overlay'></div>
                </div>
                <Carousel.Caption className='top-0 wr-overlay-text fw-bold overflow-auto'>
                    <h2 className='fw-bold'>Weekly Nightfall</h2>
                    <h3 className='fw-bold'>Nightfall Name</h3>
                    <div className='info-container d-inline-flex px-2'>
                        <div className='wr-mods-column-container'>
                            <h5 className='fw-bold'>Weekly Loot</h5>
                            {renderItems(weeklyNightfallLoot)}
                        </div>
                    </div>
                    <div className='info-container d-inline-flex' >
                        <div className='wr-mods-column-container d-flex flex-column px-2'>
                            <h5 className='fw-bold'>Hero Mods</h5>
                            {renderText(nightfallHeroMods)}
                        </div>
                        <div className='wr-mods-column-container d-flex flex-column px-2'>
                            <h5 className='fw-bold'>Legend Mods</h5>
                            {renderText(nightfallLegendMods)}
                        </div>
                        <div className='wr-mods-column-container d-flex flex-column px-2'>
                            <h5 className='fw-bold'>Master Mods</h5>
                            {renderText(nightfallMasterMods)}
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            */}
          </Carousel>
          
    );
}

export default WeeklyRotators