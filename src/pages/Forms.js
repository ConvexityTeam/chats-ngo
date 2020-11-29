import React, { useEffect, useState } from 'react'
import CampaignDataService from "../services/campaign.service";
import PageTitle from '../components/Typography/PageTitle'
import NGODataService from "../services/organization.service";

import {  
  Modal, ModalHeader, ModalBody, ModalFooter,
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  // Avatar,
  Button,
  Badge,
  Pagination,
} from '@windmill/react-ui'
import { FilterIcon } from "../icons";

import response from '../utils/demo/tableData'

const Forms = () => {

  const initialCampaignState = {
    title: "",
    description: "",
    budget: "",
    start_date: "",
    end_date: ""
  };

  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [campaign, setCampaign] = useState(initialCampaignState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCampaign({ ...campaign, [name]: value });
  };

  const saveCampaign = () => {
    var data = {
      title: campaign.title,
      description: campaign.description,
      budget: campaign.budget,
      start_date: campaign.start_date,
      end_date: campaign.end_date
    };

    CampaignDataService.create(data)
      .then(response => {
        setCampaign({
          title: response.data.title,
          description: response.data.description,
          budget: response.data.budget,
          start_date: response.data.start_date,
          end_date: response.data.end_date
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        alert("There was an error creating the campaign!")
        setIsModalOpen(false);
        console.log(e);
      });
  };

  // const newCampaign = () => {
  //   setCampaign(initialCampaignState);
  //   setSubmitted(false);
  // };

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    retrieveCampaigns();
  }, []);


  const retrieveCampaigns = () => {
    CampaignDataService.getAll()
      .then(response => {
        setData(response.data);
        console.log(response.data);
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <PageTitle>Campaigns</PageTitle>
      <div>
        <div className="flex flex-row space-x-4 align-center justify-center m-4">
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
        <div class="flex bg-white-200 p-4 justify-end">
        <span class="block text-white-700 text-center bg-white-400 px-4 py-2"><Button onClick={openModal}>Create Campaign</Button></span>
        {/* <span class="block text-gray-700 text-center bg-gray-400 px-4 py-2 mt-2">2</span>
        <span class="block text-gray-700 text-center bg-gray-400 px-4 py-2 mt-2">3</span> */}
        </div>
      </div>
      

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        
        {submitted ? (
          <>
          <ModalBody>
            <h4 className="text-4xl">Campaign Created Successfully!</h4>
          </ModalBody>
          <ModalFooter>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button onClick={closeModal}>Okay</Button>
          </div>
          {/* <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div> */}
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Create Campaign
            </Button>
          </div>
        </ModalFooter>
          </>
        ) : (
          <>
        <ModalHeader>New Campaign</ModalHeader>
        <ModalBody>
        
          <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                  Title
                </label>
                <input 
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                  id="title" 
                  required
                  value={campaign.title}
                  onChange={handleInputChange} 
                  name="title"
                  placeholder="Name of the Campaign" 
                />
                <p className="text-gray-600 text-xs italic"></p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                  Description
                </label>
                <input 
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                  id="description"
                  required
                  value={campaign.description}
                  onChange={handleInputChange} 
                  name="description" 
                  placeholder="" 
                />
                <p className="text-gray-600 text-xs italic"></p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                  Total Amount
                </label>
                <input 
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-grey-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                  id="budget" 
                  required
                  value={campaign.budget}
                  onChange={handleInputChange} 
                  name="budget" 
                  placeholder="Campaign Budget" 
                />
                <p className="text-red-500 text-xs italic"></p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                  {/* Amount Per Recipient */}
                  Start Date
                </label>
                <input 
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                  id="start_date" 
                  type="text" 
                  required
                  value={campaign.start_date}
                  onChange={handleInputChange} 
                  name="start_date"
                  placeholder="Start Date" 
                />
              </div>
            </div>
            
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                  Location
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    <option>Borno</option>
                    <option>Adamawa</option>
                    <option>Yobe</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                  End Date
                </label>
                <input 
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                  id="end_date" 
                  type="text"
                  required
                  value={campaign.end_date}
                  onChange={handleInputChange} 
                  name="end_date" 
                  placeholder="" 
                />
              </div>
              
              {/* <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                  Zip
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" />
              </div> */}
            </div>
          </form>
       
        
        </ModalBody>
        <ModalFooter>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button onClick={saveCampaign}>Save</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Create Campaign
            </Button>
          </div>
        </ModalFooter>
        </>
         )}
      </Modal>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Budget</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.data && data.data.map((data, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User image" /> */}
                    <div>
                      <p className="font-semibold">{data.title}</p>
                      {/* <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p> */}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">${data.budget}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(data.start_date).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(data.end_date).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                <TableCell>
                  <span className="text-sm">Ongoing</span>
                </TableCell>
                  {/* <Badge type={user.status}>{user.status}</Badge> */}
                </TableCell>
              </TableRow>
            ))}
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

export default Forms
