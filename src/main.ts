/**
 * @file main.ts
 * @description This is the entry point of the NestJS application. It initializes the application,
 *              configures global settings, and starts the server.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { MongoExceptionFilter } from './common/filters/mongo-exception.filter';

/**
 * @function bootstrap
 * @description Asynchronously initializes and starts the NestJS application.
 *              This function sets up global pipes, filters, API prefixing, and versioning.
 */
async function bootstrap() {
  // Create an instance of the NestJS application using the AppModule as the root module.
  const app = await NestFactory.create(AppModule);

  // Configure a global prefix for all API routes and enable API versioning.
  // All routes will be prefixed with 'api/v1', and versioning is based on the URI.
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  // Apply global validation pipe to all incoming requests.
  // - `whitelist: true`: Automatically remove properties that are not defined in the DTO.
  // - `forbidNonWhitelisted: true`: Throw an error if non-whitelisted properties are present.
  // - `transform: true`: Automatically transform incoming payload objects to DTO instances.
  // - `transformOptions: { enableImplicitConversion: true }`: Enable implicit type conversion for DTOs.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Apply a global exception filter to catch and handle MongoDB-related errors.
  // This ensures consistent error responses for database exceptions.
  app.useGlobalFilters(new MongoExceptionFilter());

  // Start the application and listen for incoming requests on the specified port.
  // The port is retrieved from environment variables (process.env.PORT) or defaults to 3000.
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  // Log a message indicating that the server is ready and listening.
  console.log(`server ready on http://localhost:${port}`);
}
// Call the bootstrap function to start the application.
bootstrap();
