import React, { useState, useEffect } from 'react'
import { Card, CardBody } from '@windmill/react-ui'
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
  barLegends,
  beneficiaryAgeGroup
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
      <PageTitle className="font-mono">Dashboard</PageTitle>

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

      
      <div className="grid gap-6 mb-8 md:grid-cols-4">
        <Card className="shadow-md">
          <CardBody>
            <p className="mb-4 font text-gray-600 dark:text-gray-300 font-semibold">Total Count</p>
            <p className="text-gray-600 dark:text-gray-400">
              Beneficiaries
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-medium text-2xl">
              842,000
            </p>
            <p className="mt-6 text-gray-600 dark:text-gray-400">
              Vendors
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-medium text-2xl">
              142,000
            </p>
          </CardBody>
        </Card>
         <ChartCard title="Beneficiary Age Group">
            <Doughnut {...doughnutOptions} />
            <ChartLegend legends={beneficiaryAgeGroup} />
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

      <div className="grid gap-6 mb-8 md:grid-cols-4">
        <Card className="shadow-md">
          <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Metrics</p>
            <p className="mb-2 text-gray-600 dark:text-gray-400">
              Maximum Disbursement Date
            </p>
            <p className="mb-4 text-gray-600 dark:text-gray-400 font-medium">
              12/04/2020
            </p>
            <p className="mb-2 text-gray-600 dark:text-gray-400">
              Minimum Disbursement Date
            </p>
            <p className="mb-4 text-gray-600 dark:text-gray-400 font-medium">
            12/04/2020
            </p>
            <p className="mb-2 text-gray-600 dark:text-gray-400">
              Maximum Spending Date
            </p>
            <p className="mb-4 text-gray-600 dark:text-gray-400 font-medium">
              12/04/2020
            </p>
            <p className="mb-2 text-gray-600 dark:text-gray-400">
              Minimum Spending Date
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
            12/04/2020
            </p>
          </CardBody>
        </Card>
        <ChartCard title="Beneficiary Balance">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>

        <ChartCard title="Beneficiary By Location">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
        
        <Card className="shadow-md">
          <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Vendors</p>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Dangote Flour Mill
            </p>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Cadbury Nigeria
            </p>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Nestle Foods
            </p>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Kellogs Cereal
            </p>
          </CardBody> 
        </Card>
      </div>
    </>
  )
}

export default Dashboard
