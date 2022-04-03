import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AudioSectionComponent } from "./audio-section/audio-section.component";
import { PlaylistComponent } from "./playlist/playlist.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { MaterialModule } from "../material.module";

@NgModule ({
    declarations: [
        AudioSectionComponent,
        PlaylistComponent,
        DashboardComponent
    ],
    imports: [
        RouterModule,
        DashboardRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        MaterialModule
    ]
})

export class DashboardModule {

}