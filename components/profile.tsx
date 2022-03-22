export default function Profile({data}) {
    return(
        <>  
            <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                        <img
                            alt="..."
                            src= { data.userAccount 
                            ? data.avatar.generateAvatar({   
                            username: data.userAccount, 
                            background: data.avatar.BackgroundSets.RandomBackground1,
                            characters: data.avatar.CharacterSets.Robots
                            }) : 'polygon.png'}
                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                            style={{ maxWidth: "150px" }}/>
                    </div>
                </div>
                <button onClick={data.logout}
                    className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                >
                    Disconnect
                </button>
                <div className="w-full lg:w-x4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            22
                            </span>
                            <span className="text-sm text-gray-500">Friends</span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            10
                            </span>
                            <span className="text-sm text-gray-500">Photos</span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            89
                            </span>
                            <span className="text-sm text-gray-500">Comments</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                    Jenna Stones
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                    {data.userAccount ? (
                        <span>Network: {data.chainId} 🟢  Connected</span>
                    
                    ) : <span>⚪️  Logged out</span> }
                    <span className="block">{data.userAccount}</span>
                </div>
            </div>
        </>
    )
}