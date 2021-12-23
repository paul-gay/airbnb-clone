import { useState } from "react"
import Image from "next/image"
import { useRouter } from 'next/dist/client/router'

import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/solid'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file


const Header = ({ placeholder }) => {
    const router = useRouter()

    const [searchInput, setSearchInput] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1)

    // react-date-range handleSelect function comes with a 'ranges' user selects
    const handleSelect = (ranges) => {
        console.log(endDate, startDate)
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    const resetInput = () => {
        setSearchInput('')
    }

    const search = () => {
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuests,
            }
        })
    }

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    }

    

    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white md:shadow-sm p-5 md:px-10">

            <div onClick={() => router.push('/')} className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image
                    src='https://links.papareact.com/qd3'
                    layout="fill"
                    objectFit="contain"
                    objectPosition='left'
                />
            </div>

            <div className="flex items-center py-2 md:border-2 rounded-full">
                <input 
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="ml-5 bg:transparent outline-none focus:outline-none flex-grow text-sm text-gray-600 placeholder-gray-400" 
                    type="text" 
                    placeholder={placeholder || "Search Properties" }
                />
                <SearchIcon className="h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer hidden md:inline-flex md:mx-2"/>
            </div>

            <div className="flex items-center justify-end space-x-4 text-gray-500">
                <p className="hidden md:inline cursor-pointer">Become a Host</p>
                <GlobeAltIcon  className="h-6 cursor-pointer"/>

                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon className="h-6 cursor-pointer" />
                    <UserCircleIcon className="h-6 cursor-pointer" />
                </div>
            </div>

            {/* only show if searchInput has a value (truthy) */}
            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto mt-4">
                    <DateRangePicker 
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={['#FD5B61']}
                        onChange={handleSelect}
                        
                    />
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>

                        <UsersIcon className="h-5"/>
                        <input 
                            value={noOfGuests}
                            onChange={(e) => setNoOfGuests(e.target.value)}
                            type="number" 
                            min={1}
                            className="w-12 pl-2 text-lg outline-none text-red-400" 
                        />
                    </div>

                    <div className="flex">
                        <button 
                            className="flex-grow text-gray-500"
                            onClick={resetInput}
                        >   
                            Cancel
                        </button>
                        <button 
                            onClick={search}
                            className="flex-grow text-red-400"
                        >
                            Search
                        </button>
                    </div>

                </div>
                
            )}

        </header>
    )
}

export default Header
