import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Comments from "../components/Comments";
import Card from "../components/Card"
import { useDispatch, useSelector } from "react-redux";
// import { useSelect } from "@mui/base";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import Recomendation from "../components/Recomendation";
// import { set } from "immer/dist/internal";  //powoduje blad immer....

const Container = styled.div`
display: flex;
gap: 24px;
`;
const Content = styled.div`
flex: 5;
`;

const VideoWrapper = styled.div`

`;

const Title = styled.h1`
font-size: 18px;
font-weight: 400;
margin-top: 20px;
margin-bottom: 10px;
color: ${({ theme }) => theme.text}
`;

const Details = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;
const Info = styled.span`
color: ${({ theme }) => theme.text};
`;
const Buttons = styled.div`
display: flex;
gap: 20px;
color: ${({ theme }) => theme.text};
`;
const Button = styled.div`
display; flex;
align-items: center;
gap: 5px;
cursor: pointer;
`;

const Hr = styled.hr`
margin: 15px 0px;
border: 0.5px solid ${({ theme }) => theme.textSoft};
`;


const Channel = styled.div`
display: flex;
justify-content: space-between;
`;

const ChannelInfo = styled.div`
display: flex;
gap: 20px;
`;
const Image = styled.img`
width: 40px;
height: 50px;
border-radius: 50%;
`;

const ChannelDetail = styled.div`
display: flex;
flex-direction: column;
color: ${({ theme }) => theme.text};
gap: 8px;
`;

const ChannelName = styled.span`
font-weight: 500;
`;

const ChannelCounter = styled.span`
margin-top: 5px;
margin-bottom; 20px;
color:  ${({ theme }) => theme.text};
font-size: 11px;
`;

const Description = styled.p`
font-size: 12px;
`;

const Subscribe = styled.button`
background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;


const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;


const Video = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { currentVideo } = useSelector((state) => state.video);
    const dispatch = useDispatch();

    const path = useLocation().pathname.split("/")[2];

    const [channel, setChannel] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoRes = await axios.get(`/videos/find/${path}`)
                const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`
                );
                setChannel(channelRes.data);
                dispatch(fetchSuccess(videoRes.data));

            } catch (err) { }
        };
        fetchData()
    }, [path, dispatch]);

    if (!currentVideo) return 'Loading... ';
    //currentVideo not loading properly -if- block written to go further with app.

    const handleLike = async () => {
        await axios.put(`/users/like/${currentVideo._id}`);
        dispatch(like(currentUser._id));
    };

    const handleDislike = async () => {
        await axios.put(`/users/dislike/${currentVideo._id}`);
        dispatch(dislike(currentUser._id));
    };


    const handleSub = async () => {
        currentUser.subscribedUsers.includes(channel._id)
            ? await axios.put(`/users/unsub/${channel._id}`)
            : await axios.put(`/users/sub/${channel._id}`);
        dispatch(subscription(channel._id));
    };




    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <VideoFrame src={currentVideo.videoUrl} controls />
                </VideoWrapper>
                <Title>
                    {/* {currentVideo} */}
                    {/* //if you use 158 line works well,  if you use 160 throws error */}
                    {currentVideo.title}
                </Title>
                <Details>
                    <Info>
                        {currentVideo.views} views * {format(currentVideo.createdAt)}
                    </Info>
                    <Buttons>
                        <Button onClick={handleLike}>{currentVideo.likes?.includes(currentUser._id) ? (
                            < ThumbUpIcon />) : (
                            <ThumbUpIcon />
                        )} {" "}
                            {currentVideo.likes?.length}
                        </Button>
                        <Button onClick={handleDislike}>
                            {currentVideo.dislikes?.includes(currentUser._id) ? (<ThumbDownIcon />
                            ) : (
                                <ThumbDownIcon />
                            )} {" "}
                            Dislike
                        </Button>
                        <Button>
                            <ShareIcon /> Share
                        </Button>
                        <Button>
                            <SaveAltIcon /> Save
                        </Button>
                    </Buttons>
                </Details>
                <Hr />
                <Channel>
                    <ChannelInfo>
                        <Image src={channel.img} />
                        <ChannelDetail>
                            <ChannelName>{channel.name}</ChannelName>
                            <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
                            <Description>
                                {currentVideo.desc}
                            </Description>
                        </ChannelDetail>
                    </ChannelInfo>
                    <Subscribe onClick={handleSub}>
                        {currentUser.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED!" : "SUBSCRIBE"}</Subscribe>
                </Channel>
                <Hr />
                <Comments videoId={currentVideo._id}></Comments>
            </Content>
            <Recomendation tags={currentVideo.tags} />
        </Container>
    )
    console.log(currentVideo)

}


export default Video;