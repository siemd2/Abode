import { useEffect, useState } from 'react';
import ChatContainer from '../components/ChatContainer';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';

//custom styles
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [genderedUsers, setGenderedUsers] = useState([]); // Initialize as empty array
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const userId = cookies.UserId;

    // Hardcoded users for demonstration
    const hardcodedUsers = [
        {
            user_id: '001',
            first_name: 'Tenant 1',
            age: 29,
            location: 'Calgary, Alberta, CA',
            bio: 'Nice neighbourhood, 4 beds 4 baths, convenient location.',
            url: 'https://i.pinimg.com/originals/c1/f9/5a/c1f95a5d814bb204e25a4f72ee6142b5.jpg', // Placeholder image
            price: '$3800'
        },
        {
            user_id: '002',
            first_name: 'Tenant 2',
            age: 22,
            location: 'Calgary, Alberta, CA',
            bio: 'Dream home, 5 beds 4 baths, exclusive neighbourhood.',
            url: 'https://resrents.com/wp-content/uploads/2019/03/nice-house.jpeg', // Placeholder image
            price: '$4450'
        },
    ];

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

    const getGenderedUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/gendered-users', {
                params: { gender: user?.gender_interest }
            });
            setGenderedUsers(response.data || []); // Ensure this is always an array
        } catch (error) {
            console.log(error);
            setGenderedUsers([]); // Set to empty array in case of error
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (user) {
            getGenderedUsers();
        }
    }, [user]);

    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put('http://localhost:8000/addmatch', {
                userId,
                matchedUserId
            });
            getUser();
        } catch (err) {
            console.log(err);
        }
    };

    const onSwipe = (swipedUserId) => {
        updateMatches(swipedUserId);
    };

    const matchedUserIds = user?.matches.map(({ user_id }) => user_id).concat(userId);
    const filteredGenderedUsers = genderedUsers.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id));

    const combinedUsers = [...genderedUsers, ...hardcodedUsers];

    return (
        <div className={styles.dashboardLayout}>
            {user && <ChatContainer user={user} />}
            <div className={styles.swipeContainer}>
                <Swiper
                    effect="cards"
                    grabCursor={true}
                    className={styles.cardContainer}
                >
                    {combinedUsers.map((profile) => (
                        <SwiperSlide key={profile.user_id} onSlideChangeTransitionEnd={() => onSwipe(profile.user_id)}>
                            <div className={styles.card} style={{ backgroundImage: `url(${profile.url})` }}>
                                <div className={styles.cardImage}></div>
                                <div className={styles.cardInfo}>
                                    <h2>{profile.first_name}, {profile.age}</h2>
                                    <p className={styles.location}>{profile.location}</p>
                                    <p className={styles.bio}>{profile.bio}</p>
                                    <p className={styles.price}>{profile.price} per month</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Dashboard;