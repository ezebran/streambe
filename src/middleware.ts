import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    const tokenValidate = 'eyJhbGciOiJIUzI1NiJ9.eyJwcmluY2lwYWwiOiJINHNJQUFBQUFBQUFBSlZTUFc4VFFSUjhaeHdGS1FJU0pFQVVTVVBvMEZtQzBvMFR5NkNna3hPUnVERVNhSDMzZkd5eXQ3dnNSMkkzeUJVVUtZS0FTRWo4aGZCTG9PRUhJQ2hvVTlQeTl2SnhoaVppcTlYYnVabDVNM2QwRERQV3dJUGNNQzVzcklYUHVZeXRObHptRmxOdnVCdkgzcUxKMEpXSVJ5V3dSeE00T1ZFTm9nUnFQSE53UGRsbXU2d2htTXdiNjROdFRGMXpaT0MrTXZrcDQ5Q3dBdmVVMlluUHVWTmw4QytCaWpwcTFXQzJEd3NzVFpXWHJxdGtaNlM1d2F3UDg5VXNVZWxPR04xSTZRV2w0MHpZYWVnc1NqWVFtQ1V3eDd4N29VaVZvM1Z3N2NTc2QxdzBOdEUxRTdpc21iWGs3cDlOTmwyd0h0NkRUVWtidklSWFVCXC9waUE1bGR6ZEE0OEFUdDVVUXREVlgwaTczWktFeVB1UkJuUGduaSsrK0hYeWE5R29BbE1tOWk3K3A1cmRYWWZMbDJlK2xNdWdvZFhCenlub0ZhNDQwdVZtb21MY01CdVh2SHpmZUh4NlwvZVhxSmxBUGk0ZlwvM3NieHltdHk0clFyTkRITnFxaU9pM2F1SE81RzNMaVlcL2EyRWNcL2lYcE1Ec25YeXUwcUdocDJicFI0aXh0QjFlZXJDZWQ1eHNyN2JWT2Q2c1RKa3VwWUQ3akxNNVFzS0duOXJFMVZyb2c0NlJWa0orclpSeWh4emhSMU9MK3I3ZGZEKzc4SVBiSE1MUExoRWRxWTc0Q2RYMHhRUFA2NkhCeDdzUFBcL1hLMzB0Q3RcL3VjXC94UkM2YUNzREFBQT0iLCJzdWIiOiJjbGF1ZGlhLmRlbGFmdWVudGVAeW9wbWFpbC5jb20iLCJleHAiOjE2NTcwNDY1OTAsImlhdCI6MTY1NzA0Mjk5MCwicm9sZXMiOlsiUk9MRV9QQUNJRU5URSJdfQ.fvEgMciT0sZanCqXZArzI4YFIkWdgyt2FtPTdFyHFyM'

    const cookieSaved = request.cookies.get('token')?.value

  try {
    if (tokenValidate !== cookieSaved) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    return NextResponse.next();
  } catch (error) {
    console.error(error)
    return NextResponse.redirect(new URL('/', request.url))
  }

}

export const config = {
    matcher: '/dashboard',
}
