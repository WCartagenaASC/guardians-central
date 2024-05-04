import React, { useState } from 'react';
import TwitterWidget from "./TwitterWidget"
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import './TwitterTabs.scss'

const TwitterTabs = () => {

    const [activeTab, setTab] = useState('BungieHelp');
    const handleTabSelect = (tab) => {
        setTab(tab)
    }

    return(
    <div className='p-4'>
        <Card>
            <Card.Header className='bg-dark'>
                <Nav variant="tabs">
                    <Nav.Item className='nav-item-twitter-tabs'>
                        <Nav.Link key="1" style={{color:'#b48608'}} active={activeTab === "BungieHelp"} onClick={() => handleTabSelect("BungieHelp")}>BungieHelp</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='nav-item-twitter-tabs'>
                        <Nav.Link key="2" style={{color:'#b48608'}} active={activeTab === "DestinyTheGame"} onClick={() => handleTabSelect("DestinyTheGame")}>DestinyTheGame</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='nav-item-twitter-tabs'>
                        <Nav.Link key="3" style={{color:'#b48608'}} active={activeTab === "Destiny2Team"} onClick={() => handleTabSelect("Destiny2Team")}>Destiny2Team</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>
                <div style={{ display: activeTab === "BungieHelp" ? 'block' : 'none' }}>
                    <TwitterWidget screenName="BungieHelp"/>
                </div>
                <div style={{ display: activeTab === "DestinyTheGame" ? 'block' : 'none' }}>
                    <TwitterWidget screenName="DestinyTheGame"/>
                </div>
                <div style={{ display: activeTab === "Destiny2Team" ? 'block' : 'none' }}>
                    <TwitterWidget screenName="Destiny2Team" />
                </div>
            </Card.Body>
        </Card>
    </div>
    );
};

export default TwitterTabs