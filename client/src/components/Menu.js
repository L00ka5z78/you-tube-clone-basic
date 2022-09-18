import React from 'react';
import styled from "styled-components";
import LuTube from "../img/logo.png";
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TheatersIcon from '@mui/icons-material/Theaters';
import FeedIcon from '@mui/icons-material/Feed';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SettingsIcon from '@mui/icons-material/Settings';
import FlagIcon from '@mui/icons-material/Flag';
import HelpIcon from '@mui/icons-material/Help';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux'

import { Link } from "react-router-dom";



const Container = styled.div`
flex 1;
background-color: ${({ theme }) => theme.bgLighter};
height: 170vh;
color: ${({ theme }) => theme.text};
font-size:14;
position: sticky;
top: 0;
`;
//height 100??

const Wrapper = styled.div`
padding: 18px 26px;
`;
const Logo = styled.div`
display: flex;
align-items: center;
gap: 5px;
font-weight: bold;
margin-bottom: 25px;
`;
const Img = styled.img`
height 55px;`

const Item = styled.div`
display: flex;
align-items: center;
gap: 20px;
cursor: pointer;
padding: 3.5px 0px;

&:hover {
    background-color: ${({ theme }) => theme.textSoft};
}
`;
// padding 7.5px?

const Hr = styled.hr`
margin 15px 0px:
border: 0.5px solid ${({ theme }) => theme.soft};
margin-top: 10px;
margin-bottom: 10px;
`;

const Login = styled.div``;
const Button = styled.button`
padding: 5px 15px;
background-color: transparent;
border: 1px solid #3ea6ff;
color: #3ea6ff;
border-radius: 3px;
font-weight: 500;
margin-top: 10px:
cursor: pointer;
display: flex;
align-items: center;
gap: 5px;

`;

const Title = styled.h2`
font-size: 14px;
font-weight: 500;
color: #aaaaaa;
margin-bottom: 20px;
margin-top:10px;
`;


const Menu = ({ darkMode, setDarkMode }) => {

    const { currentUser } = useSelector(state => state.user)


    return (
        <Container>
            <Wrapper>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <Logo>
                        <Img src={LuTube} />
                        LuTube
                    </Logo>
                </Link>

                <Item>
                    <HomeIcon />
                    Home
                </Item>
                <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>

                    <Item>
                        <ExploreIcon />
                        Explore
                    </Item>
                </Link>
                <Link to="subscriptions" style={{ textDecoration: "none", color: "inherit" }}>

                    <Item>
                        <SubscriptionsIcon />
                        Subscriptions
                    </Item>
                </Link>
                <Hr />

                <Item>
                    <VideoLibraryIcon />
                    Library
                </Item>
                <Item>
                    <HistoryIcon />
                    History
                </Item>
                <Hr />
                {!currentUser && <>
                    <Login>
                        Sign in to like videos, comment and subscribe.
                        <Link to="signin" style={{ textDecoration: "none" }}>
                            <Button>
                                <AccountCircleIcon />SIGN IN
                            </Button>
                        </Link>
                    </Login>
                    <Hr />
                </>}
                <Title>BEST of LuTube</Title>

                <Item>
                    <LibraryMusicIcon />
                    Music
                </Item>
                <Item>
                    <SportsBasketballIcon />
                    Sports
                </Item>
                <Item>
                    <SportsEsportsIcon />
                    Gaming
                </Item>
                <Item>
                    <TheatersIcon />
                    Movies
                </Item>
                <Item>
                    <FeedIcon />
                    News
                </Item>
                <Item>
                    <LiveTvIcon />
                    Live
                </Item>
                <Hr />

                <Item>
                    <SettingsIcon />
                    Settings
                </Item>
                <Item>
                    <FlagIcon />
                    Report
                </Item>
                <Item>
                    <HelpIcon />
                    Help
                </Item>
                <Item onClick={() => setDarkMode(!darkMode)}>
                    <SettingsBrightnessIcon />
                    {darkMode ? "Light" : "Dark"} Mode
                </Item>


            </Wrapper>
        </Container >

    );
};
export default Menu;