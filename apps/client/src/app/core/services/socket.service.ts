import { Injectable } from '@angular/core';
import { UserStorageService } from '@qa/client/app/core/services/user-storage.service';
import { Socket, SocketIoConfig } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  public constructor(
    private userStorageService: UserStorageService,
  ) {
  }

  private _socket: Socket;
  public get socket(): Socket {
    return this._socket;
  }

  public setNewSocket(options?: SocketIoConfig['options']): void {
    this._socket?.disconnect();

    const jwtToken = this.userStorageService.getUser()?.token;

    const config: SocketIoConfig = {
      url: 'http://localhost:3000',
      options: {
        extraHeaders: {
          Authorization: `Bearer ${jwtToken}` || '',
        },
        autoConnect: false,
        ...options,
      },
    };

    this._socket = new Socket(config);
  }

}
