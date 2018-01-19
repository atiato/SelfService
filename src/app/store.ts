import { BehaviorSubject, Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { tassign } from 'tassign';

export interface User {
    id?: string
    userName?: string
}

export interface Task {
    PersonName?: string
    TaskStatusDisplay?: string
    userName?: string
}

export interface LeaveType {
    id: String;
    description: String;
}

export interface LoggedInUser {
    fullName?: String;
    personID?: String;
    userID?: String;
    userName?: String;
    selectedRole?: String;
}

export class LoginModel {
    public Username: string
    public Password: string
}

export interface State {    
    user: User
    tasks: Task[]
    leaveTypes: LeaveType[]
    employeeDayDuty: Number
    userBalance: Number
}

const defaultState: State = {
    user: {},
    tasks: [],
    leaveTypes: [],
    employeeDayDuty: 0,
    userBalance: 0
}

export interface IAppState {
    //loggedInUser: LoggedInUser;
    userName: String;
    //user: User;
}

export const INITIAL_STATE: IAppState = {
    //loggedInUser: { fullName: 'ghyath', userName: 'ghyath' },
    userName: 'ghyathhhh'
    //user: {},
}

function UpdateUserInfo(state, action) {
    var loggedInUser: LoggedInUser = {
        fullName: action.loggedInUser.fullName,
        personID: action.loggedInUser.personID,
        userID: action.loggedInUser.userID,
        userName: action.loggedInUser.userName,
        selectedRole: action.loggedInUser.selectedRole
    };

    return tassign(state, {
        //loggedInUser: loggedInUser,
        userName: loggedInUser.fullName
    });
}

export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case 'Update_User_Info': return UpdateUserInfo(state, action);
        //case ADD_TODO: return addTodo(state, action);
        //case TOGGLE_TODO: return toggleTodo(state, action);
        //case REMOVE_TODO: return removeTodo(state, action);
        //case CLEAR_TODOS: return clearTodos(state, action);
        //case INCREMENT: return increment(state, action);
        //case DECREMENT: return decrement(state, action);
    }

    return state;
}


@Injectable()
export class Store {
    _store = new BehaviorSubject<State>(defaultState);

    //_tasks = new BehaviorSubject<Task>({});

    leaveTypes: Observable<LeaveType[]> = Observable.of([]);
    leaveTypesSubject = new BehaviorSubject<LeaveType[]>([]);

    siteMap: Observable<SiteMap[]> = Observable.of([]);

    siteMapSubject = new BehaviorSubject<SiteMap[]>([]);
    workflowTasks = new BehaviorSubject<any[]>([]);

    workflowTasksChanges = this.workflowTasks.asObservable()
        .distinctUntilChanged();

    private store = this._store;
    changes = this.store.asObservable()
        .distinctUntilChanged();
    //.do(changes => console.log('new state', changes));

    setState(state: State) {
        this.store.next(state);
    }

    getState(): State {
        return this.store.value;
    }

    purge() {
        this.store.next(defaultState);
    }
}

export class SiteMap {
    SiteMapId: Number
    Description: string
    Url: string
    ParentId: Number
    SortingOrder: Number
    Roles: string

    InnerNodes: SiteMap[]
}
