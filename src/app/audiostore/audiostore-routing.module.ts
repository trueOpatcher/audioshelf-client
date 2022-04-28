import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { AudiostoreComponent } from "./audiostore.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { EditComponent } from "./edit/edit.component";
import { ReviewComponent } from "./review/review.component";


const routes: Routes = [
    {
        path: '', component: AudiostoreComponent,
        // canActivate: [AuthGuard],
        children: [
            { path: '' },
            { path: 'catalog', component: CatalogComponent },
            { path: 'review', component: ReviewComponent }
        ]
    },
    { 
        path: 'edit', component: EditComponent
    },
    {
        path: 'edit/:name', component: EditComponent
    }
]


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class AudiostoreRoutingModule {

}