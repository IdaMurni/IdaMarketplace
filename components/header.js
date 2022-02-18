/* This example requires Tailwind CSS v2.0+ */
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
                          <img
                            src="https://lh3.googleusercontent.com/_lEJLjbAHoNIf7vMVT_jEPY6r4SM250l4sFf-ECplvKWcyfUMjmWkEHmU_pMzK1PJqvJ0Iqic5sRlq4VhhSv7NNHIGd55Y1K-krCzQ=w600"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            src="https://lh3.googleusercontent.com/HZ7rUIGLe4mKARU4TY3FgbpllQVdk1KjWaRl6lsae8oH9l8CX4x4tIFqEUgAHOo4jKFeqrRX2yFcubrvSrjKYRzjG7lD7WD6MreurA=w600"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            src="https://lh3.googleusercontent.com/CXqt54i1rk0GQU6cvHoronsUZVmpVyRDYVf6i9iDEkXPXi0JQOXTYLHtuaxpMKDbndR_14ROeLvONDR-msEs3UqiCSz4p0cZN1Hsqw=w600"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            src="https://lh3.googleusercontent.com/tPF_kNi4MXXTLf1A3y7FHVNXx8xkTiaXxZ-pLSbniM3eOGdROP4SyUb5d-cPnS0oRr51q40F_ftrxOBv-wFqryDaKHl4S3TtTXZnWg=w600"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            src="https://lh3.googleusercontent.com/9TUSjw1X6WrXBn_nM6BgioSkO_FiWA4-xSo3CjnZcKNg5Z5ZVCD0r_0oM5L5BQmPWoKZ3wv97tVrk8gQEIi3s-C44r8jPTF3vGynzQ=w600"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            src="https://lh3.googleusercontent.com/xC6dl4VKIB1XnO6lH0i_WDqlpKfBNRMfTGlIJq9JRS78ht7So39CdDxjGOX965N7LrWpO71IpOVgMn1TjZ60ATpq0QGQGlQm2r6zBA=w600"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            src="https://lh3.googleusercontent.com/iiy1YCw4jLYvbEu-EbcmuL4wE_FAXTjcIb0YffVTKAWeYNX07H8rxQU-4Jjj1iw96yIFBW_f6UOrRGykt8VMO7MgLFfljKdXxUK2=w600"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  
                <a
                  href="#"
                  className="inline-block text-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700"
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
  