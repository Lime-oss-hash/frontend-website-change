import axios from 'axios';
import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { User } from "../models/user";
import { Staff } from "../models/staff";
import { Registers } from "../models/registers";
import { Bookings } from "../models/bookings";
import { Rosters } from "../models/rosters";
import { Calendars } from "../models/calendars";

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleError = (error: any) => {
  if (error.response) {
    const errorMessage = error.response.data.error;
    if (error.response.status === 401) {
      throw new UnauthorizedError(errorMessage);
    } else if (error.response.status === 409) {
      throw new ConflictError(errorMessage);
    } else {
      throw new Error(`Request failed with status: ${error.response.status} message: ${errorMessage}`);
    }
  } else {
    throw new Error('An unknown error occurred');
  }
};

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get('/api/users');
    return response.data;
  } catch (error) {
    handleError(error);
    return [];  // Return an empty array to satisfy the return type
  }
};

export const getLoggedInUser = async (): Promise<User> => {
  try {
    const response = await apiClient.get('/api/users');
    return response.data;
  } catch (error) {
    handleError(error);
    return null as any;  // Return null to satisfy the return type
  }
};

export interface SignUpUserCredentials {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  address: string;
  town: string;
  postcode: string;
  phoneNumber: string;
  altPhoneNumber?: string;
  gender: string;
  ethnicity: string;
  disability: string;
  disabilityDetails?: string;
  assistance: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelationship: string;
}

export const SignUpUser = async (credentials: SignUpUserCredentials): Promise<User> => {
  try {
    const response = await apiClient.post('/api/users/usersignup', credentials);
    return response.data;
  } catch (error) {
    handleError(error);
    return null as any;  // Return null to satisfy the return type
  }
};

export interface UserLoginCredentials {
  username: string;
  password: string;
}

export const userLogin = async (credentials: UserLoginCredentials): Promise<User> => {
  try {
    const response = await apiClient.post('/api/users/userlogin', credentials);
    return response.data;
  } catch (error) {
    handleError(error);
    return null as any;  // Return null to satisfy the return type
  }
};

export const userLogout = async (): Promise<void> => {
  try {
    await apiClient.post('/api/users/userlogout');
  } catch (error) {
    handleError(error);
  }
};

export interface UserForgotPasswordCredentials {
  firstName: string;
  lastName: string;
  email: string;
}

export const userForgotPassword = async (credentials: UserForgotPasswordCredentials): Promise<User> => {
  try {
    const response = await apiClient.post('/api/users/userforgotpassword/:userId', credentials);
    return response.data;
  } catch (error) {
    handleError(error);
    return null as any;  // Return null to satisfy the return type
  }
};

export interface UserChangePasswordCredentials {
  password: string;
}

export const userChangePassword = async (credentials: UserChangePasswordCredentials): Promise<User> => {
  try {
    const response = await apiClient.patch('/api/users/userresetpassword/:userId/accessToken', credentials);
    return response.data;
  } catch (error) {
    handleError(error);
    return null as any;  // Return null to satisfy the return type
  }
};

export const getLoggedInStaff = async (): Promise<Staff> => {
  try {
    const response = await apiClient.get('/api/staffs');
    return response.data;
  } catch (error) {
    handleError(error);
    return null as any;  // Return null to satisfy the return type
  }
};

export interface StaffLoginCredentials {
  email: string;
  password: string;
}

export const staffLogin = async (credentials: StaffLoginCredentials): Promise<Staff> => {
  try {
    const response = await apiClient.post('/api/staffs/stafflogin', credentials);
    return response.data;
  } catch (error) {
    handleError(error);
    return null as any;  // Return null to satisfy the return type
  }
};

export const staffLogout = async (): Promise<void> => {
  try {
    await apiClient.post('/api/staffs/stafflogout');
  } catch (error) {
    handleError(error);
  }
};

export const fetchRegisters = async (): Promise<Registers[]> => {
  try {
    const response = await apiClient.get('/api/registers/');
    return response.data;
  } catch (error) {
    handleError(error);
    return [];  // Return an empty array to satisfy the return type
  }
};

export const fetchBookings = async (): Promise<Bookings[]> => {
  try {
    const response = await apiClient.get('/api/bookings/userview');
    return response.data;
  } catch (error) {
    handleError(error);
    return [];  // Return an empty array to satisfy the return type
  }
};

export const fetchAllBookings = async (): Promise<Bookings[]> => {
  try {
    const response = await apiClient.get('/api/bookings/staffview');
    return response.data;
  } catch (error) {
    handleError(error);
    return [];  // Return an empty array to satisfy the return type
  }
};

