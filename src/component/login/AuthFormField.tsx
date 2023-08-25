import React from "react";
import AuthFormFieldMessage from "./AuthFormFieldMessage";
import {FormField} from "@ory/kratos-client";
import {getFormFieldTitle} from "../../util";

function AuthFormField({field, index}: { field: FormField, index: number }) {
    return (
        <div key={index} className="input-group">
            <input
                defaultValue={field.value?.toString()}
                id={field.name + index}
                name={field.name}
                pattern={field.pattern}
                required={field.required}
                type={field.type}
            />
            <label htmlFor={field.name + index}
                   hidden={field.type === 'hidden'}>{getFormFieldTitle(field)}</label>
            <AuthFormFieldMessage messages={field.messages}/>
        </div>
    )
}

export default AuthFormField;