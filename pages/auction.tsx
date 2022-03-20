import Breadcrumbs from '../components/breadcrumbs';

export default function Assets() {
  const product = {
    breadcrumbs: [
      { id: 1, name: 'Auction', href: '/auction' },
    ],
    highlights: [
      'Gold 70%',
      'Single Fighter',
      'Two Katanas',
      'Power 70%',
    ],

}
  return (
    <>
        <div className="pl-4 pt-10 mb-10">
            <Breadcrumbs data={product} />
        </div>
        <div className="flex items-center justify-center h-screen">
            <p className="text-2xl text-black md:text-2xl lg:text-2xl">200 | Auction Page</p>
        </div>
    </>
  )
}