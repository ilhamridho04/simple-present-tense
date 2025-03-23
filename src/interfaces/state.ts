import {IUser} from '@/types/user';

export interface IAuthState {
    authentication?: string | null;
    currentUser?: IUser | null;
}

export interface IAuthModule {
    namespaced: boolean;
    state: IAuthState;
    mutations: any;
    actions: any;
    getters: any;
}
