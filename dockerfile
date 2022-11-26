FROM node
RUN mkdir /log
RUN mkdir /app
COPY . /app
RUN npm install -g pnpm
RUN cd /app && pnpm install
WORKDIR /app
CMD npm start > /log/app.log

