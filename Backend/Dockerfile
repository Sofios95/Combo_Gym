FROM node:20

WORKDIR /app

# Εγκατάσταση των παγκόσμιων εργαλείων ΜΕΣΑ στο container
RUN npm install -g ts-node typescript nodemon

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

# Τρέχουμε το dev script που ορίσαμε στο package.json
CMD ["npm", "run", "dev"]