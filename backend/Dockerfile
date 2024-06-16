# Use the official Python image from the Docker Hub
FROM python:3.12
FROM postgres:11-alpine as dumper

# Set the working directory
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt ./
COPY lingovoyage.sql /docker-entrypoint-initdb.d/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

RUN ["sed", "-i", "s/exec \"$@\"/echo \"skipping...\"/", "/usr/local/bin/docker-entrypoint.sh"]

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV PGDATA=/data

RUN ["/usr/local/bin/docker-entrypoint.sh", "postgres"]

# final build stage
FROM postgres:11-alpine

# Command to run the app
CMD ["flask", "run"]

FROM postgres:11-alpine

COPY --from=dumper /data $PGDATA
