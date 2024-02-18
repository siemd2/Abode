import Nav from '../components/Nav'
import {useState} from 'react'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const OnBoarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        budget: "",
        beds: "",
        baths: "",
        square_footage: "",
        parking: false,
        furnished: false,
        kids: "",
        url: "",
        matches: []
    })

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        console.log('submitted')
        e.preventDefault()
        try {
            const response = await axios.put('http://localhost:8000/user', {formData})
            console.log(response)
            const success = response.status === 200
            if (success) navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }

    }

    const handleChange = (e) => {
        console.log('e', e)
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <>
            <Nav
                minimal={true}
                setShowModal={() => {
                }}
                showModal={false}
            />

            <div className="onboarding">
                <h2>CREATE ACCOUNT</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label>Budget</label>
                        <input
                            id="budget"
                            type='number'
                            name="budget"
                            placeholder="$$$"
                            required={true}
                            value={formData.budget}
                            onChange={handleChange}
                        />
                        <div className = "multicontainer">
                            <div className = "container">
                                <label>Beds</label>
                                <input
                                    id="beds"
                                    type='number'
                                    name="beds"
                                    placeholder=""
                                    required={true}
                                    value={formData.beds}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className = "container">
                                <label>Baths</label>
                                <input
                                    id="baths"
                                    type='number'
                                    name="baths"
                                    placeholder=""
                                    required={true}
                                    value={formData.baths}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <label>Kids</label>
                        <input
                            id="kids"
                            type='number'
                            name="kids"
                            placeholder=""
                            required={false}
                            value={formData.kids}
                            onChange={handleChange}
                        />
                        {/* <label>Birthday</label>
                        <div className="multiple-input-container">
                            <input
                                id="dob_day"
                                type="number"
                                name="dob_day"
                                placeholder="DD"
                                required={true}
                                value={formData.dob_day}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_month"
                                type="number"
                                name="dob_month"
                                placeholder="MM"
                                required={true}
                                value={formData.dob_month}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_year"
                                type="number"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
                            />
                        </div> */}
                        <div className = "multicontainer">
                            <label>Parking?</label>
                            <input
                                id="parking"
                                type="checkbox"
                                name="parking"
                                onChange={handleChange}
                                checked={formData.parking}
                            />
                        </div>
                        <div className = "multicontainer">
                            <label>Furnished?</label>
                            <input
                                id="furnished"
                                type="checkbox"
                                name="furnished"
                                onChange={handleChange}
                                checked={formData.furnished}
                            />
                        </div>

                        {/* <label htmlFor="about">About me</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            placeholder="I like long walks..."
                            value={formData.about}
                            onChange={handleChange}
                        /> */}

                        <input type="submit"/>
                    </section>

                    {/* <section>

                        <label htmlFor="url">Profile Photo</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />
                        <div className="photo-container">
                            {formData.url && <img src={formData.url} alt="profile pic preview"/>}
                        </div>


                    </section> */}

                </form>
            </div>
        </>
    )
}
export default OnBoarding