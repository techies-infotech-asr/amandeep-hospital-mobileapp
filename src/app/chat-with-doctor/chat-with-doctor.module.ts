import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatWithDoctorPageRoutingModule } from './chat-with-doctor-routing.module';

import { ChatWithDoctorPage } from './chat-with-doctor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatWithDoctorPageRoutingModule
  ],
  declarations: [ChatWithDoctorPage]
})
export class ChatWithDoctorPageModule {}
