
export type User = {
    id: number;
    name: string;
    avatar: string | null;
    balance: number;
    email_address: string;
    is_email_verified: boolean;
    reserved_balance: number;
    status: UserAuthenticateStatuses;
    permanent_messages: PermanentMessage[];
};



export type PermanentMessage = {
    message: string;
    message_key: "UNCOMPLETED_ORDER";
    type: "WARNING" | "INFO" | "ERROR";
};

export enum UserAuthenticateStatuses {
    AUTHENTICATED = "AUTHENTICATED",
    REJECTED = "REJECTED",
    PENDING_AUTHENTICATION = "PENDING_AUTHENTICATION",
    UNCOMPLETED = "UNCOMPLETED",
}

export type JsonWebTokenResponse = {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
};


export type VerifyOtpCode = {
    MobileNumber: string,
    Code:string
};

// ۱) ورودی و خروجی تابع mutation
export type LoginWithMobileNumberInput = {
    MobileNumber: string
}

export type LoginWithMobileNumberResponse= {
    mobileNumber: string
    // … فیلدهای دیگه
}
export interface ErrorResponse<T = any> {
  code: string
  response: {
    data: RawApiErrorResponse<T>
  }
}
export interface RawApiErrorResponse<T = any> {
  fieldValidationErrors?: {
    message: string
    errors: Array<{ fieldName: keyof T; messages: string[] }>
  }
  businessErrors?: Array<{ message: string }>
  serverErrors?: Array<{ message: string }>
}
