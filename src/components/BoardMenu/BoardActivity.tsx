type boardActivityProps = {
    state: string 
}

export const BoardActivity: React.FC<boardActivityProps> = ({state}) => {

    if(state !== 'activity') return null 
    return (
        <>
        <div className="app-menu--row flexedactivities">
          <button className="btn-primary">All</button>
          <button className="btn-darker">Comments</button>
        </div>  
        <div className="app-menu--row divider"></div>         
        <div className="app-menu--row items">
            {
                Array(10).fill(0).map((_, i) => (
                    <div className="items-row" style={{cursor: 'text'}} key={i}>
                        <div className="items-row--svg">
                            <svg width="25" height="25" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="about-white" fill="#000000" transform="translate(42.666667, 42.666667)">
                                    <path d="M213.333333,3.55271368e-14 C95.51296,3.55271368e-14 3.55271368e-14,95.51168 3.55271368e-14,213.333333 C3.55271368e-14,331.153707 95.51296,426.666667 213.333333,426.666667 C331.154987,426.666667 426.666667,331.153707 426.666667,213.333333 C426.666667,95.51168 331.154987,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,384 C119.227947,384 42.6666667,307.43872 42.6666667,213.333333 C42.6666667,119.227947 119.227947,42.6666667 213.333333,42.6666667 C307.44,42.6666667 384,119.227947 384,213.333333 C384,307.43872 307.44,384 213.333333,384 Z M240.04672,128 C240.04672,143.46752 228.785067,154.666667 213.55008,154.666667 C197.698773,154.666667 186.713387,143.46752 186.713387,127.704107 C186.713387,112.5536 197.99616,101.333333 213.55008,101.333333 C228.785067,101.333333 240.04672,112.5536 240.04672,128 Z M192.04672,192 L234.713387,192 L234.713387,320 L192.04672,320 L192.04672,192 Z" id="Shape"></path>
                                </g>
                                </g>
                            </svg>
                        </div>
                        <div className="items-row--text">
                            <p><span style={{fontWeight: '600'}}>You</span> did {`this`} of this board</p>
                            <p style={{fontSize: '12px', color: '#44546f', fontWeight: '400'}}>yesterday at 4:{i + 10}AM</p>
                        </div>
                </div>
                ))
            }
          
        </div>
        </>
    )
}