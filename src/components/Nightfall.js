// CODE FOR NIGHTFALL ACCORDIAN ITEM
// const renderText = (list) => {
//     const result = []
//     for(let i = 0; i < list.length; i++){
//         let key = Object.keys(list[i])[0];
//         let value = list[i][key];
//         result.push(
//             <div className='wr-mods-column' key={i}>
//                 <img className='wr-mod-icon' key={i} src={value} alt={`Item ${i + 1}`}></img>
//                 <span className='wr-mod-text'>{key}</span>
//             </div>
//         );
//     }
//     return result
// }

//     // Nightfall lists
//     let weeklyNightfallLoot = ["https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg","https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"]
//     let nightfallHeroMods = [
//         {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
//         {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
//         {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
//         {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
//         {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
//         {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"}

//     ]
//     let nightfallLegendMods = [
//         {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
//         {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
//         {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
//         {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
//         {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
//         {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"}
//     ]
//     let nightfallMasterMods = [
//         {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
//         {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
//         {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
//         {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
//         {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"},
//         {'Empath':"https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"}
//     ]
//             {/* Activate when ready */}
//             {/*
//             <Carousel.Item interval={1000000}>
//                 <div className='wr-overlay-container'>
//                     <img className="carousel-img-transform" src="https://www.bungie.net/img/destiny_content/pgcr/raid_kings_fall.jpg" alt="Background" />
//                     <div className='wr-overlay'></div>
//                 </div>
//                 <Carousel.Caption className='top-0 wr-overlay-text fw-bold overflow-auto'>
//                     <h2 className='fw-bold'>Weekly Nightfall</h2>
//                     <h3 className='fw-bold'>Nightfall Name</h3>
//                     <div className='info-container d-inline-flex px-2'>
//                         <div className='wr-mods-column-container'>
//                             <h5 className='fw-bold'>Weekly Loot</h5>
//                             {renderItems(weeklyNightfallLoot)}
//                         </div>
//                     </div>
//                     <div className='info-container d-inline-flex' >
//                         <div className='wr-mods-column-container d-flex flex-column px-2'>
//                             <h5 className='fw-bold'>Hero Mods</h5>
//                             {renderText(nightfallHeroMods)}
//                         </div>
//                         <div className='wr-mods-column-container d-flex flex-column px-2'>
//                             <h5 className='fw-bold'>Legend Mods</h5>
//                             {renderText(nightfallLegendMods)}
//                         </div>
//                         <div className='wr-mods-column-container d-flex flex-column px-2'>
//                             <h5 className='fw-bold'>Master Mods</h5>
//                             {renderText(nightfallMasterMods)}
//                         </div>
//                     </div>
//                 </Carousel.Caption>
//             </Carousel.Item>
//             */}