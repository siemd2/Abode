import { useEffect, useState } from 'react';
import ChatContainer from '../components/ChatContainer';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import users from "./image_housing.json";
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [genderedUsers, setGenderedUsers] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const userId = cookies.UserId;

    const jsonUsers = users.map(user => ({
        ...user,
        bedroom_image: require(`./House/${user.bedroom_image}`)
    }));

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

    //const combinedUsers = [...genderedUsers, ...jsonUsers];

    return (
        <div className={styles.dashboardLayout}>
            {user && <ChatContainer user={user} />}
            {/* Navbar with logo placeholder */}
            <nav className={styles.navbar}>
                <img src="logo-placeholder.png" alt="Logo" className={styles.logo} />
                {/* Add more navbar items if needed */}
            </nav>
            <div className={styles.swipeContainer}>
                <Swiper
                    effect="cards"
                    grabCursor={true}
                    className={styles.cardContainer}
                >
                    {jsonUsers.map((profile) => (
                        <SwiperSlide key={profile['Unnamed: 0']} onSlideChangeTransitionEnd={() => onSwipe(profile['Unnamed: 0'])}>
                            <div className={styles.card} style={{ backgroundImage: `url(${profile.bedroom_image})` }}>
                                <div className={styles.cardImage}></div>
                                <div className={styles.cardInfo}>
                                    <h2>{profile.fake_address}</h2>
                                    <p className={styles.location}>{profile.area} ft²</p>
                                    <p className={styles.bio}>{profile.bedrooms} bedrooms, {profile.bathrooms} bathrooms</p>
                                    <p className={styles.price}>${profile.price} per night</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={styles.buttonContainer}>
                    <button className={styles.dummyButton}>Button 1</button>
                    <button className={styles.dummyButton}>Button 2</button>
                    <button className={styles.dummyButton}>Button 3</button>
                </div>
        </div>
    );
};

export default Dashboard;