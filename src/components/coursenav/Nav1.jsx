import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const semesters = [
  { label: 'Sem 1', path: '/courses/firstsemester' },
  { label: 'Sem 2', path: '/courses/secondsemester' },
  { label: 'Sem 3', path: '/courses/thirdsemester' },
  { label: 'Sem 4', path: '/courses/fourthsemester' },
  { label: 'Sem 5', path: '/courses/fifthsemester' },
  { label: 'Sem 6', path: '/courses/sixthsemester' },
  { label: 'Sem 7', path: '/courses/seventhsemester' },
  { label: 'Sem 8', path: '/courses/eighthsemester' },
]

const Nav1 = () => {
  const location = useLocation()

  return (
    <div style={{ display: 'flex', gap: '2px', borderBottom: '1px solid #e0e0e0', overflowX: 'auto' }}>
      {semesters.map(({ label, path }) => {
        const active = location.pathname === path
        return (
          <Link
            key={path}
            to={path}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              color: active ? '#534AB7' : '#888',
              fontWeight: active ? 500 : 400,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              borderBottom: `2px solid ${active ? '#534AB7' : 'transparent'}`,
              marginBottom: '-1px',
            }}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}

export default Nav1