import { NgModule } from '@angular/core';

import { ForgotpasswordComponent } from './forgotpassword/forgotpassword';
import { CodePasswordComponent } from './code-password/code-password';
import { FavoritesFriendsComponent } from './favorites-friends/favorites-friends';
@NgModule({
	declarations: [
    ForgotpasswordComponent,
    CodePasswordComponent,
    FavoritesFriendsComponent],
	imports: [],
	exports: [
    ForgotpasswordComponent,
    CodePasswordComponent,
    FavoritesFriendsComponent]
})
export class ComponentsModule {}
