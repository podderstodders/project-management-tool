import { UseBoardContext } from "../../context/boardcontext";
import { UseNotificationContext } from "../../context/notificationcontext";

type boardMenuDefaultViewProps = {
    currentState: string
    stateChange: (str: string) => void;
}

export const BoardMenuDefaultView: React.FC<boardMenuDefaultViewProps> = ({currentState, stateChange}) => {
    const {state, dispatch} = UseBoardContext()
    const {showNotification} = UseNotificationContext()
    const boardWatchHandler = () => {
      dispatch({type: 'UPDATE_CURRENT_BOARD', payload: {...state.currentBoard, isWatching: !state.currentBoard.isWatching}})
      showNotification('Updated Watching Status of Board', "info", 1200)
    }
    if(currentState !== 'menu') return null 
    return (
        <>
        <div className="boardmenu-view">
          <div className="app-menu--row items">
          <div className="items-row" onClick={() => stateChange('about')}>
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
              <p>About This Board</p>
              <p>Add a description to your board</p>
            </div>
          </div>
          <div className="items-row" onClick={() => stateChange('activity')}>
            <div className="items-row--svg">
              <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M0 1.5C0 1.22386 0.223858 1 0.5 1H2.5C2.77614 1 3 1.22386 3 1.5C3 1.77614 2.77614 2 2.5 2H0.5C0.223858 2 0 1.77614 0 1.5ZM4 1.5C4 1.22386 4.22386 1 4.5 1H14.5C14.7761 1 15 1.22386 15 1.5C15 1.77614 14.7761 2 14.5 2H4.5C4.22386 2 4 1.77614 4 1.5ZM4 4.5C4 4.22386 4.22386 4 4.5 4H11.5C11.7761 4 12 4.22386 12 4.5C12 4.77614 11.7761 5 11.5 5H4.5C4.22386 5 4 4.77614 4 4.5ZM0 7.5C0 7.22386 0.223858 7 0.5 7H2.5C2.77614 7 3 7.22386 3 7.5C3 7.77614 2.77614 8 2.5 8H0.5C0.223858 8 0 7.77614 0 7.5ZM4 7.5C4 7.22386 4.22386 7 4.5 7H14.5C14.7761 7 15 7.22386 15 7.5C15 7.77614 14.7761 8 14.5 8H4.5C4.22386 8 4 7.77614 4 7.5ZM4 10.5C4 10.2239 4.22386 10 4.5 10H11.5C11.7761 10 12 10.2239 12 10.5C12 10.7761 11.7761 11 11.5 11H4.5C4.22386 11 4 10.7761 4 10.5ZM0 13.5C0 13.2239 0.223858 13 0.5 13H2.5C2.77614 13 3 13.2239 3 13.5C3 13.7761 2.77614 14 2.5 14H0.5C0.223858 14 0 13.7761 0 13.5ZM4 13.5C4 13.2239 4.22386 13 4.5 13H14.5C14.7761 13 15 13.2239 15 13.5C15 13.7761 14.7761 14 14.5 14H4.5C4.22386 14 4 13.7761 4 13.5Z" fill="#000000"/></svg>
            </div>
            <div className="items-row--text">Activity</div>
          </div>
          <div className="items-row" onClick={() => stateChange('archived')}>
            <div className="items-row--svg">
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M6.60035 9H17.4003M6.60035 9C6.04029 9 5.75957 9 5.54566 9.10899C5.3575 9.20487 5.20463 9.35774 5.10875 9.5459C4.99976 9.75981 4.99976 10.04 4.99976 10.6001V15.8001C4.99976 16.9202 4.99976 17.4804 5.21775 17.9082C5.40949 18.2845 5.71523 18.5905 6.09156 18.7822C6.51896 19 7.07875 19 8.19667 19H15.8025C16.9204 19 17.4794 19 17.9068 18.7822C18.2831 18.5905 18.5902 18.2844 18.782 17.9081C18.9998 17.4807 18.9998 16.9216 18.9998 15.8037V10.591C18.9998 10.037 18.9998 9.75865 18.8914 9.5459C18.7955 9.35774 18.6419 9.20487 18.4538 9.10899C18.2398 9 17.9604 9 17.4003 9M6.60035 9H4.97507C4.12597 9 3.70168 9 3.4607 8.85156C3.13911 8.65347 2.95678 8.29079 2.98902 7.91447C3.0132 7.63223 3.26593 7.29089 3.77222 6.60739C3.91866 6.40971 3.99189 6.31084 4.08152 6.23535C4.20104 6.1347 4.34286 6.06322 4.49488 6.02709C4.60889 6 4.73126 6 4.9773 6H19.0217C19.2677 6 19.3904 6 19.5044 6.02709C19.6564 6.06322 19.7982 6.1347 19.9177 6.23535C20.0074 6.31084 20.0809 6.40924 20.2273 6.60693C20.7336 7.29042 20.9867 7.63218 21.0109 7.91442C21.0432 8.29074 20.8602 8.65347 20.5386 8.85156C20.2976 9 19.8723 9 19.0232 9H17.4003M9.99976 14H13.9998" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="items-row--text">Archived Items</div>
          </div>
        </div>
        <div className="app-menu--row divider"></div>
        <div className="app-menu--row items">
          
          <div className="items-row" onClick={() => stateChange('change background')}>
            <div className="items-row--svg">
              <svg width="25" height="25" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="about-white" fill="#000000" transform="translate(42.666667, 42.666667)">
                      <path d="M213.333333,3.55271368e-14 C95.51296,3.55271368e-14 3.55271368e-14,95.51168 3.55271368e-14,213.333333 C3.55271368e-14,331.153707 95.51296,426.666667 213.333333,426.666667 C331.154987,426.666667 426.666667,331.153707 426.666667,213.333333 C426.666667,95.51168 331.154987,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,384 C119.227947,384 42.6666667,307.43872 42.6666667,213.333333 C42.6666667,119.227947 119.227947,42.6666667 213.333333,42.6666667 C307.44,42.6666667 384,119.227947 384,213.333333 C384,307.43872 307.44,384 213.333333,384 Z M240.04672,128 C240.04672,143.46752 228.785067,154.666667 213.55008,154.666667 C197.698773,154.666667 186.713387,143.46752 186.713387,127.704107 C186.713387,112.5536 197.99616,101.333333 213.55008,101.333333 C228.785067,101.333333 240.04672,112.5536 240.04672,128 Z M192.04672,192 L234.713387,192 L234.713387,320 L192.04672,320 L192.04672,192 Z" id="Shape"></path>
                  </g>
                </g>
              </svg>
            </div>
            <div className="items-row--text">Change background</div>
          </div>
          
        </div>
        <div className="app-menu--row divider"></div>
        <div className="app-menu--row items">
          <div className="items-row" onClick={boardWatchHandler}>
            <div className="items-row--svg">
              <svg width="25" height="25" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="about-white" fill="#000000" transform="translate(42.666667, 42.666667)">
                      <path d="M213.333333,3.55271368e-14 C95.51296,3.55271368e-14 3.55271368e-14,95.51168 3.55271368e-14,213.333333 C3.55271368e-14,331.153707 95.51296,426.666667 213.333333,426.666667 C331.154987,426.666667 426.666667,331.153707 426.666667,213.333333 C426.666667,95.51168 331.154987,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,384 C119.227947,384 42.6666667,307.43872 42.6666667,213.333333 C42.6666667,119.227947 119.227947,42.6666667 213.333333,42.6666667 C307.44,42.6666667 384,119.227947 384,213.333333 C384,307.43872 307.44,384 213.333333,384 Z M240.04672,128 C240.04672,143.46752 228.785067,154.666667 213.55008,154.666667 C197.698773,154.666667 186.713387,143.46752 186.713387,127.704107 C186.713387,112.5536 197.99616,101.333333 213.55008,101.333333 C228.785067,101.333333 240.04672,112.5536 240.04672,128 Z M192.04672,192 L234.713387,192 L234.713387,320 L192.04672,320 L192.04672,192 Z" id="Shape"></path>
                  </g>
                </g>
              </svg>
            </div>
            <div className={`items-row--text watch ${state.currentBoard.isWatching ? 'active' : undefined}`}>Watch</div>
          </div>
          <div className="items-row" onClick={() => stateChange('copy board')}>
            <div className="items-row--svg">
              <svg width="25" height="25" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="about-white" fill="#000000" transform="translate(42.666667, 42.666667)">
                      <path d="M213.333333,3.55271368e-14 C95.51296,3.55271368e-14 3.55271368e-14,95.51168 3.55271368e-14,213.333333 C3.55271368e-14,331.153707 95.51296,426.666667 213.333333,426.666667 C331.154987,426.666667 426.666667,331.153707 426.666667,213.333333 C426.666667,95.51168 331.154987,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,384 C119.227947,384 42.6666667,307.43872 42.6666667,213.333333 C42.6666667,119.227947 119.227947,42.6666667 213.333333,42.6666667 C307.44,42.6666667 384,119.227947 384,213.333333 C384,307.43872 307.44,384 213.333333,384 Z M240.04672,128 C240.04672,143.46752 228.785067,154.666667 213.55008,154.666667 C197.698773,154.666667 186.713387,143.46752 186.713387,127.704107 C186.713387,112.5536 197.99616,101.333333 213.55008,101.333333 C228.785067,101.333333 240.04672,112.5536 240.04672,128 Z M192.04672,192 L234.713387,192 L234.713387,320 L192.04672,320 L192.04672,192 Z" id="Shape"></path>
                  </g>
                </g>
              </svg>
            </div>
            <div className="items-row--text">Copy Board</div>
          </div>
          <div className="items-row" onClick={() => stateChange('remove board')}> 
            <div className="items-row--svg">
              <svg width="25" height="25" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="about-white" fill="#000000" transform="translate(42.666667, 42.666667)">
                      <path d="M213.333333,3.55271368e-14 C95.51296,3.55271368e-14 3.55271368e-14,95.51168 3.55271368e-14,213.333333 C3.55271368e-14,331.153707 95.51296,426.666667 213.333333,426.666667 C331.154987,426.666667 426.666667,331.153707 426.666667,213.333333 C426.666667,95.51168 331.154987,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,384 C119.227947,384 42.6666667,307.43872 42.6666667,213.333333 C42.6666667,119.227947 119.227947,42.6666667 213.333333,42.6666667 C307.44,42.6666667 384,119.227947 384,213.333333 C384,307.43872 307.44,384 213.333333,384 Z M240.04672,128 C240.04672,143.46752 228.785067,154.666667 213.55008,154.666667 C197.698773,154.666667 186.713387,143.46752 186.713387,127.704107 C186.713387,112.5536 197.99616,101.333333 213.55008,101.333333 C228.785067,101.333333 240.04672,112.5536 240.04672,128 Z M192.04672,192 L234.713387,192 L234.713387,320 L192.04672,320 L192.04672,192 Z" id="Shape"></path>
                  </g>
                </g>
              </svg>
            </div>
            <div className="items-row--text">Remove Board</div>
          </div>
        </div>
        </div>
        </>
    )
}