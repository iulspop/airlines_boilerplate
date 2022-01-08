import React, { useState } from 'react'
import './App.css'
import { routes, airlines, airports } from './data'

// const routes = [
//   {"airline":24,"src":"DFW","dest":"XNA"},

// const airlines = [
//   {"id":24,"name":"American Airlines"},

// const airports = [
//   {"code":"YEG","name":"Edmonton International Airport","lat":53.309700012200004,"long":-113.580001831},

const getAirlineById = id => airlines.find(airline => airline.id === id).name

const getAirportByCode = code => airports.find(airport => airport.code === code).name

const columns = [
  { name: 'Airline', property: 'airline', format: getAirlineById },
  { name: 'Source Airport', property: 'src', format: getAirportByCode },
  { name: 'Destination Airport', property: 'dest', format: getAirportByCode },
]

const Table = ({ columns, rows, perPage }) => {
  const [start, setStart] = useState(0)

  const handlePrev = () => {
    let newStart = start - perPage
    if (newStart <= 0) {
      newStart = 0
    } 
    setStart(newStart)
  }

  const handleNext = () => {
    if (start + perPage >= rows.length) return
    setStart(start + perPage)
  }

  return (
    <>
    <button onClick={handlePrev} disabled={start <= 0}>Prev Page</button>
    <button onClick={handleNext} disabled={start + perPage >= rows.length}>Next Page</button>
    <table>
      <caption>Showing {start + 1}-{start + perPage} of {rows.length} routes</caption>
      <tr>
        {columns.map(column => (
          <th>{column.name}</th>
        ))}
      </tr>
      {rows.slice(start, start + perPage).map(row => (
        <tr>
          {columns.map(column => (
            <td>{column.format(row[column.property])}</td>
          ))}
        </tr>
      ))}
    </table>
    </>
  )
}

const App = () => {
  const [selectedAirline, setSelectedAirline] = useState("all")

  const filterRoutesByAirline = (routes, selectedAirline) => {
    if (selectedAirline === "all") {
      return routes;
    }
    return routes.filter(route => route.airline === Number(selectedAirline));
  }

  const displayedRoutes = filterRoutesByAirline(routes, selectedAirline);

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <form>
          <select onChange={(event) => setSelectedAirline(event.target.value)} value={selectedAirline}>
            <option value="all">All Airlines</option>
            {airlines.map(airline => <option value={airline.id}>{airline.name}</option>)}
          </select>
        </form>
        <Table className="routes-table" columns={columns} rows={displayedRoutes} perPage={25}/>
      </section>
    </div>
  )
}

export default App
