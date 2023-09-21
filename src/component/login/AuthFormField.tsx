import React from "react";
import AuthFormFieldMessage from "./AuthFormFieldMessage";
import {UiNode} from "@ory/kratos-client";
import {UiNodeInputAttributes} from "@ory/kratos-client/api";

function AuthFormField({node, index}: { node: UiNode, index: number }) {
    // @ts-ignore
    switch (node.attributes.type) {
        case 'submit':
            return (
                    <button className={'login-btn'}
                        // @ts-ignore
                        type={node.attributes.type}
                    >{node.meta.label?.text}</button>
            )
        default:
            return (
                <div key={index} className={'input-group'}>
                    <input
                        // @ts-ignore
                        className={node.attributes.type}
                        // @ts-ignore
                        defaultValue={node.attributes.value}
                        // @ts-ignore
                        id={node.attributes.name}
                        // @ts-ignore
                        name={node.attributes.name}
                        // @ts-ignore
                        pattern={node.attributes.pattern}
                        // @ts-ignore
                        required={node.attributes.required}
                        // @ts-ignore
                        type={node.attributes.type}
                    />
                    <label
                        // @ts-ignore
                        htmlFor={node.attributes.name}
                    >{node.meta.label?.text}</label>
                    <AuthFormFieldMessage messages={node.messages}/>

                </div>
            )
    }
}

export default AuthFormField;
