import Carousel from 'react-bootstrap/Carousel';
import './LostSector.scss'
import { useEffect, useState } from 'react'

const renderItems = (list) => {
    const result = []
    for(let i = 0; i < list.length; i++){
        result.push(<img className="img-fluid ls-img-icon" key={i} src={list[i]} alt={`Item ${i + 1}`} />);
    }
    return result
}

const LostSector = () => {

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

    let lostSectorRewardsList = [
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"
    ]

    let testList = [
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg",
        "https://www.bungie.net/common/destiny2_content/icons/1a4382dd6c3cbc134f2d276c0ff63c7e.jpg"
    ]


    return(
        <Carousel controls={false} indicators={false}>
        <Carousel.Item interval={1000000} className='w-100'>
            <div className='ls-overlay-container'>
                <img src="https://www.bungie.net/img/destiny_content/pgcr/raid_kings_fall.jpg" alt="Background" />
                <div className='ls-overlay'></div>
            </div>
            <Carousel.Caption className='top-0 ls-overlay-text fw-bold overflow-auto'>
                <h2 className='fw-bold'>Lost Sector</h2>
                <h5 className='fw-bold'>Resets Daily @ 1700 UTC</h5>
                <div className={`ls-info-container ${isSmallScreen ? 'flex-column' : 'd-inline-flex'}`}>
                    <div className='ls-rewards-container'>
                        <h3 className='fw-bold'>NAME OF LOST SECTOR</h3>
                        <div>
                            {renderItems(lostSectorRewardsList)}
                        </div>
                    </div>
                    <div className='flex-column ls-modifiers-container'>
                        <div>
                        <h3 className='fw-bold'>Modifiers</h3>
                            {renderItems(testList)}
                        </div>
                        <div>
                        <h3 className='fw-bold'>Surge</h3>
                            {renderItems(testList)}
                        </div>
                        <div>
                        <h3 className='fw-bold'>Burn</h3>
                            {renderItems(testList)}
                        </div>
                        <div>
                        <h3 className='fw-bold'>Shield</h3>
                            {renderItems(testList)}
                        </div>
                        <div>
                        <h3 className='fw-bold'>Champions</h3>
                            {renderItems(testList)}
                        </div>
                    </div>
                </div>
            </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
}

export default LostSector