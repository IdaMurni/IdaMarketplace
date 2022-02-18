import '../styles/globals.css'
import Link from 'next/link'
import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import Teasers from '../components/teasers'
import Header from '../components/header'

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Dashboard', href: 'dashboard', current: false },
  { name: 'Create NFT', href: 'create-item', current: false },
  { name: 'Assets', href: 'assets', current: false },
]

function MyApp({ Component, pageProps }) {
  useEffect( () => { document.querySelector("body").classList.add("bg-gray-100") } );
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <div className="relative">
      <div className="z-10 fixed w-full inset-0">
        <Disclosure as="nav" className="bg-white shadow-lg">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex-shrink-0 flex items-center">
                      <img
                        className="block lg:hidden h-8 w-auto"
                        src="https://raw.githubusercontent.com/1Hive/dao-list/master/assets/IdaMurni/logo.png"
                        alt="IdaMurni"
                      />
                      <img
                        className="hidden lg:block h-8 w-auto"
                        src="https://raw.githubusercontent.com/1Hive/dao-list/master/assets/IdaMurni/logo_type.png"
                        alt="IdaMurni"
                      />
                    </div>
                    <div className="hidden sm:block sm:ml-6">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    <div className="md:container md:mx-auto md:mt-14 xl:mt-14 lg:mt-14 bg-white">
      <Header></Header>
      <Teasers></Teasers>
      <Component {...pageProps} />
    </div>
    </div>
  )
}

export default MyApp