export const fetchRosters = async (): Promise<Rosters[]> => {
  try {
    const response = await apiClient.get('/api/rosters');
    return response.data;
  } catch (error) {
    handleError(error);
    return [];  // Return an empty array to satisfy the return type
  }
};

export const fetchCalendars = async (): Promise<Calendars[]> => {
  try {
    const response = await apiClient.get('/api/calendars/');
    return response.data;
  } catch (error) {
    handleError(error);
    return [];  // Return an empty array to satisfy the return type
  }
};

export interface RosterDetail {
  date: string;
  driverName: string;
  vehiclePlate: string;
  startTime: string;
  finishTime: string;
  availabilityTime: string[];
  availabilityStatus: string[];
}

export const createRosters = async (rosters: RosterDetail): Promise<Rosters> => {
  try {
    const response = await apiClient.post('/api/rosters', rosters);
    return response.data;
  } catch (error) {
    handleError(error);
    return null as any;  // Return null to satisfy the return type
  }
};

export const updateRoasters = async (rosterId: string, rosters: RosterDetail): Promise<Rosters> => {
  try {
    const response = await apiClient.patch(`/api/rosters/${rosterId}`, rosters);
    return response.data;
  } catch (error) {
    handleError(error);
    return null as any;  // Return null to satisfy the return type
  }
};

export interface RegisterDetail {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  address: string;
  town: string;
  postcode: string;
  phoneNumber: string;
  altPhoneNumber?: string;
  gender: string;
  ethnicity: string;
  disability: string;
  disabilityDetails?: string;
  assistance: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelationship: string;
}

export const createRegister = async (register: RegisterDetail): Promise<Registers> => {
  try {
    const response = await apiClient.post('/api/registers/', register);
    return response.data;
  } catch (error) {
    handleError(error);
    return null as any;  // Return null to satisfy the return type
  }
};

export interface BookingDetail {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  pickup: string;
  destination: string;
  wheelchair: string;
  passenger: number;
  purpose: string;
  trip: string;
  date: string;
  pickupTime: string;
  dropoffTime: string;
  additionalNotes?: string;
}

export const createBooking = async (bookings: BookingDetail): Promise<Bookings> => {
  try {
    const response = await apiClient.post('/api/bookings/', bookings);
    return response.data;
  } catch (error) {
    handleError(error);
    return null as any;  // Return null to satisfy the return type
  }
};

export interface CalendarDetail {
    date: string;
    title: string;
    description: string;
    location: string;
    startTime: string;
    endTime: string;
  }
  
  export const createCalendars = async (calendars: CalendarDetail): Promise<Calendars> => {
    try {
      const response = await apiClient.post('/api/calendars/', calendars);
      return response.data;
    } catch (error) {
      handleError(error);
      return null as any;  // Return null to satisfy the return type
    }
  };
  
  export const updateCalendars = async (calendarId: string, calendars: CalendarDetail): Promise<Calendars> => {
    try {
      const response = await apiClient.patch(`/api/calendars/${calendarId}`, calendars);
      return response.data;
    } catch (error) {
      handleError(error);
      return null as any;  // Return null to satisfy the return type
    }
  };
  
  export const deleteCalendars = async (calendarId: string): Promise<void> => {
    try {
      await apiClient.delete(`/api/calendars/${calendarId}`);
    } catch (error) {
      handleError(error);
    }
  };
  
  export const deleteUserBooking = async (bookingId: string): Promise<void> => {
    try {
      await apiClient.delete(`/api/bookings/userview/${bookingId}`);
    } catch (error) {
      handleError(error);
    }
  };
  
  export const deleteStaffBooking = async (bookingId: string): Promise<void> => {
    try {
      await apiClient.delete(`/api/bookings/staffview/${bookingId}`);
    } catch (error) {
      handleError(error);
    }
  };
  
  export const deleteRegisterWithEmail = async (registerId: string): Promise<void> => {
    try {
      await apiClient.delete(`/api/registers/rejected/${registerId}`);
    } catch (error) {
      handleError(error);
    }
  };
  
  export const deleteRegisterWithoutEmail = async (registerId: string): Promise<void> => {
    try {
      await apiClient.delete(`/api/registers/approved/${registerId}`);
    } catch (error) {
      handleError(error);
    }
  };
  
  export const deleteRoster = async (rosterId: string): Promise<void> => {
    try {
      await apiClient.delete(`/api/rosters/${rosterId}`);
    } catch (error) {
      handleError(error);
    }
  };
  
  export default apiClient;
  
