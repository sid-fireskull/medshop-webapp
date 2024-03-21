import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const matComponents = [
  MatSlideToggleModule,
  MatCardModule,
  MatFormFieldModule,
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [],
  imports: [
    matComponents
  ],
  exports: [
    matComponents
  ]
})
export class SharedAngularMaterialModule { }
