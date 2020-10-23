import React, { useState, useEffect } from 'react'

// import CTA from '../components/CTA'
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Bar } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { FilterIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  // TableFooter,
} from '@windmill/react-ui'

import {
  doughnutOptions,
  barOptions,
  doughnutLegends,
  barLegends
} from '../utils/demo/chartsData'
import SectionTitle from '../components/Typography/SectionTitle'
import AuthService from "../services/auth.service";

function Dashboard() {
  const currentNGO = AuthService.getCurrentNGO();
  // const result = response.data
  // console.log(result)
  console.log(currentNGO);
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  const [dataTable1, setDataTable1] = useState([])
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
      <PageTitle>Beneficiaries</PageTitle>

      {/* <CTA /> */}

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Wallet Balance" value="$125,000">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Amount Received" value="$46,760">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Amount Disbursed" value="$842,000">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Balance" value="$842,000">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      {/* <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User image" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$ {user.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer> */}

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

        {/* <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard> */}
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        {/* <ChartCard title="Beneficiary Age Group">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Beneficiary By Gender">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard> */}

        {/* <ChartCard title="Beneficiary Balance">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>

        <ChartCard title="Beneficiary By Location">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard> */}

        {/* <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard> */}
      </div>

      <div className="flex space-x-4 align-center justify-center m-4">
        <div className="w-1/2">
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="search"
            type="search"
            placeholder="Search Transactions"
          ></input>
        </div>
        <div className="w-2/3">
          <div class="flex bg-transparent w-1/6 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white text-center py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          < FilterIcon className="mr-2 w-5 h-5" />
            Filter
          </div>
        </div>
      </div>

      {/* <SectionTitle>Transactions</SectionTitle> */}
      <TableContainer className="pb-4">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Reference ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Beneficiary</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User image" /> */}
                    <div>
                      <p className="font-semibold">AX33P4</p>
                      {/* <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p> */}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$44444</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">Transfer</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">adafdasdfsfd</span>
                </TableCell>
                <TableCell>
                <TableCell>
                  <span className="text-sm">20.10.20</span>
                </TableCell>
                  {/* <Badge type={user.status}>{user.status}</Badge> */}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User image" /> */}
                    <div>
                      <p className="font-semibold">AX33P4</p>
                      {/* <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p> */}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$44444</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">Transfer</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">adafdasdfsfd</span>
                </TableCell>
                <TableCell>
                <TableCell>
                  <span className="text-sm">20.10.20</span>
                </TableCell>
                  {/* <Badge type={user.status}>{user.status}</Badge> */}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User image" /> */}
                    <div>
                      <p className="font-semibold">AX33P4</p>
                      {/* <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p> */}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$44444</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">Transfer</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">adafdasdfsfd</span>
                </TableCell>
                <TableCell>
                <TableCell>
                  <span className="text-sm">20.10.20</span>
                </TableCell>
                  {/* <Badge type={user.status}>{user.status}</Badge> */}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User image" /> */}
                    <div>
                      <p className="font-semibold">AX33P4</p>
                      {/* <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p> */}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$44444</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">Transfer</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">adafdasdfsfd</span>
                </TableCell>
                <TableCell>
                <TableCell>
                  <span className="text-sm">20.10.20</span>
                </TableCell>
                  {/* <Badge type={user.status}>{user.status}</Badge> */}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User image" /> */}
                    <div>
                      <p className="font-semibold">AX33P4</p>
                      {/* <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p> */}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$44444</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">Transfer</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">adafdasdfsfd</span>
                </TableCell>
                <TableCell>
                <TableCell>
                  <span className="text-sm">20.10.20</span>
                </TableCell>
                  {/* <Badge type={user.status}>{user.status}</Badge> */}
                </TableCell>
              </TableRow>
        
          </TableBody>
        </Table>
        {/* <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter> */}
      </TableContainer>
    </>
  )
}

export default Dashboard
