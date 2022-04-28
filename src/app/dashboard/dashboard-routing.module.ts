import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { AudioSectionComponent } from "./audio-section/audio-section.component";
import { DashboardComponent } from "./dashboard.component";
import { PlaylistComponent } from "./playlist/playlist.component";

const routes: Routes = [
    {
        path: '', component: DashboardComponent,
        // canActivate: [AuthGuard],
        children: [
            { path: '' },
            { path: 'playlist', component: PlaylistComponent },

            { path: 'audio-section', component: AudioSectionComponent }
        ]
    }
];


@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardRoutingModule {

}