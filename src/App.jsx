import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  LayoutDashboard,
  CalendarDays,
  ScanLine,
  Receipt,
  Settings,
} from 'lucide-react'
import { apiGet } from './services/api'
import './App.css'

function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [summary, setSummary] = useState(null)
  const [events, setEvents] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        const [meRes, dashRes, eventsRes] = await Promise.all([
          apiGet('me.php'),
          apiGet('dashboard.php'),
          apiGet('events.php'),
        ])

        setUser(meRes.user || null)
        setSummary(dashRes.summary || null)
        setEvents(eventsRes.events || [])
      } catch (err) {
        setError(err.message || 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="page"><h1>Loading dashboard...</h1></div>
  }

  if (error) {
    return (
      <div className="page">
        <h1>Dashboard</h1>
        <div className="panel">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="hero-card">
        <div>
          <p className="eyebrow">Organizer Console</p>
          <h1>Welcome{user?.name ? `, ${user.name}` : ''}</h1>
          <p className="muted">Live organiser overview from your Tikts backend.</p>
          {user && !user.approved && (
            <p className="muted">Your organiser account is pending approval.</p>
          )}
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Total Events</span>
            <strong>{summary?.total_events ?? 0}</strong>
          </div>
          <div className="stat-card">
            <span>Tickets Sold</span>
            <strong>{summary?.tickets_sold ?? 0}</strong>
          </div>
          <div className="stat-card">
            <span>Revenue</span>
            <strong>${Number(summary?.revenue ?? 0).toFixed(2)}</strong>
          </div>
          <div className="stat-card">
            <span>Orders</span>
            <strong>{summary?.orders ?? 0}</strong>
          </div>
        </div>
      </div>

      <div className="panel">
        <h3>My Events</h3>
        {events.length === 0 ? (
          <p className="muted">No events found.</p>
        ) : (
          <div className="events-list">
            {events.map((event) => (
              <div key={event.id} className="list-card">
                <strong>{event.title}</strong>
                <div className="muted">
                  {event.date} {event.time ? `at ${event.time}` : ''}
                </div>
                <div className="muted">
                  {event.venue}, {event.city}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await apiGet('events.php')
        setEvents(res.events || [])
      } catch (err) {
        setError(err.message || 'Failed to load events')
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  return (
    <div className="page">
      <h1>Events</h1>
      {loading && <div className="panel">Loading events...</div>}
      {error && <div className="panel">{error}</div>}
      {!loading && !error && events.map((event) => (
        <div key={event.id} className="list-card">
          <strong>{event.title}</strong>
          <div className="muted">
            {event.date} {event.time ? `at ${event.time}` : ''}
          </div>
          <div className="muted">
            {event.venue}, {event.city}
          </div>
        </div>
      ))}
    </div>
  )
}

function Scanner() {
  return (
    <div className="page">
      <h1>Scanner</h1>
      <div className="scanner-card">
        <div className="scanner-box">Scanner API comes next</div>
      </div>
    </div>
  )
}

function Sales() {
  return (
    <div className="page">
      <h1>Sales</h1>
      <div className="panel">Sales API comes next</div>
    </div>
  )
}

function SettingsPage() {
  return (
    <div className="page">
      <h1>Settings</h1>
      <div className="panel">Organizer session and settings</div>
    </div>
  )
}

function Shell() {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { to: '/events', label: 'Events', icon: <CalendarDays size={18} /> },
    { to: '/scanner', label: 'Scanner', icon: <ScanLine size={18} /> },
    { to: '/sales', label: 'Sales', icon: <Receipt size={18} /> },
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
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/sales" element={<Sales />} />
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
