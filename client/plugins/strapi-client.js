import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.NODE_ENV === "production" ? "https://backend.dreamwhite.ru" : "http://localhost:1337"
const strapi = new Strapi(apiUrl)

export default strapi

