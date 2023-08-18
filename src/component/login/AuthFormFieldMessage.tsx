import {Message} from "@ory/kratos-client";

function AuthFormFieldMessage({messages}:{ messages?: Message[] }){
    if (!messages || messages.length==0) return null;

    // const messageList: JSX.Element[] = messages.map((value: Message, index) => {
    //     let messageSeverity = "";
    //
    //     switch (value.type) {
    //         case "error": {
    //             messageSeverity = "text-danger";
    //             break;
    //         }
    //         case "warn": {
    //             messageSeverity = "text-warning";
    //             break;
    //         }
    //         default: {
    //             messageSeverity = "text-primary";
    //         }
    //     }
    //
    //     return (
    //         <p key={index} className={`mb-0 ${messageSeverity}`}>
    //             {value.text}
    //         </p>
    //     );
    // }) as JSX.Element[];

    // return <div className="form-text">{messageList}</div>;
}

export default AuthFormFieldMessage;