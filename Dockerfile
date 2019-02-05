FROM node:10.15.0-alpine
WORKDIR /app
COPY . .
#RUN npm install --only=production
RUN npm install
RUN API_URL="http://website-api.thor.zopsmart.com/api" npm run build
ENV API_URL "http://website-api.thor.zopsmart.com/api"
CMD npm run start
EXPOSE 3000
