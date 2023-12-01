const middleware = (request: Request) => {
  const authorizationHeader = request.headers.get('Authorization');
  const accessToken = authorizationHeader?.split('Bearer ')[1];

  if (accessToken !== process.env.API_ACCESS_TOKEN) {
    return Response.json(
      { message: 'missing or invalid API access token' },
      { status: 401 },
    );
  }
};

export const config = { matcher: '/api/:path*' };
export default middleware;
