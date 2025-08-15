import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './StatCard.css';

export default function StatCard({ title, count, subtitle, icon }) {
  return (
        <Card className="stat-card-long">
      <Card.Body>
        <div className="stat-card-left">
          <div className="stat-card-icon" aria-hidden>
            {icon}
          </div>

          <div className="stat-card-meta">
            <Card.Title className="stat-card-title">{title}</Card.Title>
            <div className="stat-card-count">{count}</div>
            {subtitle && <Card.Text className="stat-card-sub">{subtitle}</Card.Text>}
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}
