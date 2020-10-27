import React, { useState, useEffect } from 'react'

import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Bar } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import response from '../utils/demo/tableData'


import {
  doughnutOptions,
  barOptions,
  doughnutLegends,
  barLegends
} from '../utils/demo/chartsData'

import AuthService from "../services/auth.service";

function Dashboard() {
  const currentNGO = AuthService.getCurrentNGO();
  // const result = response.data
  // console.log(result)
  console.log(currentNGO);
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  // pagination setup
  const resultsPerPage = 10
  // const totalResults = response.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page])

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Wallet Balance" value="$125,000">
        </InfoCard>

        <InfoCard title="Total Amount Received" value="$46,760">
        </InfoCard>

        <InfoCard title="Total Amount Disbursed" value="$842,000">
        </InfoCard>

        <InfoCard title="Total Balance" value="$842,000">
        </InfoCard>
      </div>

      <PageTitle>Charts</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-3">
        <ChartCard title="Beneficiary Age Group">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Beneficiary By Gender">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Vendor Transaction By Beneficiary">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">

        <ChartCard title="Beneficiary Balance">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>

        <ChartCard title="Beneficiary By Location">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
      </div>
    </>
  )
}

export default Dashboard
