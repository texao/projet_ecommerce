export type User = {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
};

export type signUpParams = {
    name: string;
    email: string;
    password: string;
    checkout?: boolean;
    dialogId: string;
}

export type signInParams = Omit<signUpParams, 'name'>; 