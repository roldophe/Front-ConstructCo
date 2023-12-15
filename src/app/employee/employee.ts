export interface Employee {
    uuid: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    hireDate: Date;
    email: string;
    contact: string;
    empAddress: string;
    imageUrl: string;
    jobCode: string;
    jobDescription:string;
}

export interface AddEmployee {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    contact: string;
    empAddress: string;
    jobDescription: string;
    imageUrl: string;
}
export interface UpdateEmployee {
    uuid: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    contact: string;
    empAddress: string;
    jobDescription: string;
    imageUrl: string;
}