FROM ghcr.io/puppeteer/puppeteer:latest

# Switch to root to install dependencies and setup the app
USER root

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (puppeteer is already in the image, but we install other deps)
RUN npm install

# Copy the rest of the backend code
COPY . .

# Create uploads directory and give permissions so the app can save PDFs
RUN mkdir -p uploads/quotation-pdfs && chown -R pptruser:pptruser /app && chmod -R 777 /app/uploads

# Switch back to the safe, non-root user provided by the Puppeteer image
USER pptruser

EXPOSE 5000

# Start the server
CMD ["npm", "start"]
