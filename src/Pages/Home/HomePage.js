import React, { Component } from 'react'
import MyAppBar from '../../Components/NavBar'
import SimpleBottomNavigation from '../../Components/BottomNavBar'
import '../../CSS/Pages/Home.css'
import Categories from '../../Components/Home/Categories'
import TopPicks from '../../Components/Home/TopPicks'

export class HomePage extends Component {
    render() {
        return (
            <div>
                <MyAppBar/>
                <div className="wrap" >
                    <div className="home-search-box" >
                        Search courses, subjects ...
                    </div>
                </div>
                <Categories/>
                <TopPicks/>
                <SimpleBottomNavigation/>
            </div>
        )
    }
}

export default HomePage