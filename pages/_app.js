import '../styles/globals.css'
import Link from 'next/link'
import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import Image from 'next/Image'
import Footer from '../components/footer';
import Layout from '../components/layout'


function MyApp({ Component, pageProps }) {
  useEffect( () => { document.querySelector("body").classList.add("bg-gray-100") } );
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
