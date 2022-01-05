import React from 'react'
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

const Table = ({ columns, rows }) => {
  return (
    <table>
      <caption>Routes</caption>
      <tr>
        {columns.map(column => (
          <th>{column.name}</th>
        ))}
      </tr>
      {rows.map(row => (
        <tr>
          {columns.map(column => (
            <td>{column.format(row[column.property])}</td>
          ))}
        </tr>
      ))}
    </table>
  )
}

const App = () => {
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <Table className="routes-table" columns={columns} rows={routes} />
      </section>
    </div>
  )
}

export default App
