import ReCAPTCHA from "react-google-recaptcha";
import {useRef, useState} from "react";
import emailJs from '@emailjs/browser';

function Feedback() {
    const captchaRef = useRef(null);
    const [fullName, setFullName] = useState("");
    const [feedback, setFeedback] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const form = useRef(null);

    async function handleSubmit(e: any) {
        e.preventDefault();
        setError('');
        setMessage('');
        if (fullName && feedback) {
            if (form.current == null) return;
            setMessage("Hurray!! you have submitted the form");
            emailJs.sendForm('service_xl3wx55', 'template_fzy3r0z', form.current, 'Iot0MaPqgopXLqI_L').then(() => {
            }, () => {
            });
            e.target.reset();
        } else {
            setError("Full name or FeedBack are required");
        }
    }

    return (
        <div className={'col-md-12 feedback'}>
            <div className={'feedbacks'}>

            </div>
            <div className="give-feedback">
                <div className="feedback-header">
                    <p>Give a feedback</p>
                </div>
                <form ref={form} className={'feedback-body'} onSubmit={handleSubmit}>
                    {
                        error && <p className='textError'>{error}</p>
                    }
                    {
                        message && <p className='textSuccess'>{message}</p>
                    }
                    <label htmlFor="fullName">Your Full Name</label>
                    <input type="text" name={'fullName'} id={'fullName'} onChange={e => setFullName(e.target.value)}
                           required placeholder={'Enter your Name'}/>

                    <label htmlFor="feedback">Your Feedback</label>
                    <input type="text" name={'message'} id={'feedback'} placeholder={'Enter your Email'}
                           onChange={e => setFeedback(e.target.value)}
                           required/>

                    <div className="grade">
                        <h6>Grade:</h6>
                        <div className="rating">
                            <input type="radio" name="rate" id="rate1"/>
                            <label title={'Отлично'} htmlFor="rate1"></label>
                            <input type="radio" name="rate" id="rate2"/>
                            <label title={'Хорошо'} htmlFor="rate2"></label>
                            <input type="radio" name="rate" id="rate3"/>
                            <label title={'Нормально'} htmlFor="rate3"></label>
                            <input type="radio" name="rate" id="rate4"/>
                            <label title={'Плохо'} htmlFor="rate4"></label>
                            <input type="radio" name="rate" id="rate5"/>
                            <label title={'Ужасно'} htmlFor="rate5"></label>
                        </div>
                    </div>
                    <div className="captcha">
                        Please complete the captcha
                        validation below
                        <ReCAPTCHA sitekey={'6Le_UgYkAAAAAFyW7wLITnz4eXLKjh8k76a2PfOv'} ref={captchaRef}/>
                    </div>
                    <button type={'submit'}>Send Feedback</button>
                </form>
            </div>
        </div>
    )
}

export default Feedback;