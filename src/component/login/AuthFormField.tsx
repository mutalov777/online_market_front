
import React from "react";
import AuthFormFieldMessage from "./AuthFormFieldMessage";
import {UiNode} from "@ory/kratos-client/api";

function AuthFormField({node,index}:{node:UiNode,index:number}){
    return (
        <div key={index} className="input-group">
            {/*<input  // @ts-ignore*/}
            {/*    defaultValue={node.value}*/}
            {/*    id={node.name+index}*/}
            {/*    name={node.type}*/}
            {/*    pattern={node.pattern}*/}
            {/*    required={node.required}*/}
            {/*    type={node.type}*/}
            {/*/>*/}
            {/*<label htmlFor={node.name+index}*/}
            {/*       hidden={node.type === 'hidden'}>{getFormFieldTitle(node)}</label>*/}
            {/*<AuthFormFieldMessage messages={node.messages}/>*/}
        </div>
    )
}
export default AuthFormField;