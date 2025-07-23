import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { getServerSession } from "next-auth/next";
import { options } from "../auth/[...nextauth]/options";

export async function GET() {
  try {
    // Get the session server-side
    const session = await getServerSession(options);
    
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Get Google API credentials from environment
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    
    // Get tokens from session (JWT)
    const accessToken = session.accessToken;
    const refreshToken = session.refreshToken;

    if (!clientId || !clientSecret || !accessToken) {
      return new Response('Missing credentials', { status: 500 });
    }

    // Initialize OAuth2 client
    const oauth2Client = new OAuth2Client({
      clientId,
      clientSecret,
    });

    // Set credentials using access token
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    // Force token refresh to get new scopes
    try {
      const { credentials } = await oauth2Client.refreshAccessToken();
      oauth2Client.setCredentials(credentials);
    } catch (refreshError) {
      console.log('Token refresh failed, using existing token');
    }

    // Create Google Calendar API client
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Fetch calendar events
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items?.map(event => ({
      id: event.id,
      summary: event.summary || 'No title',
      description: event.description || '',
      start: event.start?.dateTime || event.start?.date,
      end: event.end?.dateTime || event.end?.date,
      location: event.location || '',
    })) || [];

    return Response.json({ events });

  } catch (error) {
    console.error('Calendar API error:', error);
    return new Response('Failed to fetch calendar events', { status: 500 });
  }
}
