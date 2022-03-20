import Image from 'next/Image'

export default function Header() {
    return (
      <div className="relative bg-white overflow-hidden">
        <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                Find your Collection 
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                IdaMarketplace Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                          <Image
                            src="/NFTs/gaisha_02.jpg"
                            alt=""
                            className="w-full h-full object-center object-cover"
                            width={300}
                            height={500}
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <Image
                            src="/NFTs/gaisha.jpg"
                            alt=""
                            className="w-full h-full object-center object-cover"
                            width={300}
                            height={500}
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <Image
                            src="/NFTs/lady_dragon.jpg"
                            alt=""
                            className="w-full h-full object-center object-cover"
                            width={300}
                            height={500}
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <Image
                            src="/NFTs/lady_samurai.jpg"
                            alt=""
                            className="w-full h-full object-center object-cover"
                            width={300}
                            height={500}
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <Image
                            src="/NFTs/samurai_01.jpg"
                            alt=""
                            className="w-full h-full object-center object-cover"
                            width={300}
                            height={500}
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <Image
                            src="/NFTs/samurai_warior.jpg"
                            alt=""
                            className="w-full h-full object-center object-cover"
                            width={300}
                            height={500}
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <Image
                            src="/NFTs/vikings.jpg"
                            alt=""
                            className="w-full h-full object-center object-cover"
                            width={300}
                            height={500}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  
                <a
                  href="#"
                  className="inline-block text-center bg-violet-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-violet-700"
                >
                  Shop Collection
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  