import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ApiService {
	private apiToken = new BehaviorSubject<string>('');
	cast = this.apiToken.asObservable();
	
constructor(){}
	
	editUser(newUsr){
	this.apiToken.next(newUsr);
}
}