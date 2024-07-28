// src/zoom/zoom.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ZoomService {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly accountId: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.clientId = this.configService.get<string>('ZOOM_CLIENT_ID');
    this.clientSecret = this.configService.get<string>('ZOOM_CLIENT_SECRET');
    this.accountId = this.configService.get<string>('ZOOM_ACCOUNT_ID');
  }

  private async getAccessToken(): Promise<string> {
    try {
      const response = await lastValueFrom(
        this.httpService.post('https://zoom.us/oauth/token', null, {
          params: {
            grant_type: 'account_credentials',
            account_id: this.accountId,
          },
          auth: {
            username: this.clientId,
            password: this.clientSecret,
          },
        }),
      );
      return response.data.access_token;
    } catch (error) {
      console.error('Error obtaining access token:', error.response.data);
      throw new HttpException(
        'Failed to obtain access token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createMeeting(
    topic: string,
    start_time: string,
    duration: number,
  ): Promise<any> {
    const accessToken = await this.getAccessToken();
    try {
      const response = await lastValueFrom(
        this.httpService.post(
          'https://api.zoom.us/v2/users/me/meetings',
          {
            topic,
            type: 2, // Scheduled meeting
            start_time,
            duration,
            timezone: 'America/Mexico_City',
            agenda: 'Teleconsulta', // Opcional, pero recomendado para evitar problemas de zona horaria
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      console.error('Error creating meeting:', error.response.data);
      throw new HttpException(
        'Failed to create meeting',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
