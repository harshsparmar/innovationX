import React from 'react';
const ChatMessages = ({ chatMessages }) => {
    return (
        <>
            {/* particular message box */}
            {chatMessages.flatMap((day, dayIndex) => {
                const messages = Array.isArray(day.messages) ? day.messages : [];
                return (
                    <React.Fragment key={dayIndex}>
                        {/* show first date */}
                        <div className="date_show flex items-center justify-center py-3">
                            <div className="date bg-slate-600 px-2 py-[1px] rounded-md">
                                <p>{day.date}</p>
                            </div>
                        </div>

                        {/* for messages */}
                        {messages.map((message, index) => (
                            <div key={index} className={`message_box ${message.sender === 'user' ? 'message_box_right' : 'message_box_left'} w-full flex my-2`}>
                                <div className={`message bg-green-600 px-4 py-2 w-fit max-w-[60%] rounded-md ${message.sender === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                                    <p className='message_name text-[1.2rem] text-gray-100'>
                                        {message.message}
                                    </p>
                                    <p className='message_time text-sm text-gray-300'>{new Date(message.time).toLocaleTimeString()}</p>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                );
            })}
        </>
    );
}

export default ChatMessages;