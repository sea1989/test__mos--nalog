import React, { useEffect, useState } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const baseUrl = 'https://covid-api.mmediagroup.fr/v1/cases'

const getRegionalIndicatorSymbol = (letter) => {
  return String.fromCodePoint(0x1f1e6 - 65 + letter.toUpperCase().charCodeAt(0))
}
const getEmojiCountryFlag = (country) => {
  if (country) {
    return getRegionalIndicatorSymbol(country[0]) + getRegionalIndicatorSymbol(country[1])
  }
  return null
}

const Dashboard = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((rawData) => {
        const data = []
        for (const countriesName in rawData) {
          data.push({
            countriesName,
            confirmed: rawData[countriesName].All.confirmed,
            location: rawData[countriesName].All.location,
            deaths: rawData[countriesName].All.deaths,
            continent: rawData[countriesName].All.continent,
            recovered: rawData[countriesName].All.recovered,
            abbreviation: rawData[countriesName].All.abbreviation,
          })
        }
        setData(data)
      })
  }, [])

  const sortHandler = (type, method) => () => {
    const newData = [...data]

    newData.sort((a, b) => {
      if (method === 'asc') return a[type] - b[type]
      if (method === 'desc') return a[type] + b[type]
    })

    setData(newData)
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic {' & '} Sales</CCardHeader>
            <CCardBody>
              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Страна</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Континент</CTableHeaderCell>
                    <CTableHeaderCell>Регион</CTableHeaderCell>
                    <CTableHeaderCell
                      className="text-center"
                      onClick={sortHandler('confirmed', 'asc')}
                    >
                      Подтвержденные случаи
                    </CTableHeaderCell>
                    <CTableHeaderCell>Выздоровевшие</CTableHeaderCell>
                    <CTableHeaderCell onClick={sortHandler('deaths', 'asc')}>
                      Смерти
                    </CTableHeaderCell>
                    <CTableHeaderCell>Emoji</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.countriesName}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.continent}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {/* <CIcon size="xl" icon={item.country.flag} title={item.country.name} /> */}
                        <div>{item.location}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>{item.confirmed}</strong>
                          </div>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div className="small text-medium-emphasis">{item.recovered}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{item.deaths}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{getEmojiCountryFlag(item.abbreviation)}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
