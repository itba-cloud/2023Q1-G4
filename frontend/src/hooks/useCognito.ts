import {AuthenticationDetails, CognitoUserPool, CognitoUser, CognitoUserAttribute} from 'amazon-cognito-identity-js';
import {useState} from 'react';
import {useAuthStore} from "@/hooks/useAuthStore.ts";
import {shallow} from "zustand/shallow";

const poolData = {
    UserPoolId: import.meta.env.VITE_USER_POOL as string, // Your user pool id here
    ClientId: import.meta.env.VITE_CLIENT_ID as string // Your client id here
};

const userPool = new CognitoUserPool(poolData);

export function useLogin(): [(credentials: { email: string, password: string }) => void, string, Error | undefined] {
    const [result, setResult] = useState<string>('');
    const [error, setError] = useState<Error>();
    const {setEmail, setTeamId} = useAuthStore((state) => ({setEmail: state.setEmail, setTeamId: state.setTeamId}), shallow);

    function login({email, password}: { email: string, password: string }) {
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool
        });

        const authenticationDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                const accessToken = result.getIdToken().getJwtToken();
                setResult(accessToken);
                setEmail(result.getIdToken().payload.email as unknown as string);
                setTeamId(parseInt(result.getIdToken().payload['custom:team_id'] as unknown as string));
            },

            onFailure: function (err: Error) {
                setError(err);
            },

            newPasswordRequired: function (_, requiredAttributes: string[]) {
                const attributes = [];
                for (let i = 0; i < requiredAttributes.length; i++) {
                    attributes.push({
                        Name: requiredAttributes[i],
                        Value: null
                    });
                }
                cognitoUser.completeNewPasswordChallenge(password, attributes, this);
            }
        });
    }

    return [login, result, error];
}

type registerCredentials = { email: string, password: string, name: string, roleId: number, teamId: number };

export function useRegister(): [(credentials: registerCredentials) => void, CognitoUser | undefined, Error | undefined] {
    const [result, setResult] = useState<CognitoUser>();
    const [error, setError] = useState<Error>();

    function register({email, password, name, roleId, teamId}: registerCredentials) {
        const attributeList = [];

        attributeList.push(new CognitoUserAttribute({
                Name: 'custom:role_id',
                Value: roleId.toString()
            }
        ));

        attributeList.push(new CognitoUserAttribute({
                Name: 'custom:team_id',
                Value: teamId.toString()
            }
        ));

        attributeList.push(new CognitoUserAttribute({
                Name: 'name',
                Value: name
            }
        ));

        userPool.signUp(email, password, attributeList, [], (err, result) => {
            if (err) {
                setError(err);
                return;
            }
            if (!result) {
                setError(new Error('No result'));
                return;
            }
            setResult(result.user);
        });
    }

    return [register, result, error];
}

type confirmRegistrationCredentials = {
    email: string,
    code: number
};

export function useConfirmRegistration(): [(credentials: confirmRegistrationCredentials) => void, boolean, Error | undefined] {
    const [result, setResult] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    function confirmRegistration({email, code}: confirmRegistrationCredentials) {
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool
        });

        cognitoUser.confirmRegistration(code.toString(), true, function (err, result) {
            if (err) {
                setError(err as Error);
                return;
            }
            if (!result) {
                setError(new Error('No result'));
                return;
            }
            setResult(true);
        });
    }

    return [confirmRegistration, result, error];
}