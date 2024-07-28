/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

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
    const response = await this.httpService
      .post('https://zoom.us/oauth/token', null, {
        params: {
          grant_type: 'account_credentials',
          account_id: this.accountId,
        },
        auth: {
          username: this.clientId,
          password: this.clientSecret,
        },
      })
      .toPromise();
    return response.data.access_token;
  }

  async createMeeting(
    topic: string,
    start_time: string,
    duration: number,
  ): Promise<any> {
    const accessToken = await this.getAccessToken();
    const response = await this.httpService
      .post(
        'https://api.zoom.us/v2/users/me/meetings',
        {
          topic,
          type: 2,
          start_time,
          duration,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .toPromise();

    return response.data;
  }
}
