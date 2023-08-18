import "@ory/kratos-client";
import {
    LoginFlow,
    LoginFlowMethodConfig,
    RecoveryFlow,
    RecoveryFlowMethodConfig,
    RegistrationFlow,
    RegistrationFlowMethodConfig,
    SettingsFlow,
    SettingsFlowMethodConfig,
    VerificationFlow,
    VerificationFlowMethodConfig,
} from "@ory/kratos-client";

declare module "@ory/kratos-client" {
    type Flows =
        | LoginFlow
        | RegistrationFlow
        | RecoveryFlow
        | SettingsFlow
        | VerificationFlow;

    type FlowMethodConfig =
        | LoginFlowMethodConfig
        | RegistrationFlowMethodConfig
        | SettingsFlowMethodConfig
        | RecoveryFlowMethodConfig
        | VerificationFlowMethodConfig;
}
