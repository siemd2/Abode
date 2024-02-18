/*import { useEffect, useState } from 'react';
import ChatContainer from '../components/ChatContainer';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import TinderCard from 'react-tinder-card';


const Dashboard = () => {
    // State variables
    const [user, setUser] = useState(null); // Stores user data
    const [genderedUsers, setGenderedUsers] = useState(null); // Stores gendered user data
    const [lastDirection, setLastDirection] = useState(); // Stores the last swipe direction
    const [cookies, setCookie, removeCookie] = useCookies(['user']); // Access cookies for user authentication

    // Extracting userId from cookies
    const userId = cookies.UserId;
    
    const db = [
        {
          name: 'Richard Hendricks',
          url: './img/richard.jpg'
        },
        {
          name: 'Erlich Bachman',
          url: './img/erlich.jpg'
        },
        {
          name: 'Monica Hall',
          url: './img/monica.jpg'
        },
        {
          name: 'Jared Dunn',
          url: './img/jared.jpg'
        },
        {
          name: 'Dinesh Chugtai',
          url: './img/dinesh.jpg'
        }
      ]
      
    
    // Function to fetch user data
    const characters = db
    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: { userId }
            });
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Function to fetch gendered user data
    const getGenderedUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/gendered-users', {
                params: { gender: user?.gender_interest }
            });
            setGenderedUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Effect hook to fetch user data on component mount
    useEffect(() => {
        getUser();
    }, []);

    // Effect hook to fetch gendered user data when user data changes
    useEffect(() => {
        if (user) {
            getGenderedUsers();
        }
    }, [user]);

    // Function to update matches when swiped right
    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put('http://localhost:8000/addmatch', {
                userId,
                matchedUserId
            });
            getUser(); // Refresh user data after updating matches
        } catch (err) {
            console.log(err);
        }
    };

    // Callback function when card is swiped
    const swiped = (direction, swipedUserId) => {
        if (direction === 'right') {
            updateMatches(swipedUserId); // Call updateMatches if swiped right
        }
        setLastDirection(direction); // Update lastDirection state
    };

    // Callback function when card goes out of frame
    const outOfFrame = (name) => {
        console.log(name + ' left the screen!');
    };

    // Array of user IDs already matched with
    const matchedUserIds = user?.matches.map(({ user_id }) => user_id).concat(userId);

    // Filter gendered users to exclude already matched users
    const filteredGenderedUsers = genderedUsers?.filter((genderedUser) => !matchedUserIds.includes(genderedUser.user_id));

    // Log filtered gendered users for debugging
    console.log('filteredGenderedUsers ', filteredGenderedUsers);
    
    /*
    return (
        <>
            {// Render only if user data is available 
            }
            {user && (
                <div className="dashboard">
                    {//ChatContainer component with user data 
                    }
                    <ChatContainer user={user} />
                    {// Container for swiping 
                    }
                    <div className="swipe-container">
                        <div className="card-container">
                            {// Map over filtered gendered users and render cards 
                            }
                            {filteredGenderedUsers?.map((genderedUser) => (
                                <div className="card" key={genderedUser.user_id}>
                                    <img src={genderedUser.url} alt={genderedUser.first_name} />
                                    <h3>{genderedUser.first_name}</h3>
                                </div>
                            ))}
                        </div>
                        {// Display swipe info 
                        }
                        <div className="swipe-info">
                            {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                        </div>
                    </div>
                </div>
            )}
        </>
    ); */
    /*
    return (
        <div>
          <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
          <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
          <h1>React Tinder Card</h1>
          <div className='cardContainer'>
            {characters.map((character) =>
              <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
                <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                  <h3>{character.name}</h3>
                </div>
              </TinderCard>
            )}
          </div>
          {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
        </div>
      )
    
}; */
import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'

const db = [
  {
    name: 'Richard Hendricks',
    url: './img/richard.jpg'
  },
  {
    name: 'Erlich Bachman',
    url: './img/erlich.jpg'
  },
  {
    name: 'Monica Hall',
    url: './img/monica.jpg'
  },
  {
    name: 'Jared Dunn',
    url: './img/jared.jpg'
  },
  {
    name: 'Dinesh Chugtai',
    url: './img/dinesh.jpg'
  }
]

function Dashboard () {
  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {characters.map((character) =>
          <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        )}
      </div>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </div>
  )
}

export default Dashboard;
