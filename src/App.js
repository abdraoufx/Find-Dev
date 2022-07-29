import React, { useEffect, useState } from "react";
import "./css/sass/main.css"

const fetchData = (api) => {
  return fetch(api).then((resp) => resp).then((data) => data.json())
}

const editDate = (date) => {
  const normalDate = new Date(date);
  return `${normalDate.toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`
}

function App() {

  const [themeType, setThemeType] = useState(() => {
    let type;
    localStorage.getItem('theme-type') ? type = `${localStorage.getItem('theme-type')}` : type = 'dark';
    return type;
  }),
    [userData, setUserData] = useState({}),
    [searchValue, setSearchValue] = useState(''),
    [shouldRender, setShouldRender] = useState(false);

  const showImges = () => {
    if (themeType === 'dark') {
      return <img src="images/sun.svg" alt="Sun" onClick={(e) => {
        setThemeType('white')
        localStorage.setItem('theme-type', `white`);
        e.target.setAttribute('src', 'images/moon.svg')
      }} />
    } else if (themeType === 'white') {
      return <img src="images/moon.svg" alt="Moon" onClick={(e) => {
        setThemeType('dark')
        localStorage.setItem('theme-type', `dark`);
        e.target.setAttribute('src', 'images/sun.svg')
      }} />
    }
  }

  const checkData = () => {
    if (searchValue !== '') {
      fetchData(`https://api.github.com/users/${searchValue}`).then((data) => {
        setUserData(data);
        setShouldRender(true);
        setSearchValue('')
      })
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('theme-type')) {
      localStorage.setItem('theme-type', `${themeType}`)
    }
  }, [themeType])
  const renderDefaultData = () => {
    return (
      <>
        <img src='images/defaultP.png' alt="Avatar" className="user-details__img" />
        <div className={`content ${themeType}`}>
          <div className="head">
            <span className="name">No User Provided</span>
            <span className="joined-date">No User Provided</span>
          </div>
          <span className="username">No User Provided</span>
          <p className="bio">No User Provided</p>
          <div className="activities rounded">
            <div className="activities__repos">
              <h3 className="title">Repos</h3>
              <span className="repos-count">0</span>
            </div>
            <div className="activities__followers">
              <h3 className="title">Followers</h3>
              <span className="">0</span>
            </div>
            <div className="activities__following">
              <h3 className="title">Following</h3>
              <span className="">0</span>
            </div>
          </div>
          <div className="contact">
            <div className="left-side">
              <div className="location">
                <img src="images/location.svg" alt="Location" className="location" />
                <span>No Location</span>
              </div>
              <div className="link">
                <a href='https://www.github.com' target="_blank" rel="noreferrer">
                  <img src="images/link.svg" alt="Link" />
                </a>
                <a href='https://www.github.com' target="_blank" rel="noreferrer">Not Available</a>
              </div>
            </div>
            <div className="right-side">
              <div className="twitter">
                <a href='https://twitter.com/'
                  target="_blank"
                  rel="noreferrer">
                  <img src="images/twitter.svg" alt="Twitter" />
                </a>
                <span>Not Available</span>
              </div>
              <div className="hirable">
                <img src="images/hire.svg" alt="Stars" />
                <span>No User Provided</span>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderUserData = (userData) => {
    return (
      <>
        <img src={`${userData.avatar_url || 'images/defaultP.png'}`} alt="Avatar" className="user-details__img" />
        <div className={`content ${themeType}`}>
          <div className="head">
            <span className="name">{userData.name || 'This Profile Has No Full Name'}</span>
            <span className="joined-date">{`Joined ${editDate(userData.created_at)}` || 'No Join Time Provided'}</span>
          </div>
          <span className="username">{`@${userData.login}` || 'This Profile Has No Username'}</span>
          <p className="bio">
            {userData.bio || 'No Bio For This User'}
          </p>
          <div className="activities rounded">
            <div className="activities__repos">
              <h3 className="title">Repos</h3>
              <span className="repos-count">
                {userData.public_repos || '0'}
              </span>
            </div>
            <div className="activities__followers">
              <h3 className="title">Followers</h3>
              <span className="">{userData.followers || '0'}</span>
            </div>
            <div className="activities__following">
              <h3 className="title">Following</h3>
              <span className="">{userData.following || '0'}</span>
            </div>
          </div>
          <div className="contact">
            <div className="left-side">
              <div className="location">
                <img src="images/location.svg" alt="Location" className="location" />
                <span>{userData.location || 'Not Available'}</span>
              </div>
              <div className="link">
                <a href={`${userData.html_url || 'https://www.github.com'}`} target="_blank" rel="noreferrer">
                  <img src="images/link.svg" alt="Link" />
                </a>
                <a href={`${userData.html_url || 'https://www.github.com'}`} target="_blank" rel="noreferrer">
                  {userData.html_url || 'Not Available'}
                </a>
              </div>
            </div>
            <div className="right-side">
              <div className="twitter">
                {userData.twitter_username ? <a href={`https://twitter.com/${userData.twitter_username}`}
                  target="_blank"
                  rel="noreferrer">
                  <img src="images/twitter.svg" alt="Twitter" />
                </a>
                  :
                  <img src="images/twitter.svg" alt="Twitter" />
                }
                {userData.twitter_username ?
                  <a href={`https://twitter.com/${userData.twitter_username}`}
                    target="_blank"
                    rel="noreferrer">
                    {`@${userData.twitter_username}`}
                  </a>
                  :
                  <span>Not Available</span>
                }
              </div>
              <div className="hirable">
                <img src="images/hire.svg" alt="Stars" />
                <span>{userData.hirable ? 'Available For Job' : 'Not Availale For Hire'}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <main className={`main ${themeType}`}>
      <div className="container">
        <div className={`head ${themeType}`}>
          <h1 className={`${themeType}`}>findDev</h1>
          {showImges()}
        </div>
        <form className={`search-box rounded ${themeType}`} onSubmit={e => e.preventDefault()}>
          <div>
            <img src="images/search-icon.svg" alt="Search Icon" />
            <input type="text" placeholder="Enter Github Username" className="search-input"
              maxLength={26}
              onKeyUp={(e) => { setSearchValue(e.target.value) }}
            />
          </div>
          <button className="submit-btn" onClick={checkData}>Search</button>
        </form>
        <div className={`user-details rounded ${themeType}`}>
          {shouldRender && userData ? renderUserData(userData) : renderDefaultData()}
        </div>
      </div>
    </main>
  )
}

export default App;