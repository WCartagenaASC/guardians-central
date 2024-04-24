import React from "react"
import './Accordian.scss';
import Accordion from 'react-bootstrap/Accordion';
import WeeklyRotators from "./WeeklyRotators";
import LostSector from "./LostSector";
import BansheeAda from "./BansheeAda";
import SeasonReport from "./SeasonReport";
const HomeAccordian = () =>{
    return(
      //defaultActiveKey Forces first slide to be open. This can be removed when other accordian items are deployed
      <Accordion defaultActiveKey="0" alwaysOpen className="p-4">
        <Accordion.Item eventKey="0" className="accordian-item text-white">
          <Accordion.Header>
            <div className="accordian-container">
            <div className="accordian-letters">
                Weekly Rotators
              </div>
              <div className="accordian-icons-container">
                <img className="accordian-icons" id='raid-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png" alt="raid icon" aria-hidden="true"/>
                <img className="accordian-icons" id='dungeon-icon' src="https://www.bungie.net/common/destiny2_content/icons/DestinyMilestoneDefinition_7b2e832d6fa3513b3c3e55f69aaeee40.png" alt="dungeon icon" aria-hidden="true"/>
                <img className="accordian-icons" id='exotic-quest-icon' src="https://www.bungie.net/common/destiny2_content/icons/DestinyMilestoneDefinition_fbba06b79fd1752af47e133cce7a3f45.png" alt="exoctic quest icon" aria-hidden="true"/>
                <img  className="accordian-icons" id='nightfall-icon' src="https://www.bungie.net/common/destiny2_content/icons/DestinyMilestoneDefinition_a72e5ce5c66e21f34a420271a30d7ec3.png" alt="nightfall icon"/>
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body className="p-0 h-100">
            <WeeklyRotators/>
          </Accordion.Body>
        </Accordion.Item>

        {/* Activate when ready */}
        {/*
        <Accordion.Item eventKey="1" className="accordian-item text-white">
        <Accordion.Header>
          <div className="accordian-container">
            <div className="accordian-letters">
            Banshee & Ada
            </div>
            <div className="accordian-icons-container">
                <img className="accordian-icons" id='banshee-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png" alt="banshee icon" aria-hidden="true"/>
                <img className="accordian-icons" id='ada-icon' src="https://www.bungie.net/common/destiny2_content/icons/DestinyMilestoneDefinition_7b2e832d6fa3513b3c3e55f69aaeee40.png" alt="ada icon" aria-hidden="true"/>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body className="p-0 h-100">
          <BansheeAda/>
        </Accordion.Body>
      </Accordion.Item>
      */}

      {/* Activate when ready */}
      {/*
      <Accordion.Item eventKey="2" className="accordian-item text-white">
        <Accordion.Header>
          <div className="accordian-container">
            <div className="accordian-letters">
            Lost Sector
            </div>
            <div className="accordian-icons-container">
                <img className="accordian-icons" id='lost-sector-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png" alt="lost sector icon" aria-hidden='true'/>
            </div>
          </div>
          </Accordion.Header>
        <Accordion.Body className="p-0 h-100">
          <LostSector/>
        </Accordion.Body>
      </Accordion.Item>
      */}
      {/* Activate when ready */}
      {/*
      <Accordion.Item eventKey="3" className="accordian-item text-white">
        <Accordion.Header>
          <div className="accordian-container">
            <div className="accordian-letters">
            Xur
            </div>
            <div className="accordian-icons-container">
                <img className="accordian-icons" id='seasonal-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"/>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body className="p-0 h-100">
          <SeasonReport/>
        </Accordion.Body>
      </Accordion.Item>*/}
      {/* Activate when ready */}
      {/*<Accordion.Item eventKey="5" className="accordian-item text-white">
        <Accordion.Header>
          <div className="accordian-container">
            <div className="accordian-letters">
            Seasonal Report
            </div>
            <div className="accordian-icons-container">
                <img className="accordian-icons" id='seasonal-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"/>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body className="p-0 h-100">
          <SeasonReport/>
        </Accordion.Body>
    </Accordion.Item>*/}
    </Accordion>
    );
}

export default HomeAccordian;
// Figure out how to convert the weekly rotator icons to svgs and fill them with a different color
// Dares of Eternity maybe goes in weekly rotators