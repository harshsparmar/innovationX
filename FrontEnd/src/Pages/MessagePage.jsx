import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Navbar from '../Components/Navbar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import { ToastContainer, toast } from 'react-toastify';
import ChatMessages from '../Components/ProjectComponents/ChatMessages';
import { previousTempMessages } from './tempMessage';

const socket = io('http://localhost:4000', {
    transports: ['websocket', 'polling']
});

const MessagePage = () => {
    const [showChat, setShowChat] = useState(false);
    const inputRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [messageInput, setMessageInput] = useState("");
    const messagesContainerRef = useRef(null);
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        // Confirm connection to server
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('initialMessages', (messages) => {
            setChatMessages(messages);
        });

        socket.on('receiveMessage', (message) => {
            setChatMessages((prevMessages) => [...prevMessages, message]);
        });

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            socket.off('connect');
            socket.off('initialMessages');
            socket.off('receiveMessage');
        };
    }, []);

    useEffect(() => {
        if (messagesContainerRef.current && showChat) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [chatMessages, showChat]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    };

    const sendMessage = () => {
        if (messageInput.trim() === "") {
            toast.warn("Please Enter input!");
            return;
        }

        const currentMessage = {
            sender: 'user',
            message: messageInput,
            time: new Date().toISOString(),
        };

        console.log('Sending message:', currentMessage); // Debugging log

        socket.emit('sendMessage', currentMessage); // Correct event name
        setMessageInput('');
        inputRef.current.focus();
    };

    return (
        <>
            <div className="communication_message_container font-signika flex items-center justify-center w-full min-h-full ">
                {!showChat && (
                    <div className="all_person_list flex flex-col  min-h-[90vh] min-w-[25rem] max-w-[50rem] px-3 gap-1 border-[1px] border-blue-900 rounded-md">
                        <div className="person_filters flex justify-center gap-3 items-center py-2 h-16">
                            <button className='fav_button'>All</button>
                            <button className='fav_button'>Connect</button>
                            <button className='fav_button'>Group</button>
                        </div>
                        <div className="person_list flex flex-col gap-2 px-1 font-overpass py-1 rounded h-full ">
                            <div onClick={() => { if (windowWidth <= 821) { setShowChat(true); } }} className="person_details cursor-pointer text-gray-100 hover:text-slate-100 rounded hover:bg-slate-500 flex custom-transition justify-between h-14 bg-slate-400 px-5 items-center">
                                <div className="person_box flex gap-3  py-1 items-center">
                                    <img className='h-10 w-10 rounded-full' src="./Images/harsh.jpg" alt="harsh" />
                                    <h3 className='text-lg'>Savan Dangar</h3>
                                </div>
                                <span className='opacity-85'>12/09/23</span>
                            </div>
                            <div onClick={() => { if (windowWidth <= 821) { setShowChat(true); } }} className="person_details cursor-pointer text-gray-100 hover:text-slate-100 rounded hover:bg-slate-500 flex custom-transition justify-between  h-14  bg-slate-400 px-5 items-center">
                                <div className="person_box flex gap-3  py-1 items-center">
                                    <img className='h-10 w-10 rounded-full' src="./Images/harsh.jpg" alt="harsh" />
                                    <h3 className='text-lg'>Harsh Parmar</h3>
                                </div>
                                <span className='opacity-85'>Yesterday</span>
                            </div>
                            <div onClick={() => { if (windowWidth <= 821) { setShowChat(true) } }} className="person_details cursor-pointer text-gray-100 hover:text-slate-100 rounded hover:bg-slate-500 flex custom-transition justify-between  h-14  bg-slate-400 px-5 items-center">
                                <div className="person_box flex gap-3  py-1 items-center">
                                    <img className='h-10 w-10 rounded-full' src="./Images/savan.jpg" alt="harsh" />
                                    <h3 className='text-lg'>Srujal Chauhan</h3>
                                </div>
                                <span className='opacity-85'>Today</span>
                            </div>
                        </div>
                    </div>
                )}
                {(windowWidth >= 821 || (windowWidth <= 821 && showChat)) && (
                    <div className="messages_container font-overpass flex flex-col  min-h-[90vh] justify-between border-r-[1px] border-t-[1px] border-b-[1px] border-blue-900 rounded-md">
                        <div className="receiver_box flex items-center justify-between text-white h-14 bg-slate-400 py-2 ">
                            <div className="receiver_details flex items-center gap-2  px-3">
                                <img className='h-11 w-11 rounded-full cursor-pointer' src="./Images/savan.jpg" alt="" />
                                <div className="person_online flex flex-col justify-center ">
                                    <h3>Savan Dangar</h3>
                                    <span className='text-sm'>Online</span>
                                </div>
                            </div>
                            <MoreVertIcon className="cursor-pointer hover:bg-slate-500 custom-transition mr-5 rounded-full" />
                        </div>
                        <div className=' h-full overflow-y-auto  p-2 flex text-gray-200 opacity-90 flex-col justify-between gap-3'>
                            <div ref={messagesContainerRef} className="messagesb_box_container overflow-x-auto max-h-[73vh]">
                                <ChatMessages chatMessages={chatMessages} />
                            </div>
                            <div className="send_message_container flex justify-between items-center gap-1 ">
                                <input
                                    ref={inputRef}
                                    onKeyDown={handleKeyDown}
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    className='w-full bg-slate-700 border-gray-500 px-2 py-1 border-[1px] rounded-xl  focus:outline-none placeholder:text-gray-200' type="text" placeholder=' Enter Message' />
                                <SendIcon
                                    onClick={sendMessage}
                                    style={{ fontSize: '2.1rem' }} className='text-white bg-green-600 p-1 rounded-full hover:text-slate-100 custom-transition cursor-pointer ' />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </>
    );
};

export default MessagePage;