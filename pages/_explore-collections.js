import React from 'react'
import { TabGroup } from '@statikly/funk'
import Uncategorized from './uncategorized';
import GameCards from './gamecards';
import Books from './books';

const tabs = [
    { key: 0, label: 'Uncategorized' },
    { key: 1, label: 'Gamecards' },
    { key: 2, label: 'Books' }
]

const ExploreCollection = () => {
    return(
        <>
            <div className="mt-20">
                <TabGroup numTabs={3} direction={TabGroup.direction.HORIZONTAL}>
                    <TabGroup.TabList>
                        { 
                            tabs.map((tab) => (
                                <TabGroup.Tab
                                    index={tab.key}
                                    key={tab.label}
                                    className="h-12 px-12 transition-colors duration-150 text-xs font-bold"
                                    activeClassName="bg-violet-600 text-white"
                                    inactiveClassName="text-black"
                                >
                                {tab.label.toUpperCase()}
                                </TabGroup.Tab>
                            ))
                        }
                    </TabGroup.TabList>
                    <div className='border-t table w-full divide-y divide-solid md:divide-solid l:divide-solid'>
                        <TabGroup.TabPanel
                        index={0}
                        className="table-row p-16 transition-all transform h-64"
                        activeClassName="block duration-500 translate-x-0"
                        inactiveClassName="none -translate-x-2"
                        >
                            <Uncategorized/>
                        </TabGroup.TabPanel>

                        <TabGroup.TabPanel
                        index={1}
                        className="table-row p-16 transition-all transform h-64 flex-col"
                        activeClassName="block duration-500 translate-x-0"
                        inactiveClassName="none -translate-x-2"
                        >
                            <GameCards />
                        </TabGroup.TabPanel>

                        <TabGroup.TabPanel
                        index={2}
                        className="table-row p-16 transition-all transform h-64"
                        activeClassName="block duration-500 translate-x-0"
                        inactiveClassName="none -translate-x-2"
                        >
                            <Books />
                        </TabGroup.TabPanel>
                    </div>
                </TabGroup>
            </div>
        </>
    );
}

export default ExploreCollection;