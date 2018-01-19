import { LoggedInUser } from '../store';

export class ServiceBase {
    get CurrentLoggedInUser(): LoggedInUser {
        return JSON.parse(window.localStorage.getItem('LoggedInUser'));
    }
    set CurrentLoggedInUser(loggedInUser: LoggedInUser) {
        window.localStorage.setItem('LoggedInUser', JSON.stringify(loggedInUser));
    }
    get CompanySettings(): CompanySettings {
        return JSON.parse(window.localStorage.getItem('CompanySettings'));
    }
    set CompanySettings(companySettings: CompanySettings) {
        window.localStorage.setItem('CompanySettings', JSON.stringify(companySettings));
    }
}

//export class LoggedInUser {
//    public FullName: string
//    public PersonID: string
//    public UserID: string
//    public UserName: string
//    public SelectedRole: string
//}

export class CompanySettings {
    public company: string
    public dbName: string
}