import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { User } from "../models/user";
import { Staff } from "../models/staff";
import { Registers } from "../models/registers";
import { Bookings } from "../models/bookings";
import { Rosters } from "../models/rosters";
import { Calendars } from "../models/calendars";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + 
            errorMessage+"===="+JSON.stringify(response)+"===="+JSON.stringify(init));
        }
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/users", { method: "GET" });
    return response.json();
}

export interface SignUpUserCredentials {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    dob: string,
    email: string,
    address: string,
    town: string,
    postcode: string,
    phoneNumber: string,
    altPhoneNumber?: string,
    gender: string,
    ethnicity: string,
    disability: string,
    disabilityDetails?: string,
    assistance: string,
    emergencyName: string,
    emergencyPhone: string,
    emergencyRelationship: string,
}

export async function SignUpUser(credentials: SignUpUserCredentials): Promise<User> {
    const response = await fetchData("/api/users/usersignup",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export interface UserLoginCredentials {
    username: string,
    password: string,
}

export async function userLogin(credentials: UserLoginCredentials) {
    const response = await fetchData("/api/users/userlogin",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export async function userLogout() {
    await fetchData("/api/users/userlogout", { method: "POST" });
}

export interface UserForgotPassowrdCredentials {
    firstName: string,
    lastName: string,
    email: string,
}

export async function userForgotPassword(credentials: UserForgotPassowrdCredentials): Promise<User> {
    const response = await fetchData("/api/users/userforgotpassword/:userId",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export interface UserChangePasswordCredentials {
    password: string,
}

export async function userChangePassword(credentials: UserChangePasswordCredentials): Promise<User> {
    const response = await fetchData("/api/users/userresetpassword/:userId/accessToken",
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export async function getLoggedInStaff(): Promise<User> {
    const response = await fetchData("/api/staffs", { method: "GET" });
    return response.json();
}

export interface StaffLoginCredentials {
    email: string,
    password: string,
}

export async function staffLogin(credentials: StaffLoginCredentials): Promise<Staff> {
    const response = await fetchData("/api/staffs/stafflogin",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export async function staffLogout() {
    await fetchData("/api/staffs/stafflogout", { method: "POST" });
}

export async function fetchRegisters(): Promise<Registers[]> {
    const response = await fetchData("/api/registers/", { method: "GET" });
    return response.json();
}

export async function fetchBookings(): Promise<Bookings[]> {
    const response = await fetchData("/api/bookings/userview", { method: "GET" });
    return response.json();
}

export async function fetchAllBookings(): Promise<Bookings[]> {
    const response = await fetchData("/api/bookings/staffview", { method: "GET" });
    return response.json();
}

export async function fetchRosters(): Promise<Rosters[]> {
    const response = await fetchData("/api/rosters", { method: "GET" });
    return response.json();
}

export async function fetchCalendars(): Promise<Calendars[]> {
    const response = await fetchData("/api/calendars/", { method: "GET" });
    return response.json();
}

export interface RosterDetail {
    date: string,
    driverName: string,
    vehiclePlate: string,
    startTime: string,
    finishTime: string,
    availabilityTime: string[],
    availabilityStatus: string[],
}

export async function createRosters(rosters: RosterDetail): Promise<Rosters> {
    const response = await fetchData("/api/rosters",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(rosters),
    });
    return response.json();
}

export async function updateRoasters(rosterId: string, rosters: RosterDetail): Promise<Rosters> {
    const response = await fetchData("/api/rosters/" + rosterId,
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(rosters),
    });
    return response.json();
}

export interface RegisterDetail {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    dob: string,
    email: string,
    address: string,
    town: string,
    postcode: string,
    phoneNumber: string,
    altPhoneNumber?: string,
    gender: string,
    ethnicity: string,
    disability: string,
    disabilityDetails?: string,
    assistance: string,
    emergencyName: string,
    emergencyPhone: string,
    emergencyRelationship: string,
}

export async function createRegister(register: RegisterDetail): Promise<Registers> {
    const response = await fetchData("/api/registers/",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
    });
    return response.json();
}

export interface BookingDetail {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    pickup: string,
    destination: string,
    wheelchair: string,
    passenger: number,
    purpose: string,
    trip: string,
    date: string,
    pickupTime: string,
    dropoffTime: string,
    additionalNotes?: string,
}

export async function createBooking(bookings: BookingDetail): Promise<Bookings> {
    const response = await fetchData("/api/bookings/",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookings),
    });
    return response.json();
}

export interface CalendarDetail {
    date: string,
    title: string,
    description: string,
    location: string,
    startTime: string,
    endTime: string,
}

export async function createCalendars(calendars: CalendarDetail): Promise<Calendars> {
    const response = await fetchData("/api/calendars/", 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(calendars),
    });
    return response.json();
}

export async function updateCalendars(calendarId: string, calendars: CalendarDetail): Promise<Calendars> {
    const response = await fetchData("/api/calendars/" + calendarId,
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(calendars),
    });
    return response.json();
}

export async function deleteCalendars(calendarId: string) {
    await fetchData("/api/calendars/" + calendarId, { method: "DELETE" });
}

export async function deleteUserBooking(bookingId: string) {
    await fetchData("/api/bookings/userview/" + bookingId, { method: "DELETE" });
}

export async function deleteStaffBooking(bookingId: string) {
    await fetchData("/api/bookings/staffview/" + bookingId, { method: "DELETE" });
}

export async function deleteRegisterWithEmail(registerId: string) {
    await fetchData("/api/registers/rejected/" + registerId, { method: "DELETE" });
}

export async function deleteRegisterWithoutEmail(registerId: string) {
    await fetchData("/api/registers/approved/" + registerId, { method: "DELETE" });
}

export async function deleteRoster(rosterId: string) {
    await fetchData("/api/rosters/" + rosterId, { method: "DELETE" });
}
