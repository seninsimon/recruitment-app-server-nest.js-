/**
 * @file mongo-exception.filter.ts
 * @description This file contains the MongoExceptionFilter, which is responsible for catching and handling MongoDB-related exceptions
 *              within a NestJS application. It transforms database-specific errors into appropriate HTTP responses.
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch(Error)
export class MongoExceptionFilter implements ExceptionFilter {
  /**
   * Catches and handles exceptions that occur during request processing.
   * This method is automatically called by NestJS when an exception of type `Error` (or any subclass) is thrown.
   * It extracts the HTTP context and transforms MongoDB-specific errors into appropriate HTTP responses.
   *
   * @param exception The exception object that was caught.
   * @param host The ArgumentsHost object, which provides access to the arguments of the handler that threw the exception.
   */
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Check if the exception is a MongoDB duplicate key error (error code 11000)
    if (exception.code === 11000) {
      // Extract the field names that caused the duplicate key error
      const fields = Object.keys(exception.keyValue || {});
      // Create a user-friendly message indicating which field(s) already exist
      const fieldList = fields.length ? fields.join(', ') : 'unique field';
      const message = `${fieldList} already exist`;
      // Create a ConflictException with the custom message
      const error = new ConflictException(message);
      // Get the response object and status code from the ConflictException
      const res = error.getResponse();
      const status = error.getStatus();
      // Send the ConflictException response to the client
      return response.status(status).json(res);
    }

    // Fallback for any other unexpected database errors
    // Create an InternalServerErrorException
    const error = new InternalServerErrorException('unexpected database error');
    // Get the response object and status code from the InternalServerErrorException
    const res = error.getResponse();
    const status = error.getStatus();
    // Send the InternalServerErrorException response to the client
    return response.status(status).json(res);
  }
}
