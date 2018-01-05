export const setContext = async ({
  request, 
  secrets,
  controllers
}) => {
  const user = await request.session.user 
    && controllers.userController.getCurrentUser({ sessionId: request.session.user.id })

  return {
    getSession: () => request.session,
    user,
    secrets,
    ...controllers
  }
} 

export default setContext