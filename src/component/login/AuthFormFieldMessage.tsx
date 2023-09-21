import {Message, UiText} from "@ory/kratos-client";

function AuthFormFieldMessage({messages}:{ messages?: UiText[] }) {
    if (!messages || messages.length==0) return null;

    const messageList: JSX.Element[] = messages.map((value: UiText, index) => {
        let messageSeverity:string;
        //
        switch (value.type) {
            case "error": {
                messageSeverity = "text-danger";
                break;
            }
            case "info": {
                messageSeverity = "text-primary";
                break;
            }
            default: {
                messageSeverity = "text-primary";
            }
        }
        //
        return <p key={index}
                  className={`mb-0 ${messageSeverity}`}>
             {value.text}
         </p>;
    }) as JSX.Element[];

    return <div className="form-text">{messageList}</div>;
}

export default AuthFormFieldMessage;