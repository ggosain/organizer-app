import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { LayoutDashboard, CalendarDays, ScanLine, ShoppingCart, Receipt, Settings } from 'lucide-react'
import './App.css'

function Dashboard() {
  return (
    <div className="page">
      <div className="hero-card">
        <div>
          <p className="eyebrow">Organizer Console</p>
          <h1>Event Control Center</h1>
          <p className="muted">
            Manage check-ins, monitor sales, view orders, and run door sales from one dashboard.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Total Sales</span>
            <strong>$12,480</strong>
          </div>
          <div className="stat-card">
            <span>Tickets Sold</span>
            <strong>428</strong>
          </div>
          <div className="stat-card">
            <span>Checked In</span>
            <strong>291</strong>
          </div>
          <div className="stat-card">
            <span>Pending Orders</span>
            <strong>14</strong>
          </div>
        </div>
      </div>

      <div className="panel-grid">
        <div className="panel">
          <h3>Tonight’s Event</h3>
          <p className="muted">BollyTech Fridays</p>
          <p className="muted">Revel Nightclub • Melbourne</p>
        </div>
        <div className="panel">
          <h3>Door Status</h3>
          <p className="success">Open for Check-In</p>
        </div>
        <div className="panel">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <button>Start Scan</button>
            <button className="secondary">Sell Ticket</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Events() {
  return (
    <div className="page">
      <h1>Events</h1>
      <div className="list-card">Melbourne • Bollywood Saturday</div>
      <div className="list-card">Sydney • Afro Desi Night</div>
      <div className="list-card">Melbourne • Tech Mantra</div>
    </div>
  )
}

function CheckIn() {
  return (
    <div className="page">
      <h1>Check-In Scanner</h1>
      <div className="scanner-card">
        <div className="scanner-box">QR Scanner Area</div>
        <input className="manual-input" placeholder="Enter ticket code manually" />
        <button>Check In Ticket</button>
      </div>
    </div>
  )
}

function Orders() {
  return (
    <div className="page">
      <h1>Orders</h1>
      <div className="list-card">#10458 • John Smith • 2 Tickets • Paid</div>
      <div className="list-card">#10459 • Sarah Khan • 1 Ticket • Refunded</div>
      <div className="list-card">#10460 • Aman Gill • 4 Tickets • Paid</div>
    </div>
  )
}

function Sell() {
  return (
    <div className="page">
      <h1>Sell Tickets</h1>
      <div className="panel">
        <div className="form-grid">
          <input placeholder="Customer name" />
          <input placeholder="Email" />
          <input placeholder="Phone" />
          <select>
            <option>General Entry</option>
            <option>VIP</option>
            <option>Early Bird</option>
          </select>
          <input placeholder="Quantity" type="number" min="1" defaultValue="1" />
          <input placeholder="Amount" type="number" />
        </div>
        <button>Proceed to Payment</button>
      </div>
    </div>
  )
}

function SettingsPage() {
  return (
    <div className="page">
      <h1>Settings</h1>
      <div className="panel">Organizer account, Stripe connection, event sync, and scanner settings.</div>
    </div>
  )
}

function Shell() {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { to: '/events', label: 'Events', icon: <CalendarDays size={18} /> },
    { to: '/checkin', label: 'Check-In', icon: <ScanLine size={18} /> },
    { to: '/orders', label: 'Orders', icon: <Receipt size={18} /> },
    { to: '/sell', label: 'Sell', icon: <ShoppingCart size={18} /> },
    { to: '/settings', label: 'Settings', icon: <Settings size={18} /> },
  ]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-badge">T</div>
          <div>
            <h2>Tikts Organizer</h2>
            <p>Door + Sales Console</p>
          </div>
        </div>

        <nav className="nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
