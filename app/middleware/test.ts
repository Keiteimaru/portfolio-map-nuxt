export default defineNuxtRouteMiddleware((to, from) => {
  const now = new Date().toISOString()
  console.log('middleware:', now)
})