# Spring Boot Backend

## Development Setup

This backend is configured with Spring Boot DevTools for hot reloading during development.

### Running in Development Mode

```bash
# Start the development server with hot reloading
docker-compose up backend

# Or build and run the entire stack
docker-compose up
```

The development setup includes:
- **Hot Reloading**: Changes to Java files trigger automatic application restart
- **LiveReload**: Browser can auto-refresh when changes are detected
- **Volume Mounting**: Source code is mounted to enable file watching
- **Maven Cache**: Dependencies are cached to speed up restarts

### Running in Production Mode

```bash
# Build and run production version
docker-compose -f docker-compose.prod.yml up
```

## Development Features

- **Port 8000**: Main Spring Boot application
- **Port 35729**: LiveReload server for browser auto-refresh
- **Maven Cache**: Persistent volume for faster dependency resolution
- **Source Mounting**: Real-time code changes without container rebuild

## API Endpoints

- `GET /items/?paramType=fruit` - Returns list of fruits
- `GET /items/?paramType=cars` - Returns list of cars (default)

## Hot Reloading Test

To test hot reloading:
1. Start the development server: `docker-compose up backend`
2. Wait for the application to start
3. Edit a Java file in `src/main/java/`
4. Save the file
5. The application should automatically restart within a few seconds