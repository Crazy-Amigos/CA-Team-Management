import { Injectable } from '@angular/core';
declare var toastr: any;
@Injectable()
export class ToasterService {

  constructor() { }
  Success(title: string, meassage?: string) {
    toastr.success(title, meassage);
  }
  Warning(title: string, message?: string , ) {
    toastr.warning(message, title);
  }
  Error(message: string , title?: string) {
    toastr.error(message, title);
  }
  info(message: string ) {
    toastr.info(message);
  }
}
