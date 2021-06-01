import { Error } from './error.model'
export class ApiResponse<T> {
  errors: string[];
  data: T;
  success: boolean;
  isSuccessData: boolean;
  statusCode: number;
  message: string;
}
