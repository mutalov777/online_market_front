import {GiCancel} from 'react-icons/gi';
import {RiSendPlaneFill} from 'react-icons/ri';
import {AiOutlineWechat} from 'react-icons/ai';
import './chat.scss'
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {createMessage, getAllMessages, getUserMessage, MessageCreateDTO} from "../../store/features/Message";
import {BsCheck, BsCheckAll} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

function Chat() {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState<string>('')
    const [currentUser, setCurrenUser] = useState<number>()
    const navigate = useNavigate()
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
    const {t} = useTranslation()

    useEffect(() => {
        if (messages[0]) {
            setCurrenUser(messages[0]?.userId)
            dispatch(getUserMessage({token, id: messages[0]?.userId}))
        }
    }, [isLoading])

    function startAudio() {
        if (JSON.stringify(user) === '{}') {
            navigate('/login')
        }
        setOpen(!open)
        dispatch(getAllMessages(token))
        const sound = require("../../assets/mixkit-plastic-bubble-click-1124.wav");
        new Audio(sound).play().then((r) => console.log(r))
    }

    function sendMessage(e: any) {
        e.preventDefault()
        if (message !== '') {
            if (currentUser) {
                let data: MessageCreateDTO = {to: currentUser, text: message}
                dispatch(createMessage({token, data}))
            }
            setMessage('')
        }
    }

    return (
        <div>
            <div className={'chat'} style={{display: open ? 'flex' : 'none'}}>
                <GiCancel className={'icon'} onClick={startAudio}/>
                <div className={'user chat-border'}>
                    <img
                        src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                        alt=""/>
                </div>
                <div className="admin chat-border">
                    {
                        userMessages?.map((item, key) =>
                            <div className={item.from.id === user.id ? 'message-container sender' : 'message-container'}
                                 key={key}>
                                <div>
                                    <span></span>
                                    <small>{item.from.fullName}</small>
                                </div>
                                <small className={'message'}>{item.text}</small>
                                <small className={'date'}>{new Date(item.updatedAt).toTimeString().substring(0, 5)}
                                    {item.from.id === currentUser ? '' : item.view ?
                                        <BsCheckAll className={'seen'}/> : <BsCheck className={'seen'}/>}
                                </small>
                            </div>
                        )
                    }
                </div>
                <div className="chat-border write">
                    <form onSubmit={sendMessage}>
                        <input type={'text'} value={message} placeholder={'' + t("message")}
                               onChange={(e) => setMessage(e.target.value)}/>
                        <button>
                            <RiSendPlaneFill/>
                        </button>
                    </form>
                </div>
            </div>
            <button className="chat-button" aria-label={'chat-button'} onClick={startAudio} style={{display: open ? 'none' : 'flex'}}>
                <AiOutlineWechat/>
            </button>
        </div>
    )
}

export default Chat;