import {BsCheck, BsCheckAll} from 'react-icons/bs';
import {RiSendPlaneFill} from 'react-icons/ri';
import './support.scss'
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {useEffect, useState} from "react";
import {createMessage, getAllMessages, getUserMessage, MessageCreateDTO} from "../../../store/features/Message";
import {getOnlineUsers} from "../../../store/features/User";

function Support() {
    const onlineUsers = useAppSelector(({user: {onlineUsers}}) => onlineUsers)
    const {userMessages, messages, isLoading} = useAppSelector(({
                                                                    message: {
                                                                        userMessages,
                                                                        messages,
                                                                        isLoading
                                                                    }
                                                                }) => ({userMessages, messages, isLoading}))
    const token = useAppSelector(({user: {token}}) => token.accessToken)
    const user = useAppSelector(({user: {user}}) => user)
    const dispatch = useAppDispatch()
    const [message, setMessage] = useState<string>('')
    const [currentUser, setCurrentUser] = useState<number>()

    useEffect(() => {
        if (currentUser) {
            dispatch(getUserMessage({token, id: currentUser}))
        }
        if (onlineUsers.length !== 0) {
            onlineUsers.map(user => {
                let data: MessageCreateDTO = {
                    to: user.userId,
                    text: 'Assalom alekum . Sizga qanday yordam bera olaman?'
                }
                dispatch(createMessage({token, data}))
            })
        }
    }, [isLoading])


    useEffect(() => {
        dispatch(getAllMessages(token))
        dispatch(getOnlineUsers(token))
    }, [])

    useEffect(() => {
        if (userMessages[0]?.to.id === user.id)
            setCurrentUser(userMessages[0]?.from.id)
        else
            setCurrentUser(userMessages[0]?.to.id)
    }, [userMessages])

    function sendMessage(e: any) {
        e.preventDefault()
        if (message !== '' && currentUser) {
            let data: MessageCreateDTO = {to: currentUser, text: message}
            dispatch(createMessage({data, token}))
        }
        setMessage('')
    }

    function getCurrentUserMessages(id: number) {
        dispatch(getUserMessage({token, id}))
    }

    return (
        <div className={'support'}>
            <div className="support-menu">
                {
                    messages?.map(item =>
                        <div key={item.userId} className="contact-item"
                             onClick={() => getCurrentUserMessages(item.userId)}>
                            <div className={'user-image'}>
                                <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" alt=""/>
                                <span></span>
                            </div>
                            <div className={'user-name'}>{item.fullName}
                                <p>{item.messageCount + ' Messages'}</p>
                            </div>
                        </div>
                    )
                }
                {
                    onlineUsers?.map(item =>
                        <div key={item.userId} className="contact-item"
                             onClick={() => getCurrentUserMessages(item.userId)}>
                            <div className={'user-image'}>
                                <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" alt=""/>
                                <span></span>
                            </div>
                            <div className={'user-name'}>{item.fullName}
                                <p>{item.messageCount + ' Messages'}</p>
                            </div>
                        </div>
                    )
                }

            </div>
            <div className="support-chat">
                <div className="support-chat-owner">
                    {userMessages.length !== 0 ? userMessages[0].from.id === user.id ? userMessages[0].to.fullName : userMessages[0].from.fullName : ''}
                </div>
                <div className="messages">
                    {userMessages?.map((message, key) =>
                        <div className={message.from.id === user.id ? 'message from' : 'message'} key={key}>
                            <div className={'chat-img'}>
                                <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" alt=""/>
                            </div>
                            <div className={'chat-message'}>
                                <>
                                    {message.text}
                                </>
                                <small>{new Date(message.updatedAt).toTimeString().substring(0, 5)}
                                    {message.from.id === currentUser ? '' : message.view ?
                                        <BsCheckAll className={'seen'}/> : <BsCheck className={'seen'}/>}
                                </small>
                            </div>
                        </div>
                    )}
                </div>

                <div className="support-chat-footer">
                    <form onSubmit={(e) => sendMessage(e)}>
                        <input type="text" placeholder={'Write a message...'}
                               value={message}
                               onChange={(e) => setMessage(e.target.value)}/>
                        <button>
                            <RiSendPlaneFill/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Support;