import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';

import type { ApiError, ApiErrorCode, ApiFieldErrors } from '@/types/api';
import { getAuthToken } from '@/utils/secure-token';

type ApiErrorBody = {
  message?: string;
  code?: ApiErrorCode;
  errors?: ApiFieldErrors;
};

const extra = Constants.expoConfig?.extra as { apiBaseUrl?: string } | undefined;

export const api = axios.create({
  baseURL: extra?.apiBaseUrl ?? '/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export function normalizeApiError(error: unknown): ApiError {
  if (!axios.isAxiosError(error)) {
    return {
      message: error instanceof Error ? error.message : 'Unexpected error',
      code: 'UNKNOWN_ERROR',
    };
  }

  const axiosError = error as AxiosError<ApiErrorBody>;
  const status = axiosError.response?.status;
  const body = axiosError.response?.data;

  return {
    message: body?.message ?? axiosError.message ?? 'Request failed',
    code: body?.code ?? statusToCode(status),
    status,
    fieldErrors: body?.errors,
  };
}

function statusToCode(status?: number): ApiErrorCode {
  if (status === 401) {
    return 'UNAUTHENTICATED';
  }

  if (status === 403) {
    return 'FORBIDDEN';
  }

  if (status === 422) {
    return 'VALIDATION_FAILED';
  }

  return 'UNKNOWN_ERROR';
}
