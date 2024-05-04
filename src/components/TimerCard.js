import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import DailyResetTimer from './DailyResetTimer';
import WeeklyResetTimer from './WeeklyResetTimer';
import './TimerCard.scss';

const TimerCard = () => {
  const [activeTab, setTab] = useState('daily'); 
  const handleTabSelect = (tab) => {
    setTab(tab)
  }

  // Renders a timer based on selected tab
  const renderSelectedTimer = () => {
    if (activeTab === 'daily') {
      return <DailyResetTimer />;
    } else if (activeTab === 'weekly') {
      return <WeeklyResetTimer />;
    }
  }
  return (
    <div className='p-4'>
      <Card>
        <Card.Header className='bg-dark'>
          <Nav variant="tabs" defaultActiveKey="#daily" className='d-inline-flex-row'>
            <Nav.Item className='nav-item-timer-card'>
              <Nav.Link style={{color:'#b48608'}} active={activeTab === 'daily'} onClick={() => handleTabSelect('daily')}>Daily Reset Timer</Nav.Link>
            </Nav.Item>
            <Nav.Item className='nav-item-timer-card'>
              <Nav.Link style={{color:'#b48608'}}active={activeTab === 'weekly'} onClick={() => handleTabSelect('weekly')}>Weekly Reset Timer</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
            {renderSelectedTimer()}
        </Card.Body>
      </Card>
    </div>
  );
}

export default TimerCard;