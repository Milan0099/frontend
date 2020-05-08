import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { VerifyComponent } from './verify/verify.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ConfirmVerifyComponent } from './confirm-verify/confirm-verify.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyComponent,
    ResetPasswordComponent,
    ConfirmEmailComponent,
    ConfirmVerifyComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,

    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
        children: [
          {
            path: '',
            component: RegisterComponent
          },
          {
            path: 'email_verify',
            component: VerifyComponent
          },
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: 'confirmEmail',
            component: ConfirmEmailComponent
          },
          {
            path: 'confirmVerify',
            component: ConfirmVerifyComponent
          }
        ]
      }
    ])
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule { }
